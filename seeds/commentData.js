const {Comment} = require('../models');

const commentData = [
    {
        date_created: Date(),
        comment: 'Hello to you too',
        user_id: 2,
        post_id: 1
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;