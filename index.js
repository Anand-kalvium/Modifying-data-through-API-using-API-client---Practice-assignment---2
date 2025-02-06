const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const app = express()
app.use(express.json())
const menu = require('./schema')

mongoose.connect("mongodb+srv://manands69:12345anand@cluster0.4ogfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Mongodb is connected")
})
.catch(()=>{
    console.log("Error")
})


app.put("/menu", async(req,res)=>{
    try{
        const {id} = req.query
        console.log(id)
        const {name,description,price} = req.body
        const item = await menu.findById(id);
    
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        item.name = name || item.name;
        item.description = description || item.description;
        item.price = price || item.price;
        await item.save()

        res.status(200).json({ message: "Menu item updated", item });
        
    }
    catch(error){
        res.status(500).json({ error: "Server error" });
    }
})

app.delete("/delete/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const item = await menu.findByIdAndDelete(id);
        // console.log(item)
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
     
        res.status(200).json({ message: "Menu item deleted" });
    }
    catch(error){
        res.status(500).json({ error: "Server error" });
    }
})

app.listen(3000,(req, res)=>{
    console.log("Running on port 3000")
})