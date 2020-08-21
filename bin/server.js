const app = require('../src/app');
const port = normalizePort(process.env.PORT || 3000);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (!isNaN(port) && port >= 0)
        return port;
}

app.listen(port, function () {
    console.log(`app listening on port ${port}`)
})