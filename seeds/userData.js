const {User} = require('../models');

const userData = [
    {
        username: 'mitch',
        email: 'mitch@mail.com',
        password: 'imMitch'
    },
    {
        username: 'mike',
        email: 'mike@mail.com',
        password: 'imMike'
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;