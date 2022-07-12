/* import { Schema, model } from "mongoose"; */

const {Schema} = require("mongoose")
const {model} = require("mongoose")

const UserSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    refreshToken: {type: String, required: true},
})

module.exports = model("Token", UserSchema);