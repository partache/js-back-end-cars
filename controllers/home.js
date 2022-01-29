module.exports = {
    async home(req, res) {
        //req.query- express parses query string and saves the search details
        const cars = await req.storage.getAll(req.query);
        res.render('index', { cars, title: 'Carbicle', query: req.query});// 2nd param is context
    }
};