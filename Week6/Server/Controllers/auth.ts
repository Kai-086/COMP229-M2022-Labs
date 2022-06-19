import express from 'express';

// Need passport functionality
import passport from 'passport';

// Need to include the User model for authentication functions
import User from '../Models/user';;

// Import the DisplayName Utility method
import { UserDisplayName } from '../Util';

/* Display Functions */
export function DisplayLoginPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    if(!req.user) {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req)});
    }
    return res.redirect('/movie-list');
}

export function DisplayRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    if(!req.user) {
        return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req)});
    }
    return res.redirect('/movie-list');
}


/* Processing Functions */
export function ProcessLoginPage(req: express.Request, res: express.Response, next: express.NextFunction) {
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
        req.logIn(user, function(err) {
            // Are there DB errors?
            if(err) {
                console.error(err);
                res.end(err);
            }

            return res.redirect('/movie-list');
        });
    })(req, res, next);
}
 
export function ProcessRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    // Instantiate a new user object
    let newUser = new User({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });

    User.register(newUser, req.body.password, function(err) {
        if(err) {
            if(err.name == "UserExistsError") {
                console.error('ERROR: User Already Exists!');
                req.flash('registerMessage', 'Registration Error!');
            }
            else {
                console.error(err.name); // Other error
                req.flash('registerMessage', 'Server Error');
            }
            return res.redirect('/register');
        }

        // Everything is ok - user has been registered

        // Automatically login the user
        return passport.authenticate('local')(req, res, function() {
            return res.redirect('/movie-list');
        });
    });
}

export function ProcessLogoutPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.logOut(function(err) {
        if(err) {
            console.error(err);
            res.end(err);
        }

        console.log("User Logged Out");
    });
    res.redirect('/login');
}