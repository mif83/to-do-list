var http = require("http");
var fs = require('fs');
var url = require("url");
var path = require('path');

function action(req, res){
    if(req.method === "GET"){
        var pathname = url.parse(req.url).pathname,
            extName;

        if (pathname === "/") pathname = "/index.html";
        extName = path.extname(req.url).replace('.', '');
        console.log("req.url = ",req.url);
        console.log("extName = ",extName);

        fs.exists(pathname.replace('/', ''), function (exists) {
            fs.readFile(pathname.replace('/', ''), function(err, data) {
                var types = {
                    'js': 'text/javascript',
                    'css': 'text/css',
                    'html': 'text/html',
                    'json': 'application/json',
                    'ico': 'image/x-icon'
                };
                if(err){
                    res.writeHead(404);
                    res.end("<h1>404 Not Found</h1>");
                }
                res.writeHead(200, { 'Content-Type': types[extName] });
                res.end(data);
            });
        });
    }
}

http.createServer(action).listen(3130);
console.log("Server runing in 3130");