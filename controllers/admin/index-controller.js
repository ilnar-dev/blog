export function index (req, res) {
    res.render("admin/index", {url: req.originalUrl});
}