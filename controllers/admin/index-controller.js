export function index (req, res) {
    console.log(req.isAuthenticated());
    console.log(req.session);
    res.render("admin/index", {url: req.originalUrl});
}

export function login (req, res) {
    res.render("admin/login",  {url: req.originalUrl});
}