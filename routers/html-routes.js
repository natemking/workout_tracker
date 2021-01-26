//*** Dependencies ***//
//====================//
const express = require('express');
const path = require('path');

//*** Directories ***//
//===================//
const VIEWS_DIR = path.resolve(__dirname, '../public/views')

//*** Express Router ***//
//======================//
const router = express.Router();

//*** HTML Routes ***//
//===================//

//Root route to index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(VIEWS_DIR, 'index.html'));
});

//Route to exercise.html
router.get('/exercise', (req, res) => {
    res.sendFile(path.join(VIEWS_DIR, 'exercise.html'));
});

//Route to stats.html
router.get('/stats', (req, res) => {
    res.sendFile(path.join(VIEWS_DIR, 'stats.html'));
});


module.exports = router;
