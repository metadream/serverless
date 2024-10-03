export default {
    async fetch(request) {
        const url = new URL(request.url)
        if (!/\.(jpe?g|png|gif|webp)$/i.test(url.pathname)) {
            return new Response("Disallowed file extension", { status: 400 })
        }

        const options = { cf: { image: { fit: "scale-down" } } }
        if (url.searchParams.has("size")) {
            options.cf.image.width = options.cf.image.height = url.searchParams.get("size")
        }
        if (url.searchParams.has("width")) options.cf.image.width = url.searchParams.get("width")
        if (url.searchParams.has("height")) options.cf.image.height = url.searchParams.get("height")
        if (url.searchParams.has("quality")) options.cf.image.quality = url.searchParams.get("quality")
        if (url.searchParams.has("fit")) options.cf.image.fit = url.searchParams.get("fit")

        url.hostname = "original.example.com"
        const imageUrl = url.origin + url.pathname
        const imageRequest = new Request(imageUrl, {
            headers: request.headers
        })
        return fetch(imageRequest, options)
    }
}
