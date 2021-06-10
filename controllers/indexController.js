const indexPage = (req, res) => {
    res.render('pages/index', {
      decumentTitle: 'Home',
      pageName: 'home',
    });
};
module.exports = {
  indexPage,
};
