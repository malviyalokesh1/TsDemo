const MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const MONGO = {
    options: MONGO_OPTIONS,
    url: 'mongodb://localhost:27017/Demo'
}

const PORT = {
    port: 6060
}

const JSON_WEB_TOKENS = {
    secret: 'zxcvbnmlkjhgfdsaqwertyuiopmnbvcx',
    expires_in: 900
}

const config = {
    mongo: MONGO,
    token: JSON_WEB_TOKENS,
    port: PORT
}

export default config;