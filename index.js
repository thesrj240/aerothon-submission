const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

var app = express()


var mysql      = require('mysql');

var dummy_connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'justtest',
  database : 'test'
});

var main_connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'justtest',
  database : 'test'
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))





dummy_connection.connect();
main_connection.connect();
 
// dummy_connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

app.get('/data', (req, res) => res.render('./form_a320'))

app.get('/news', (req, res) => {
	dummy_connection.query('SELECT * from news', function (error, results, fields) {
	  if (error) throw error;
	  res.send(JSON.stringify(results),null,4)
	});
})

app.post("/submitted",function(res,req){
	// main_connection.query('insert into flights (msn,harness_length,gross_weight,atmospheric_pressure,room_temperature,airport,fuel_cap_left,fuel_cap_right,fuel_qty_left,fuel_qty_right,max_alt,flight_no,model) values ?' ),,function(err,res){
	// 	if(err){
	// 		console.log(err)
	// 	}
	// 	else{
	// 		console.log("Success")
	// 	}
	// });
	
	console.log(req.body);
})