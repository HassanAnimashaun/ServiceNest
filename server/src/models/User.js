const { genSalt } = require('bcrypt');
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))

function hashPassword(use,options){
    const SALT_FACTOR = 8
    console.log('hashpassword')

    if (!user.changed('password')){
        return;
    }

    return bcrypt
        ,genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashSync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        username:{
            type: DataTypes,
            unique: true
        },
        password: DataTypes.STRING,
    },{
       hooks:{
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
        beforeSave: hashPassword
       } 
    })

    User.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.password)
    }

    return User
}