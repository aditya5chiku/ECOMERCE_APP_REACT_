const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            default: 0
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    },
    { timestamps: true }
);



//generate token
userSchema.methods.generateAuthToken = async function () {
    try {
        // console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString() }, process.env.APP_SECRET)
        this.tokens = this.tokens.concat({ token: token })
        console.log("THIS", this.tokens)
        await this.save()
        return token
    } catch (err) {
        console.log(err);
    }
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};





module.exports = mongoose.model("User", userSchema);
