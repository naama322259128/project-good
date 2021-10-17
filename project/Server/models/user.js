const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    password: { type: String, required: true },
    userName: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String
        // validate: {
        //     validator: function (v) {
        //         return /\d{9}/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        // }
    },
    birthYear: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ['USER', 'AUCTION_MANAGER', 'SITE_MANAGER'], required: true, default: 'USER' },
    confidentiality: { type: Boolean, default: false }//חסוי או לא חסוי
});
const User = mongoose.model("User", userSchema);
module.exports = User;
