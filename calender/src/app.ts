import Express from "express";
import calenderController from "./controller/calenderController";

const app = Express();
app.set("view engine", "ejs");
app.set('views', './src/views');

app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.get("/calender", calenderController);
app.listen(3000, () => {
    console.log("listening on port 3000!");
});
export default app;