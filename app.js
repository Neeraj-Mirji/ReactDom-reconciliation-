const ejs = require('ejs');
const bodyParser = require('body-parser');
const express = require("express");



const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let htmlContent = "";
let flag = 1;
let convertFlag = 0;
let clearFlag = 0;


app.get('/' , function(req , res)
{
  res.render('index' , {htmlContent : htmlContent , flag : flag , convertFlag : convertFlag , clearFlag : clearFlag});
});



app.post('/' , function(req , res)
{

  htmlContent = req.body.htmlInput;
  flag = 1;
  // console.log(convertFlag);

  var spawn = require("child_process").spawn;
  var process = spawn('python',["./convert.py" , htmlContent] );


  process.stdout.on('data' , function(data)
   {

     console.log(data.toString());

   });
   res.render('index' , {htmlContent : htmlContent , flag : flag , convertFlag : convertFlag , clearFlag : clearFlag});

});


app.listen(3000 , function()
{
  console.log("Server started at port 3000");
});
