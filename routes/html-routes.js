//Require Path for relative routes to our HTML files
const path = require('path');

module.exports = (router) => {
    //Root route to index.html
    router.get('/', (req, res) => {
        res.sendFile(__dirname, '../public/index.html');
    });

    //Route to exercise.html
    router.get('/exercise', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/exercise.html'));
    });

    //Route to stats.html
    router.get('/stats', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/stats.html'));
    });
}