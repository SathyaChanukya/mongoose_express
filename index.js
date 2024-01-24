const express=require('express')
const app=express()
const path=require('path')
const mongoose = require('mongoose');
const Product=require('./models/product')
const methodOverride=require('method-override')

const categories=['Fruit','Vegetable','Dairy']

mongoose.connect('mongodb://localhost:27017/farmstands')
    .then(()=>{
       console.log('connection open')
    })
    .catch(err =>{
        console.log('oh no error')
        console.log(err)
    })

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.get('/products', async(req,res)=>{
    const {category}=req.query
    if(category){
        const product=await Product.find({category})
        res.render('products/index',{product,category})
    }else{
    const product= await Product.find({})
    res.render('products/index',{product,category:'All'})
    }
})

// app.get('/products', async (req, res) => {
//   try {
//     const product = await Product.find();
//     res.render('products/index', { product });
//   } catch (err) {
//     res.status(500).send('An error occurred while retrieving products.');
//   }
// });

app.get('/products/new',(req,res)=>{
res.render('products/new')
})

app.post('/products',async(req,res)=>{
const newProduct=new Product(req.body)
await newProduct.save()
console.log(newProduct)
res.redirect('products')
})

app.get('/products/:id',async(req,res)=>{
const{id}=req.params
const product=await Product.findById(id)
res.render('products/show',{product})
})

app.get('/products/:id/edit',async(req,res)=>{
const{id}=req.params
const product=await Product.findById(id)
res.render('products/edit',{product,categories})
})

app.put('/products/:id',async(req,res)=>{
const{id}=req.params
const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true})
res.redirect('/products')
})

app.delete('/products/:id',async(req,res)=>{
    const {id}=req.params
    const deleteProduct=await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(4000,()=>{
console.log("Listening to port 4000")
})