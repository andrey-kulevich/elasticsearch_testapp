import express from 'express';
import routes from './routes';
const app = express();

let port = process.env.PORT || 3000;

app.use('/api/v1', routes);
app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
})
