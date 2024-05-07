const http = require('http');
const os = require('os');

// Function to simulate asynchronous operation with a random delay
function asyncOperation(callback) {
    const delay = Math.random() * 1000; // Random delay up to 1 second
    setTimeout(() => {
        callback();
    }, delay);
}

// Create HTTP server
const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle GET request
    if (req.method === 'GET' && req.url === '/info') {
        // Simulate asynchronous operation
        asyncOperation(() => {
            // Get CPU and OS information
            const cpuInfo = os.cpus();
            const osInfo = {
                platform: os.platform(),
                arch: os.arch(),
                release: os.release(),
                totalMemory: os.totalmem(),
                freeMemory: os.freemem(),
            };

            // Send response
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ cpuInfo, osInfo }));
        });
    } else {
        // Handle unsupported routes/methods
        res.writeHead(404);
        res.end();
    }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
