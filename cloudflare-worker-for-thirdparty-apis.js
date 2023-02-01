const apis = {
  '/google': 'www.googleapis.com',
  '/github': 'api.github.com'
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  if (url.pathname === '/') {
    return new Response(JSON.stringify(apis, null, 2))
  }

  for (const key in apis) {
    if (url.pathname.startsWith(key)) {
      url.pathname = url.pathname.replace(key, '')
      url.hostname = apis[key]
      break
    }
  }
  return await fetch(new Request(url, request))
}