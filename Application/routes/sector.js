var express = require('express');
var router = express.Router();
var db = require('./dbOperations');

router.get('/get', function (_req, _res) {
    var Sqlquery = 'Select ID,SectorUniqueID,SectorName from dbo.tblSector';
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

module.exports = router;