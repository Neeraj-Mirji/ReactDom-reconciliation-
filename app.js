const ejs = require('ejs');
const bodyParser = require('body-parser');
const express = require("express");



const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let htmlContent = "";
let flag = 0;
let convertFlag = 0;
let clearFlag = 0;


app.get('/' , function(req , res)
{
  res.render('index' , {htmlContent : htmlContent , flag : flag });
});



app.post('/' , function(req , res)
{

  htmlContent = "";
  htmlContent = req.body.htmlInput;
  flag = 1;
  

  var spawn = require("child_process").spawn;
  var process = spawn('python',["./convert.py" , htmlContent] );


  process.stdout.on('data' , function(data)
   {

     console.log(data.toString());

   });
   
   console.log(htmlContent);

  setTimeout(() => {res.render('index' , {htmlContent : htmlContent , flag : flag })}, 1000);
   

});


app.listen(3000 , function()
{
  console.log("Server started at port 3000");
});
