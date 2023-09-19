const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // todo: Serialize data so the template can read it
    const projects = null;

    // todo: Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
       
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // todo: Serialize data so the template can read it
    const project = null;

    // todo: Pass serialized data and session flag into template
    res.render('project', {
      ...project,
      
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    // todo: Serialize data so the template can read it
    const user = null;

    // todo: Pass serialized data and session flag into template
    res.render('profile', {
      ...user,
      
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // todo: If the user is already logged in, redirect the request to another route
  if (false) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
