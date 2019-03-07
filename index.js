const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express()
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'justtest',
  database : 'test'
});


app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))





connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

app.get('/data', (req, res) => res.render('./form_a320'))

app.get('/news', (req, res) => {
	connection.query('SELECT * from news', function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', JSON.stringify(results,null,4));
	  res.send(JSON.stringify(results),null,4)
	});
})

app.post("/submitted",function(res,req){
	connection.query("insert into news (title, description) values ('Headline 3', 'This is yet another not very useful description for the headline')",function(err,res){
		if(err){
			console.log(err)
		}
		else{
			console.log("Success")
		}
	});
})