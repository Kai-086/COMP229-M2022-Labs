import express from 'express';
const router = express.Router();

// Import the controller module
import {DisplayAboutPage, DisplayContactUs, DisplayHomePage, DisplayOurProject, DisplayOurServices} from "../Controllers/index";

// Call the function from Controllers to here and replace
/* Display home page. */
router.get('/', DisplayHomePage);

/* Display home page. */
router.get('home', DisplayHomePage);

/* Display about page. */
router.get('/about', DisplayAboutPage);

/* Display projects page. */
router.get('/projects', DisplayOurProject);

/* Display services page. */
router.get('/services', DisplayOurServices);

/* Display contact page. */
router.get('/contact', DisplayContactUs);

export default router;
