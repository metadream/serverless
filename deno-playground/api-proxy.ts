const upstreams = {
  "/google/": "https://www.googleapis.com",
  "/github/": "https://api.github.com",
  "/nominatim/": "https://nominatim.openstreetmap.org"
}

Deno.serve(async (request: Request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const alias = Object.keys(upstreams).find(v => path.startsWith(v));
  
  if (alias) {
    const upstream = upstreams[alias] + path.replace(alias, "/");
    return await fetch(upstream + url.search, request);
  }
  return new Response("Upstream not found.");
});
