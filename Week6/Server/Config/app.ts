import createError from 'http-errors';
import express, { NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// Import db package
import mongoose from 'mongoose';

// Step - For auth - import modules
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

// Modules for JWT support 
import cors from 'cors';

// Step 2 - For auth - define our auth objects
let localStrategy = passportLocal.Strategy; // Alias

// Step 3 - For auth - import the user model
import User from '../Models/user'; 

// Import the router data
import indexRouter from '../Routes/index';  // Top-level routes
import movieListRouter from '../Routes/movie-list'; // Movie-list routes
import authRouter from '../Routes/auth'; // Authentication routes

const app = express();

// Configuration
import * as DBConfig from './db';

mongoose.connect(DBConfig.RemoteURI);

const db = mongoose.connection; // Alias for the mongoose connection

// Listen for Connections or Errors
db.on("open", function() {
  console.log(`Connected to MongoDB at: ${DBConfig.HostName}`);
});

db.on("error", function() {
  console.error(`Connection Error`);
});

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

// View engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors()); // Adds CORS (cross-origin resource sharing) to the config

// Step 4 - For auth - setup express session
app.use(session({
  secret: DBConfig.Secret,
  saveUninitialized: false,
  resave: false
}));

// Step 5 - Setup Flash
app.use(flash());

// Step 6 - Initialize session and passport
app.use(passport.initialize());
app.use(passport.session());

// Step 7 - Implement the Auth strategy
passport.use(User.createStrategy());

// Step 8 - Setup serialization and deserialization (encoding and decoding)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// User routes
app.use('/', indexRouter);
app.use('/', movieListRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: express.Request, res: express.Response, next: NextFunction) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;