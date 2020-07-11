const http = require("http");
const express = require('express')
const bodyParser = require('body-parser')
const ipn = require('./ipn')
const app = express()
const { verify } = require('coinpayments-ipn');
const CoinpaymentsIPNError = require('coinpayments-ipn/lib/error');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/',  ipn.update ) // create transaction

app.set('port', process.env.PORT || 3002)

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port' + app.get('port'))
  })