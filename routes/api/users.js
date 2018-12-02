const express = require('express');
const router = express.Router();

// @router  GET api/users/t
// @desc    Tests users route
// @access  Public
router.get('/t', (req, res) => res.json({ m: 'Users success' }));

module.exports = router;