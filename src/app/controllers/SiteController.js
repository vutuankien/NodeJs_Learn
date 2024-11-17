

class SiteController {
    search(req,res) {
        res.render('search')
    }
    // [GET] /
    index(req,res) {
        res.render('home')
    }

    //[GET] /search
}

module.exports = new SiteController;