var express = require('express');
var router = express.Router();
var db = require('./dbOperations');
const request = require('request')

router.get('/getData', function(_req, _res) {
    var Sqlquery = 'Select Number1, Number2, Result, TimestampValue from dbo.MultiplicationData order by TimestampValue desc';
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

router.get('/saveData', function(_req, _res) {
    var Sqlquery = "Insert into dbo.MultiplicationData values ('" + _req.query.Number1 + "','" + _req.query.Number2 + "','" + _req.query.Result + "','" + _req.query.Timestamp + "')";
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

module.exports = router;