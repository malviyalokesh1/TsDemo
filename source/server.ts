import app from './app';
import mongoose from 'mongoose';
import config from './config/config';

/** Connection to Database */
mongoose.connect(config.mongo.url, config.mongo.options as mongoose.ConnectOptions)
    .then(() => console.log('DB connection successful!'))
    .catch(error => {
        console.log('error', error)
    })


/** Server */
const port: number = config.port.port || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});