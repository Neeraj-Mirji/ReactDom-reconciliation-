const ejs = require('ejs');
const bodyParser = require('body-parser');
const express = require("express");



const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let htmlContent = "";
let flag = 0;

function incrementFlag(flag) {
  if(flag<2){
    flag = flag + 1;
  }
  return flag;
}


app.get('/' , function(req , res)
{
  res.render('index' , {htmlContent : htmlContent , flag : flag });
});



app.post('/' , function(req , res)
{

  htmlContent = "";
  htmlContent = req.body.htmlInput;
  flag = incrementFlag(flag);
  // console.log(flag);

  var spawn = require("child_process").spawn;
  var process = spawn('python',["./convert.py" , htmlContent, flag] );


  process.stdout.on('data' , function(data)
   {

    //  console.log(data.toString());

   });
   
   console.log(htmlContent);

  setTimeout(() => {res.render('index' , {htmlContent : htmlContent , flag : flag })}, 1000);
   

});


app.listen(3000 , function()
{
  console.log("Server started at port 3000");
});
