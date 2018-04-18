const passportStrategy = require('./passport');
const { redisClient, store } = require('./redis');
module.exports = {
    auth: passportStrategy,
    passport: passportStrategy.passport,
    redisClient: redisClient,
    store: store
}