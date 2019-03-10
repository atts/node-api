var express = require('express');
var router = express.Router();
var db = require('./dbOperations');

//GET PERSON API  
router.get('/get', function (_req, _res) {
    var Sqlquery = "select * from [dbo].[tblPerson]";
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

router.get('/add', function (_req, _res) {
    let params = {
        'PersonLastName': _req.query.PersonLastName,
        'PersonFirstName': _req.query.PersonFirstName,
        'PersonContactInfo': _req.query.PersonContactInfo,
        'PersonLinkedIn': _req.query.PersonLinkedInURL,
        'CreatedBy': _req.query.CreatedBy,
        'CreatedDate': _req.query.CreatedDate,
        'actions': _req.query.Actions,
        'organizations': _req.query.Organizations,
        'Location': _req.query.Location
    }
    db.insertStoredProcedureToExecute(_res, 'InsertPersonData', params);
});

router.get('/edit', function (_req, _res) {
    let params = {
        'PersonUniqueID': _req.query.PersonUniqueID,
        'PersonLastName': _req.query.PersonLastName,
        'PersonFirstName': _req.query.PersonFirstName,
        'PersonContactInfo': _req.query.PersonContactInfo,
        'PersonLinkedIn': _req.query.PersonLinkedInURL,
        'ModifiedBy': _req.query.ModifiedBy,
        'ModifiedDate': _req.query.ModifiedDate,
        'actions': _req.query.Actions,
        'organizations': _req.query.Organizations,
        'Location': _req.query.Location
    }
    db.editStoredProcedureToExecute(_res, 'EditPersonData', params);
});

router.get('/delete', function (_req, _res) {
    let params = {
        'PersonUniqueID': _req.query.PersonUniqueID,
    }
    db.deleteStoredProcedureToExecute(_res, 'DeletePersonData', params);
});

module.exports = router;