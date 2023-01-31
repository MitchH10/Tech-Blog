const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.delete('/:id', async (req, res) => {
    try {
      const dbPostData = await Post.destroy({
        where: {
          id: req.params.id
        }
      });
      res.json(dbPostData);
    } catch (err){
      console.log(err);
      res.status(500).json(err);
  }});


  router.post('/', withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.create({
        title: req.body.title,
        contents: req.body.contents,
        date_created: Date(),
        user_id: req.session.user_id
      });
  
      res.json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.put ('/:id', async (req, res) => {
    try {
      const dbPostData = Post.update({
        title: req.body.title,
        contents: req.body.contents,
        date_created: Date(),
        user_id: req.session.user_id
      });
      
      res.json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;