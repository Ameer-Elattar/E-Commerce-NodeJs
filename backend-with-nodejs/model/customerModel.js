const mongoose = require('mongoose');
const sequence = require("mongoose-sequence")(mongoose);


const schemaCustomer = new mongoose.Schema({
    _id : Number,
    firstName : String,
    lastName : String,
    email : {type : String, unique: true},
    password : {type : String, select : false},
    phone : {type: String, unique: true},
    address : String,
    img : String,
    balance : Number,
    orders:[{
        _id : {type : Number, unique: true},
        date : {type : Date, default: Date.now},
        total : Number,
        status : String,
        products : [{
            _id : Number,
            price : Number,
            quantity : Number,
        }]
    }]

});

schemaCustomer.plugin(sequence,{id: 'Customers_counter'});


module.exports = mongoose.model("customers", schemaCustomer);
