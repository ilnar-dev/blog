export function index (req, res) {
    res.render("admin/index", {url: req.originalUrl});
}

export function login (req, res) {
    let messages = req.session.messages || [];
    res.render("admin/login",  {url: req.originalUrl, messages: messages});
}