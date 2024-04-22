export async function json(req, res) {
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    if (buffers.length === 0) {
        console.error("No data received in request body.");
        req.body = null;
        return;
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch (err) {
        console.error("Error parsing JSON:", err.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
        return;
    }

    res.setHeader('Content-Type', 'application/json');
}
