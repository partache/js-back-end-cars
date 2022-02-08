module.exports = {
    async home(req, res) {

        const cars = await req.storage.getAll(req.query);
        
        res.render('index', { cars, title: 'Carbicle', query: req.query});// 2nd param is context
    }
};
//req.query- express parses query string and saves the search details