const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
    const { method, url } = req;

    // Set the content type to JSON or HTML depending on the response
    res.setHeader('Content-Type', 'application/json');

    if (url === '/' && method === 'GET') {
        // Handle GET request to "/"
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to the Node.js Server!</h1>');
    } else if (url === '/' && (method === 'PUT' || method === 'PATCH')) {
        // Handle PUT/PATCH request to "/"
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { option } = JSON.parse(body);
            if (option === 'update') {
                res.writeHead(200);
                res.end(JSON.stringify({ message: 'Successfully updated!' }));
            } else {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Invalid option provided.' }));
            }
        });
    } else if (url === '/' && method === 'POST') {
        // Handle POST request to "/"
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { option } = JSON.parse(body);
            if (option === 'posting') {
                res.writeHead(201);
                res.end(JSON.stringify({ message: 'Successfully created!' }));
            } else {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Invalid option provided.' }));
            }
        });
    } 
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
