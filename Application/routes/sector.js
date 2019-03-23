var express = require('express');
var router = express.Router();
var db = require('./dbOperations');

router.get('/get', function (_req, _res) {
    var Sqlquery = 'Select ID,SectorUniqueID,SectorName from dbo.tblSector';
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

router.get('/add', function (_req, _res) {
    var Sqlquery = "Insert into dbo.tblSector ('SectorName') values ('" + _req.query.SectorName + "')";
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

router.get('/edit', function (_req, _res) {
    var Sqlquery = "Update dbo.tblSector set SectorName = '" + _req.query.SectorName + "' where SectorUniqueID = '" + _req.query.SectorUniqueID + "'";
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

router.get('/delete', function (_req, _res) {
    var Sqlquery = "Delete from dbo.tblSector where SectorUniqueID = '" + _req.query.SectorUniqueID + "'";
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

module.exports = router;