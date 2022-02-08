const User = require('../models/User');

async function register(session, username, password) {
    const user = new User({
        username,
        hashedPassword: password
    });
    await user.save();

    session.user = {
        id: user._id,
        username: user.username
    };
}

async function login(session, username, password) {
    const user = await User.findOne({ username });

    if (user && await user.comparePassword(password)) {
        session.user = {
            id: user._id,
            username: user.username
        };
        return true;
    } else {
        throw new Error('Incorrect username or password');
    }
}
//the controller expects an error if unsuccessful log in
//find user and compare pass

function logout(session) {
    delete session.user;
}

module.exports = () => (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        res.locals.hasUser = true
    }

    req.auth = {
        register: (...params) => register(req.session, ...params),
        login: (...params) => login(req.session, ...params),
        logout: () => logout(req.session)
    };

    next();
};
//factory function
//modify session by register and login and they need access to req
//fix 3rd param of register with partial application
//by login set up user session info
//if there is user in session, we will set user session in res.locals
//in locals we have sth. that will be present in all controllers