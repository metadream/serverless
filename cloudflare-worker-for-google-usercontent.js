addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const upstream = url.hostname.split('.')[0]
  url.hostname = upstream + '.googleusercontent.com'

  let response = await fetch(new Request(url, request))
  response = new Response(response.body, response)
  response.headers.set('Access-Control-Allow-Origin', '*')
  return response
}