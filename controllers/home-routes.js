const router = require('express').Router();
const { User, Post, Comment} = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
// Use the custom middleware before allowing the user to access the gallery
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
            'username'
          ],
        },
        {
          model: Comment,
            include: {model: User,
            attributes: ['username']}
        }
      ],
    });

    const post = dbPostData.get({ plain: true });
    let idEqual = req.session.user_id == dbPostData.user_id;
    res.render('post', { post, loggedIn: req.session.loggedIn, idEqual: idEqual});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [{model: User, attributes: ['username']}]
    });

    const username = await User.findByPk(req.session.user_id,{
      attributes: ['username']
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    
    res.render('dashboard', {posts, loggedIn: req.session.loggedIn, username: username.dataValues.username});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.delete('/post/delete/:id', withAuth, async (req, res) => {
//   try {
//     const dbPostData = await Post.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then((deletedBook) => {
//       res.json(deletedBook);
//     })
//     .catch((err) => res.json(err));
//   } catch (err){
//     console.log(err);
//     res.status(500).json(err);
// }});

// router.post('/create/post', withAuth, async (req, res) => {
//   try {
//     const dbPostData = await Post.create({
//       title: req.body.title,
//       contents: req.body.contents,
//       date_created: Date(),
//       user_id: req.session.user_id
//     });

//     res.json(dbPostData);
//   } catch {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get('/new/post', withAuth, async (req, res) => {
  try  {
    res.render('postForm', {user_id: req.session.user_id});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/update/post/:id', withAuth, async (req, res) => {
  try  {
    const dbPostData = await Post.findByPk(req.params.id);
    const post = dbPostData.get({ plain: true });
    res.render('postUpdate', {post, user_id: req.session.user_id});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET one painting
// Use the custom middleware before allowing the user to access the painting
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
module.exports = router;
