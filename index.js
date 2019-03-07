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
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

app.get('/phree', (req, res) => res.send('index'))

app.get('/wan', (req, res) => {
	connection.query('SELECT * from news', function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results);
	  res.send(results)
	});
})