import _ from 'lodash';
import "./index.css";

import SPARouter from "@kodnificent/sparouter";

import mealRouter from "./pages/meal";
import homeRouter from "./pages/home";
import reviewRouter from "./pages/review";

const options = {
  historyMode: true // set this to true if you use the HTML5 history mode API
};
const router = new SPARouter(options);

router.get("/", homeRouter(req, router));
router.get("/meals/{id}", mealRouter(req, router));
router.get("/review", reviewRouter(req, router));

router.init();
