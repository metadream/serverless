/**
 * Cloudflare Service Integration
 * Transform Images in R2 with Workers
 */
export default {
    r2_hostname: "pub-xxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev",

    async fetch(request) {
        const url = new URL(request.url)
        url.hostname = this.r2_hostname

        if (url.pathname === "/") {
            return new Response("(c) 2024 Object storage service based on Cloudflare R2")
        }
        // No image or no querystring returns the raw content
        if (!/\.(jpe?g|png|gif|webp)$/i.test(url.pathname) || !url.searchParams.toString()) {
            return fetch(new Request(url.href, { headers: request.headers }))
        }

        // Transform images options
        const options = { cf: { image: { fit: "scale-down" } } }
        if (url.searchParams.has("size")) {
            options.cf.image.width = options.cf.image.height = url.searchParams.get("size")
        }
        if (url.searchParams.has("width")) options.cf.image.width = url.searchParams.get("width")
        if (url.searchParams.has("height")) options.cf.image.height = url.searchParams.get("height")
        if (url.searchParams.has("quality")) options.cf.image.quality = url.searchParams.get("quality")
        if (url.searchParams.has("fit")) options.cf.image.fit = url.searchParams.get("fit")
        
        const imageUrl = url.origin + url.pathname
        return fetch(new Request(imageUrl, { headers: request.headers }), options)
    }

}
