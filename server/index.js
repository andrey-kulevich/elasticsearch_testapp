const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: "50mb"}));

let port = process.env.PORT || 3000;

app.use('/api/v1', routes);
app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
})
