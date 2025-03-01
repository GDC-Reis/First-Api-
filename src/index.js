const http = require('http');
const routs = require('../routes');

const server = http.createServer((request, response) => {
  console.log(`Request Method: ${request.method} | Endpoint: ${request.url}`);

  const route = routs.find((routeObj) => (
    routeObj.endpoint === request.url && routeObj.method === request.method
  ));

  if(route) {
    route.handler(request, response);
  }else{
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.end(`Cannot ${request.method} ${request.url}`)
  };
});

server.listen(3000, () => console.log('🚀 Server started at http://localhost:3000'));