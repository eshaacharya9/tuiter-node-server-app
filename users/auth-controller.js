import * as usersDao from "./users-dao.js";


const AuthController = (app) => {
 const register = (req, res) => {
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
        res.sendStatus(409);
        return;
   }
   const newUser = usersDao.createUser(req.body);
   req.session["currentUser"] = newUser;
   res.json(newUser);
  };
 const login    = (req, res) => { 
   const username = req.body.username;
   const password = req.body.password;
   if(username && password){
        const user = usersDao.findUserByCredentials(username, password);
        if (user) {
            req.session["currentUser"] = user;
            res.json(user);
        } else {
            res.sendStatus(403);
        }
   }
   else {
    res.sendStatus(403);
   }

 };
 const profile  = (req, res) => { 
    const currentUser = req.session["currentUser"];
   if (!currentUser) {
     res.sendStatus(403);
     return;
   }
   res.json(currentUser);

 };
 const logout   = (req, res) => {
    req.session.destroy();
   res.sendStatus(200);
  };


 const update   = (req, res) => { 
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
        res.sendStatus(403);
        return;
      }
      const userId = currentUser._id;
      const updates=req.body;
      const updatedUser = usersDao.updateUser(userId,updates);
      if(updatedUser){
        req.session["currentUser"]=updatedUser;
        res.json(updatedUser);
      }
      else{
        res.sendStatus(404);
      }
 };


 app.post("/api/users/register", register);
 app.post("/api/users/login",    login);
 app.post("/api/users/profile",  profile);
 app.post("/api/users/logout",   logout);
 app.put ("/api/users",          update);
};
export default AuthController;