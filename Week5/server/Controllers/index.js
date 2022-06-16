"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayContactUs = exports.DisplayOurServices = exports.DisplayOurProject = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayAboutPage(req, res, next) {
    res.render('index', { title: 'About Us', page: 'about' });
}
exports.DisplayAboutPage = DisplayAboutPage;
function DisplayOurProject(req, res, next) {
    res.render('index', { title: 'Our Projects', page: 'projects' });
}
exports.DisplayOurProject = DisplayOurProject;
function DisplayOurServices(req, res, next) {
    res.render('index', { title: 'Our Services', page: 'services' });
}
exports.DisplayOurServices = DisplayOurServices;
function DisplayContactUs(req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact' });
}
exports.DisplayContactUs = DisplayContactUs;
//# sourceMappingURL=index.js.map