var express = require('express');
var router = express.Router();
var db = require('./dbOperations');

//GET Action API  
router.get('/get', function (_req, _res) {
    var Sqlquery = 'select * from [dbo].[tblAction]';
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

router.get('/add', function (_req, _res) {
    let params = {
        'ActionTitle': _req.query.ActionTitle,
        'ActionPurpose': _req.query.ActionPurpose,
        'ActionSector': _req.query.ActionSector,
        'ActionOwner': _req.query.ActionOwner,
        'ActionWebsite' : _req.query.ActionWebsite,
        'CreatedBy': _req.query.CreatedBy,
        'CreatedDate': _req.query.CreatedDate,
        'persons': _req.query.Persons,
        'Location': _req.query.Location
    }
    db.insertStoredProcedureToExecute(_res, 'InsertActionData', params);
});

router.get('/edit', function (_req, _res) {
    let params = {
        'ActionUniqueID': _req.query.ActionUniqueID,
        'ActionTitle': _req.query.ActionTitle,
        'ActionPurpose': _req.query.ActionPurpose,
        'ActionSector': _req.query.ActionSector,
        'ActionOwner': _req.query.ActionOwner,
        'ActionWebsite' : _req.query.ActionWebsite,
        'ModifiedBy': _req.query.ModifiedBy,
        'ModifiedDate': _req.query.ModifiedDate,
        'persons': _req.query.Persons,
        'Location': _req.query.Location
    }
    db.editStoredProcedureToExecute(_res, 'EditActionData', params);
});

router.get('/delete', function (_req, _res) {
    let params = {
        'ActionUniqueID': _req.query.ActionUniqueID,
    }
    db.deleteStoredProcedureToExecute(_res, 'DeleteActionData', params);
});

module.exports = router;