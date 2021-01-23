module.exports = (router) => {
    router.get('/api/stats', (req, res) => {
        res.json({ 'test': 'passed'});
    });
}