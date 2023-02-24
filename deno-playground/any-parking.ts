import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
  <title>Hello, Anybody!</title>
  <style>body{margin:0;height:100vh;display:flex;align-items:center;justify-content:center;}svg{width:120px;}</style>
</head>
<body>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 39"><path d="M0 26 15 .001h15l7.5 13L45 0h15l7.5 13L75.006.01 90 0l7.489 13.018L105 0h15L97.5 39h-15l7.483-12.973-7.494-13.009L75 26H60l-7.5-13-7.517 13.027L30 26.001l-7.511-12.982L15 26.001Z" fill="#3c1e3c"/></svg>
</body>
</html>`
  .replace(/(\r|\n)[\t ]+/g, "")
  .replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "");

serve((): Response => {
  return new Response(html, { headers: { "content-type": "text/html" } });
});