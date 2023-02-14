addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  url.hostname = 'raw.githubusercontent.com'
  url.pathname = url.pathname.replace('@', '/')

  if (url.pathname === '/') {
    return new Response('400: Invalid request', {
      status: 400,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })
  }

  let response = await fetch(new Request(url, request))
  response = new Response(response.body, response)
  response.headers.set('Access-Control-Allow-Origin', '*')
  return response
}