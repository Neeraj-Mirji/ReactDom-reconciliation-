const ejs = require('ejs');
const bodyParser = require('body-parser');
const express = require("express");
//const { spawn } = require("child_process");


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/' , function(req , res)
{
res.render('index');
});


app.post('/' , function(req , res)
{
  const a = Number(req.body.num1);
  const b = Number(req.body.num2);
  const sum = 0;
  var dataString = "";

  var spawn = require("child_process").spawn;
  var process = spawn('python',["./add.py",a,b,sum] );


//   process.stdout.on('data' , function(data)
// {
//   dataString+=data.toString();
// });


console.log(process);








  res.render('sum' , {sum : sum});

});


app.listen(3000 , function()
{
  console.log("Server started at port 3000");
});
