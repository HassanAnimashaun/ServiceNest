module.exports = {
    port: process.env.PORT || 8081,
    db:{
        database: process.env.DB_NAME || 'adminLogin',
        user: process.env.DB_USER || 'adminLogin',
        password:process.env.DB_PASS || 'adminLogin',
        options:{
            dialect: process.env.DIALECT|| 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './adminLogin.sqlite'
        }
    },

    authentication: {
        jwtSecret: process.env.JWT_SECERET || 'secret'
    }
}

