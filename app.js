import express from 'express'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import cors from 'cors';
import session from "express-session";
import AuthController from "./users/auth-controller.js";


const app = express();
app.set("trust proxy", 1);

app.use(cors({
  credentials: true,
  origin: "https://a5--gentle-alfajores-b60970.netlify.app",
}
));

app.use(
    session({
      secret: "any string",
      resave: false,
      proxy: true,
      saveUninitialized: false,
      cookie: {
        sameSite: "none",
        secure: true,
      },
    })
   );


app.use(express.json());

const port = process.env.PORT || 4000;
TuitsController(app);
HelloController(app)
UserController(app) 
AuthController(app);
app.listen(4000)

   