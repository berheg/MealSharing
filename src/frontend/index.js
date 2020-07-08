import _ from 'lodash';
import "./index.css";
import "./glider.min.css";
import page from "page";
import mealRouter from "./pages/meal";
import homeRouter from "./pages/home";
import reviewRouter from "./pages/review";
import handleMealRequest from "./pages/meals";

const options = {
  historyMode: true // set this to true if you use the HTML5 history mode API
};
homeRouter();
page("/home", homeRouter);
page("/meals", mealRouter);
page("/review", reviewRouter);
page("/meal/:id",(req)=>handleMealRequest(req.params));
page.start();
//router.init();
//search product lists with searchkey
