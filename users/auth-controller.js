import * as usersDao from "./users-dao.js";

// var currentUserVar;
const AuthController = (app) => {
    const register = async (req, res) => {
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(409);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        console.log(newUser);
        req.session["currentUser"] = newUser;
        res.json(newUser);

    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        console.log(username, password);
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
        const currentUser = req.session["currentUser"];
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
        console.log('===> update')
        const currentUser = req.session["currentUser"];
        console.log(currentUser)
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        const userId = currentUser._id;
        const updates = req.body;
        console.log(updates)
        const newUser = {...currentUser, ...req.body};
        console.log(newUser)
        const status = await usersDao.updateUser(userId, updates);
//        console.log(status)
        if (status) {
            req.session["currentUser"] = newUser;
            console.log(req.session)
            res.json(status);
        } else {
            res.sendStatus(404);
        }
    };


    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users/:id", update);
};

export default AuthController;