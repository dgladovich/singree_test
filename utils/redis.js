let redis   = require("redis");
let session = require('express-session');
let RedisStore = require('connect-redis')(session);
let redisClient = require('redis').createClient();
let store = new RedisStore({
    client: redisClient,
    port: 6379,
    host: '127.0.0.1'

})


module.exports = {
    redisClient: redisClient,
    store: store
};