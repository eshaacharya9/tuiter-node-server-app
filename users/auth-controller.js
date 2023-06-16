import * as usersDao from "./users-dao.js";

var currentUserVar;
const AuthController = (app) => {
    const register = async (req, res) => {
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(403);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        console.log(newUser);
        req.session["currentUser"] = newUser;


    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
                req.session["currentUser"] = user;
                res.json(user);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }

    };

    const profile = async (req, res) => {
        const currentUser = currentUserVar;
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        res.json(currentUser);
    };

    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = async (req, res) => {
        const currentUser = currentUserVar;
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        const userId = currentUser._id;
        const updates = req.body;
        const updatedUser = usersDao.updateUser(userId, updates);
        if (updatedUser) {
            currentUserVar = updatedUser;
            res.json(updatedUser);
        } else {
            res.sendStatus(404);
        }
    };


    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users", update);
};

export default AuthController;