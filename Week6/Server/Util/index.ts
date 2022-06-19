import express from 'express';

// Convenience function to return the DisplayName of the User
export function UserDisplayName(req: express.Request): string {
    if(req.user) {
        let user = req.user as UserDocument
        return user.DisplayName.toString();
    }
    return ''; // If user not exist
}

// Helper middleware function for guarding secure locations
export function AuthGuard(req: express.Request, res: express.Response, next: express.NextFunction): void {
    if(!req.isAuthenticated()) {
        return res.redirect('/login'); // If not authenticated, go back to login page
    }
    next();
}