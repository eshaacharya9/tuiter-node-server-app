import express from 'express'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import cors from 'cors';
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";

// mongoose.connect("mongodb://127.0.0.1:27017/tuiter");
 mongoose.connect("mongodb+srv://eshaacharya9:Eg26uYGLCm0JbX7Q@cluster0.rajndfx.mongodb.net/tuiter?retryWrites=true&w=majority")

// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter'
// mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000","http://localhost:3001","https://a6--gentle-alfajores-b60970.netlify.app"]
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
      secure: true
    }
  })
 );


 app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:3000","http://localhost:3001","https://a6--gentle-alfajores-b60970.netlify.app"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
});

app.use(express.json());

const port = process.env.PORT || 4000;
TuitsController(app);
HelloController(app)
UserController(app) 
AuthController(app);
app.listen(4000)

   