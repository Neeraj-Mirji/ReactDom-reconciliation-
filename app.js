const ejs = require('ejs');
const bodyParser = require('body-parser');
const express = require("express");



const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let htmlContent = "";


app.get('/' , function(req , res)
{
  res.render('index' , {htmlContent : htmlContent});
});



app.post('/' , function(req , res)
{
  let htmlContent = req.body.htmlInput;
//  console.log(htmlContent);

  var spawn = require("child_process").spawn;
  var process = spawn('python',["./convert.py" , htmlContent] );


  process.stdout.on('data' , function(data)
   {

     console.log(data.toString());

   });
    res.render('index'  , {htmlContent : htmlContent});

});


app.listen(3000 , function()
{
  console.log("Server started at port 3000");
});
