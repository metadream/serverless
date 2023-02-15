import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { join } from "https://deno.land/std@0.177.0/path/mod.ts";

const upstream = "https://cdn.jsdelivr.net";
const repo = "/gh/metadream/";

serve(async (request: Request): Promise<Response> => {
  const path = (new URL(request.url)).pathname;
  if (path.startsWith(repo)) {
    return Response.redirect(request.url.replace(repo, "/"), 301);
  }

  switch (path) {
    case "/":
      return new Response("Upstream: " + upstream + repo);
    case "/favicon.ico":
      return new Response('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><path d="M1 58v72c0 60 0 73 2 80 7 42 38 75 80 86 25 5 54 2 76-8l101-59c21-16 35-41 38-66l1-80V12L279 1l-79 45-1 78c0 82 0 83-5 96-3 9-3 9-12 7-25-7-47-23-57-49-6-15-5-21-5-93V12L100 1zm99 36c0 55-1 65 6 91 11 27 37 51 66 60l6 3c0 1-11 12-20 17a84 84 0 01-52 14c-33-1-62-21-76-50-9-19-8-13-9-91V69l78-45zm179-1c-1 78 0 75-9 92a79 79 0 01-57 43l3-10c6-26 3-57 3-85l1-75 58-34z" fill="#00c250"/></svg>', {
        headers: { "content-type": "image/svg+xml", "cache-control": "public, max-age=31536000" }
      });
    default:
      return await fetch(new Request(join(upstream, repo, path), request));
  }
});