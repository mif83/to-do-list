var http = require("http");
var fs = require('fs');
var url = require("url");
var path = require('path');
var dat1 = require('./test.json');

function action(req, res){
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log(ip.split(":")[3]);
    var ansver ={
        "192.168.3.120": "Hello Radmin",
        "192.168.3.168": "By"

    };
    if(ansver[ip.split(":")[3]]){
        res.end(ansver[ip.split(":")[3]]);
    }
    if(req.method === "GET"){
        var pathname = url.parse(req.url).pathname,
            extName;

        if (pathname === "/") pathname = "/index.html";
        extName = path.extname(req.url).replace('.', '');


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
                  //  res.end("<h1>404 Not Found</h1>");
                    res.end(JSON.stringify(req.headers));
                }
                res.writeHead(200, { 'Content-Type': types[extName] });
                res.end(data);
            });
        });
    }
    if (req.method === "POST"){
        if (req.url === '/'){
            req.on("data", function(clientData){
                var newTask = JSON.parse(clientData);

                dat1.push(newTask);
                console.log(dat1);
                fs.writeFile("test.json", JSON.stringify(dat1, '', 4), function(err, data){
                    if (err){
                        console.log("error");
                    }
                    console.log(data);
                })
            })
        }
        res.end("ASqweerdf");
    }
}

http.createServer(action).listen(3130);
console.log("Server runing in 3130");