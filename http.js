const http=require("http");

const fs=require("fs")

const myurl=require('url');



const serverone = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/home') {
    let newvalue= '';
    req.on('data', (small) => {
      newvalue= small.toString();
    });

    req.on('end', () => {
      res.setHeader('Content-Type', 'text/plain');
      res.end(newvalue);
    });
  } 
});



const server=http.createServer((req,res)=>{
  if (req.method ==="POST" && req.url==="/home"){
    const body=req.body.name
    res.end(body)
  }

  if (req.url==='/favicon.ico'){
    return res.end()
  }

  const parsedurl=myurl.parse(req.url,true)
  console.log(parsedurl)
  const logo=`${Date.now()}:requested the new url and the url name is ${req.url}\n`
   fs.appendFile("allurl.txt",logo,(err,data)=>{
    switch(myurl.pathname){
      case "/hello":
        res.write("you have acesed to the main page");
        res.end()
        break;
      case "/home":
        const displayname=myurl.query.name;
        res.write("hello"+displayname)
        res.end("you have entered to home page");
        break;
      case "/about":
        if(req.method=="POST"){
          res.write("about page")
          res.end("hello")
        }
      default:
        res.end("error 404 : page not found")
        break;
    }
   })
})

server.listen(3000,()=>{
  console.log("listening to port 3000")
})


serverone.listen(4000,()=>{
    console.log("listening to port number 4000")
})