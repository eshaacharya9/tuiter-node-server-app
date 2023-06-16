import express from 'express'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import cors from 'cors';
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";
//mongoose.connect("mongodb://127.0.0.1:27017/tuiter");
mongoose.connect("mongodb+srv://eshaacharya9:Eg26uYGLCm0JbX7Q@cluster0.rajndfx.mongodb.net/tuiter?retryWrites=true&w=majority")
const app = express();
app.use(
    session({
      secret: "any string",
      resave: false,
      saveUninitialized: true,
    })
   );
app.use(cors({
    credentials: true,
    //origin: "https://a5--gentle-alfajores-b60970.netlify.app",
    origin: "http://localhost:3000"
  }
 ));
app.use(express.json());

const port = process.env.PORT || 4000;
TuitsController(app);
HelloController(app)
UserController(app) 
AuthController(app);
app.listen(4000)

   
   