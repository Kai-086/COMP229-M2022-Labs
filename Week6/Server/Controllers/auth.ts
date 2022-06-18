import express from 'express';

// Need passport functionality
import passport from 'passport';

// Need to include the User model for authentication functions
import User from '../Models/user';;

/* Display Functions */
export function DisplayLoginPage(req: express.Request, res: express.Response, next: express.NextFunction){
    res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: ''});
}

export function DisplayRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction){
    res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: ''});
}

/* Processing Functions */
export function ProcessLoginPage(req: express.Request, res: express.Response, next: express.NextFunction){
    passport.authenticate('local', function(err, user, info) {
        // Are there server errors?
        if(err) {
            console.error(err);
            res.end(err);
        }

        // Are there login errors?
        if(!user) {
            req.flash('loginMessage', 'Authentication Error!');
            return res.redirect('/login');
        }

        // No problem - we have a good username and password
        req.login(user, function(err) {
            // Are there DB errors?
            if(err) {
                console.error(err);
                res.end(err);
            }

            return res.redirect('/movie-list');
        });
    })(req, res, next);
}
 
export function ProcessRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction){
  
}

export function ProcessLogoutPage(req: express.Request, res: express.Response, next: express.NextFunction){
    
}