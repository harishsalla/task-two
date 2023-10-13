const express=require("express")
const user=require("./MOCK_DATA.json")
const fs=require("fs")
const app=express()

app.use(express.urlencoded({extended:false}))



app.get("/user",(req,res)=>{
    const html = `
  <ul>
    ${user.map((value, index) => (
      `<li>${value.first_name}</li>`
    )).join('')}
  </ul>
`;

    res.send(html)
})

app.get('/api/user',(req,res)=>{
    res.json(user);
})

app.get("/api/user/:id",(req,res)=>{
    const id=Number(req.params.id)
    const sentid=user.find((value)=>value.id===id)
    return res.send(sentid)
})

app.post("/api/user",(req,res)=>{
    const body=req.body
    console.log(body)
    user.push({...body,id:user.length+1})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(user),(err,data)=>{
        return res.json({status:"success",id:user.length})
    })
})

app.patch("/api/user/:id",(req,res)=>{
    const body=req.body
    const id=Number(req.params.id)
    const updateid=user.findIndex((value)=>value.id===id)
    if (updateid!==-1){
        user[updateid]={...user[updateid],...body}
        res.json("displaying the upated user",user[id])
        console.log(user[id])
    }
    else{
        res.json("unable to patch the value ",{status:"failed"})
    }
    



})


app.listen(3000,()=>{
    console.log("listening to port number 3000")
})