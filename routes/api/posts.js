const express = require('express');
const router = express.Router();

// @router  GET api/posts/t
// @desc    Tests posts route
// @access  Public
router.get('/t', (req, res) => res.json({ m: 'Posts success' }));

module.exports = router;