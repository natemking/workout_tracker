module.exports = (router) => {
    router.get('/', (req, res) => {
        res.sendFile('../index.html');
    });
}