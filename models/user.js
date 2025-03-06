const mongoose = require("mongoose")
// SingUp Schema
const SingUpSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true,
    }
},
{timestamps:true}
)

// SingnUp Model
const SingUpModel = mongoose.model("SignUpModel",SingUpSchema);

module.exports = {
    SingUpModel
}