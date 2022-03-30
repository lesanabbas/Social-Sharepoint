const mongoose = require('mongoose')
const { v1: uuidv1 } = require('uuid')
const crypto = require('crypto')
const { QbjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    notificationToken: {
        type: String
    },
    following: [{
        type: ObjectId,
        ref: "User"
    }],

    followers: [{
        type: ObjectId,
        ref: "User"
    }],

    resetPasswordLink: {
        data: String,
        default: ""
    }
});

userSchema.virtual('password').set((password) => {
    this._password = password;
    this.salt = uuidv1();

    this.hashed_password = this.encryptPassword(password);
})
.get(() => {
    return this._password;
})



userSchema.method = {

    authenticate: (plainText) => {
        return this.encryptPassword(plainText) == this.hashed_password;
    },

    encryptPassword: (password) => {
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                    .update(password)
                    .digest('hex')
        } catch(error) {
            return ""
        }
    }
}

module.exports = mongoose.model("User", userSchema);