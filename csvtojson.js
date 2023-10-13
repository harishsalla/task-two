const express=require('express')

const mysql=require('mysql2')

const csv = require('csv-parser');

const fs=require("fs")

const EventEmitter = require('events')

const readline=require('readline')

const app=express()

const csvpath = './myfile.csv'; 

const jsonpath='./output.json'

let db=mysql.createPool({
  host:"localhost",
  user:"root",
  password:"Harish@9959",
  database:"my_app"
}).promise()

function converter(csvpath,jsonpath){
  const readableStream = fs.createReadStream(csvpath);
  const writableStream = fs.createWriteStream(jsonpath);
  readableStream
    .pipe(csv())
      .on ('data',(row) => {
        writableStream.write(JSON.stringify(row) + '\n');
        console.log(row)
        const entries = Object.entries(row);
        for (const [key, value] of entries) {
          console.log(`Key: ${key}, Value: ${value}`);
        }
        console.log(entries)

      })
      .on('end', () => {
        writableStream.end();
      });
  }
  
app.get('/',(req,res)=>{
  converter(csvpath,jsonpath)
})

app.listen(3000,()=>{
    console.log("listening to the port 3000")
})



// [{
//   "name":harsh,
//   "pin": 12
// }]