let acl = require('acl');
let { redisClient } = require('../../utils');

acl = new acl(new acl.redisBackend(redisClient));

acl.allow([
    {
        roles:['guest', 'member'],
        allows:[
            {resources:'blogs', permissions:'get'},
            {resources:['forums', 'news'], permissions:['get', 'put', 'delete']}
        ]
    },
    {
        roles:['gold', 'silver'],
        allows:[
            {resources:'cash', permissions:['sell', 'exchange']},
            {resources:['account', 'deposit'], permissions:['put', 'delete']}
        ]
    }
])
acl.addUserRoles(1, 'admin');
acl.addUserRoles(2, 'user');
acl.addUserRoles(0, 'guest');


module.exports = acl;