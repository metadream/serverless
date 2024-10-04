/**
 * Cloudflare Service Integration
 * Transform Images in R2 with Workers
 */
export default {
    r2_hostname: "pub-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev",

    async fetch(request) {
        const url = new URL(request.url)
        url.hostname = this.r2_hostname

        if (url.pathname === "/") {
            return new Response("(c) 2024 Object storage service based on Cloudflare R2")
        }
        // No image or no querystring returns the raw content
        const params = url.searchParams;
        if (!/\.(jpe?g|png|gif|webp)$/i.test(url.pathname) || !params.toString()) {
            return fetch(new Request(url.href, { headers: request.headers }))
        }

        // Transform images options
        const image = { fit: "scale-down" }
        if (params.has("size")) {
            image.width = image.height = params.get("size")
        }
        if (params.has("width")) image.width = params.get("width")
        if (params.has("height")) image.height = params.get("height")
        if (params.has("quality")) image.quality = params.get("quality")
        if (params.has("fit")) image.fit = params.get("fit")

        const imageUrl = url.origin + url.pathname
        const options = { cf: { image } }
        return fetch(new Request(imageUrl, { headers: request.headers }), options)
    }

}
