const mongoose = require('mongoose');
const Product=require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmstands')
    .then(()=>{
       console.log('connection open')
    })
    .catch(err =>{
        console.log('oh no error')
        console.log(err)
    })

// const p=new Product({
// name:'apple',
// price:5,
// category:'fruit'
// })
// p.save()
// .then(p=>{
// console.log(p)
// })
// .catch(e=>{
// console.log(e)
// })
const seedProducts=[
    {
        name:'vikky',
        price:2,
        category:'fruit'
        
    },
    {
        name:'somu',
        price:1,
        category:'dairy'
        
    },
    {
        name:'mava',
        price:3,
        category:'vegetable'
        
    },
    {
        name:'kid',
        price:4,
        category:'fruit'
        
    },

]
 Product.insertMany(seedProducts)
 .then(res=>{
     console.log(res)
 })
 .catch(e=>{
     console.log(e)
 })