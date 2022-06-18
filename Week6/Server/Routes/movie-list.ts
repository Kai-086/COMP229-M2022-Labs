import express from 'express';
const router = express.Router();

import { AuthGuard } from '../Util';

import { DisplayMovieList } from '../Controllers/movie-list';

// Try go to movie-list page, then check if login. If so, go to movie-list page
// If not, go back to login page
router.get('/movie-list', AuthGuard, DisplayMovieList);

export default router;