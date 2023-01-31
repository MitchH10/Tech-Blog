const {Post} = require('../models');

const postData = [
    {
        title: 'Hello World',
        contents: 'Hello this is the first post on the blog.',
        date_created: Date(),
        user_id: 1
    },
    {
        title: "I'm here too",
        contents: "My name is Mike",
        date_created: Date(),
        user_id: 2
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;