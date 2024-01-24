const { fileLoader } = require('ejs')
const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
name:{
type:String,
required:true
},
price:{
type:Number,
required:true,
min:0
},
category:{
type:String,
enum:['Fruit','Vegetable','Dairy']
},
description:String,
})

const Product=mongoose.model("Product",ProductSchema)

module.exports=Product