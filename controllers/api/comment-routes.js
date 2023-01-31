const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const dbPostData = await Comment.create({
        comment: req.body.comment,
        date_created: Date(),
        user_id: req.session.user_id,
        post_id: req.body.post_id
      });
      console.log(dbPostData);
      res.json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/', async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({
            include: [
                {model: User, model: Post}
            ]
        });
        res.json(dbCommentData);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;