/*!
 * Copyright (c) 2022 himatchi
 *
 * Released under the MIT license.
 * see https://opensource.org/licenses/MIT
 */
import Express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes";
import mongoose from "mongoose";
import session from "express-session";
try{
    mongoose.connect('mongodb://localhost:27017/calender_db');
}catch(err){
    console.log(`Error!: ${err}`);
    process.exit(-1);
}
console.log("Connected to mongodb://localhost:27017/calender_db");
mongoose.Promise = global.Promise;

const app = Express();
const port = 3000;

app.set("view engine", "ejs");
app.set('views', './src/views');

app.use(session({
    secret: 'imoj1o2joi8a098j0981nus9j0qj2',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000},
}));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(Express.static(__dirname + '/public'));
app.use('/' , router);
app.listen(port, () => {
    console.log("listening on port 3000!");
});
export default app;