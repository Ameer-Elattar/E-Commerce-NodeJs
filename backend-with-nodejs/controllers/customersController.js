const customerModel = require('./../model/customerModel');


exports.getAllCustomers = function(req,res,next){

    customerModel.find({}).then((data)=>res.status(200).json(data));
    
}


exports.insert = function(req,res,next){
    customerModel.create(req.body).then((data)=>{res.status(200).json({ data: data })}).catch((error) => next(error));
}

exports.update = (req, res, next) => {
    customerModel.findOneAndUpdate({ _id: req.body._id },req.body).then((data)=>{res.status(200).json(data);}).catch((error) => next(error));
};

exports.getCustomerById = (req, res, next) => {
    customerModel.findOne({_id:req.params.id}).then((data)=>{res.status(200).json(data);})
};

exports.deleteCustomerById = (req, res, next) => {
    customerModel.findByIdAndDelete({_id:req.params.id}).then((data)=>{res.status(200).json(data);})
};