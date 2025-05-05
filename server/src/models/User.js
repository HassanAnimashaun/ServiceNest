const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))

// module.exports = (sequelize,DataTypes) =>
//     sequelize.define('User',{
//         username:{
//             type: DataTypes.STRING,
//             unique: true
//         },
//         password: DataTypes.STRING
//     })

function hashPassword (user, options) {
    const SALT_FACTOR = 8
    console.log('hashPassowrd fired', user.password);

    if(!user.changed('password')){
        return;
    }

    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize,DataTypes) =>{
    const User = sequelize.define('User',{
        username:{
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    },{
        hooks:{
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
        }
    })

    User.prototype.comparePassword = function (password) {
        console.log('COMPARE PASSWORD:', password, 'WITH', this.password)
        return bcrypt.compareAsync(password, this.password)
    }

    return User
}