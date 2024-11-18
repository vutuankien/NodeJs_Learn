class AboutController {
  index(req, res) {
    res.render('about');
  }

  // [GET] /about/author
  author(req, res) {
    console.log(req.params);
    res.send('author ' + req.params.slug);
  }
}

module.exports = new AboutController();
