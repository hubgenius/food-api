const mongoose = require('mongoose')
// var validate = require('mongoose-validator')

// const  nameValidator = [
//     validate({
//         validator: 'matches',
//         arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
//         message: 'Name must be at least 3 characters, max 30, no special characters or numbers, must have space in between name.'
//     }),
//     validate({
//         validator: 'isLength',
//         arguments: [3, 20],
//         message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
//     })
// ];

// const emailValidator = [
//     validate({
//         validator: 'matches',
//         arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
//         message: 'Email must be at least 3 characters, max 40, no special characters or numbers, must have space in between name.'
//     }),
//     validate({
//         validator: 'isLength',
//         arguments: [3, 40],
//         message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
//     })
// ];
// const mobileValidator = [
//     validate({
//         validator: 'matches',
//         arguments: /^((\+)?(\d{2}[-]))?(\d{10}){1}?$/,
//         message: 'Mobile number must be 10 digits.'
//     }),
//     validate({
//         validator: 'isLength',
//         arguments: [10, 15],
//         message: 'Mobile number should be between {ARGS[0]} and {ARGS[1]} characters'
//     })
// ];
const examSchema = new mongoose.Schema({
    name:{
        type:String
    },
    username: {
        type: String,
        required:true
        //  validate: nameValidator 
        
    },

    password:{
        type:String,
        
    },
    email:{
        type:String,
        // required: true, lowercase:true, unique: true, validate: emailValidator
    },
    phone:{
         type: String
        //   required: true, unique: true, validate: mobileValidator
    },

    profile_file: {
        type: String,
       
    },
    description:{
        type:String
    },
    quantities:{
        type:String
    },
    price:{
        type:String
    },
    profile_url: { type: String }
})
// examSchema.methods.comparePassword = function(password) {
//     return compareSync(password, this.password); 
// };
module.exports = mongoose.model("Exam", examSchema);
