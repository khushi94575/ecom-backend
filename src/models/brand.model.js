const mongoose=require("mongoose");
const brandSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    logo:{
        url:{
            type:String,
        },
        publicId:{
            type:String,
        }
    },
    isActive:{
        type:Boolean,
        default:true
    }
})
const brandModel=mongoose.Schema("brand",brandSchema);
module.exports={brandModel};