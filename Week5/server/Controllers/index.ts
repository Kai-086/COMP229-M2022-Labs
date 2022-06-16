import express from 'express';

/* Move controller from Routes to here*/
/* Controller part: from "function to }" */
export function DisplayHomePage(req: express.Request, res: express.Response, next: express.NextFunction) {  
    res.render('index', { title: 'Home', page: 'home' });
}

export function DisplayAboutPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'About Us', page: 'about'});
}

export function DisplayOurProject(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Our Projects', page: 'projects' });
}

export function DisplayOurServices(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Our Services', page: 'services' });
}

export function DisplayContactUs(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index', { title: 'Contact Us', page: 'contact' });
}