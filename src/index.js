const http = require('http');
const { URL } = require('url');

const routs = require('../routes');
const path = require('path');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);
  
  let { pathname } = parsedUrl;
  let id = null;

  const splitEndPoint = pathname.split('/').filter(Boolean);
  
  if(splitEndPoint.length > 1){
    pathname = `/${splitEndPoint[0]}/:id`
    id = splitEndPoint[1];
  }

  console.log(`Request Method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  const route = routs.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));

  if(route) {
    request.query = parsedUrl.query;
    request.params = { id };

    route.handler(request, response);
  }else{
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
  };
});

server.listen(3000, () => console.log('🚀 Server started at http://localhost:3000'));