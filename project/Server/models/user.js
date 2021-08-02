const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    identity: { type: String, required: true,},
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    birthYear: { type: Number, required:true },
    adress: { type: String, required: true },
    status: { enum: ['USER', 'AUCTION_MANAGER', 'SITE_MANAGER'], required: true, default: 'USER' }

});
const User = mongoose.model("User", userSchema);
module.exports = User;
