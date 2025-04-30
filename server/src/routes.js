const AuthenticationController = require('./controllers/AuthenticationController')

module.exports = (app) =>{
    app.post('/login',
    AuthenticationController.login)

    app.post('/register',
        AuthenticationController.register)
}
