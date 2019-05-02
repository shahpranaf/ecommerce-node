const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if( url === '/') {
        res.write('<html><head><title>Pranav is best</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    

    if( url === '/message' && method === 'POST'){
        const body = [];
        
        req.on('data', (chunk) => {
            body.push(chunk);
        })

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
            res.statusCode = 302;
            res.setHeader('Location', '/');
    
            return res.end();
        })       
        
    }

    // res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>Pranav is best</title></head>');
    res.write('<body><h1>Hello from Node JS Server</h1></body>');
    res.write('</html>');
    res.end();
    // process.exit(); // To exit the node process - server
}

// module.exports = requestHandler;
exports.requestHandler = requestHandler;
