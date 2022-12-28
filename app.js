const express=require('express');
const app=new express();

const fs=require('fs');

app.use(express.json());

const data=require('./hospitaldata.json');

//Get
app.get('/hospital',(req,res)=>{
    res.send(data);
})

//Post
app.post('/hospital',(req,res)=>{
data.push(req.body);
fs.writeFile('hospitaldata.json',JSON.stringify(data),(err,resp)=>{
    if(err){
        res.send("Data cannot be written");
    }
    else{
        res.send("Data written successfully");
    }
})
})

//Put
app.put('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    data.forEach((item)=>{
        if(item.hospitalName==name){
            item.patientCount=req.body.patientCount;
            item.hospitalLocation=req.body.hospitalLocation;
        }
    })
    fs.writeFile('hospitaldata.json',JSON.stringify(data),(err,resp)=>{
        if(err){res.send("Data could not be updated")}
        else{res.send("Data updated")}
    })



})

//Delete
app.delete('/hospital/:name',(req,res)=>{
    let name=req.params.name
   
        let value = data.filter(item => item.hospitalName !== name);
    fs.writeFile('hospitaldata.json',JSON.stringify(value),(err,resp)=>{
        if(err){
            res.send("Data cannot be deleted")
        }
        else{
          res.send("Data deleted")
        }
    })
})
app.listen(3000);
console.log("Server listening to port 3000");