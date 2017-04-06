var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function(request, response) {
		
	 console.log(path.join(__dirname, 'users/myusers/file.json'))
	 //console.log(__dirname);
	if (request.method === 'GET') {
		console.log(request.url);
		
		fs.readFile(request.url.replace('/', ''), function (err, data) {
			// readyState === 3
			response.writeHead(200, {
				'Content-Type': 'text/html'
			});
			
			response.end(data); 
		});
	}
	
	if (request.method === 'POST') {
		if (request.url === '/123213') {
			// EventEmitter, Sublish-Subscriber, Observer, Mediator,
			request.on('data', function (clientData) {
				var newUser = JSON.parse(clientData);
				console.log(clientData);
				fs.readFile('users.json', function (err, data) {
					var users = JSON.parse(data);
					
					users.push(newUser);

					fs.writeFile('users.json', JSON.stringify(users, '', 4), function (err, data) {
						res.writeHead(200, {'content-type': 'text/plain'});
						res.write('received upload:\n\n');
						res.end(sys.inspect({fields: fields, files: files}));

					});
				});
			});
		}
	}
		
  //file.serve(req, res);
}).listen(8080);

console.log('Server running on port 8080');