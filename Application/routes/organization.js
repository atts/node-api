var express = require('express');
var router = express.Router();
var db = require('./dbOperations');

//GET Organization API  
router.get('/get', function (_req, _res) {
    var Sqlquery = 'select * from [dbo].[tblOrganization]';
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

router.get('/add', function (_req, _res) {
    let params = {
        'OrganizationName': _req.query.OrganizationName,
        'OrganizationMission': _req.query.OrganizationMission,
        'OrganizationEmail': _req.query.OrganizationEmail,
        'OrganizationWebsite': _req.query.OrganizationWebsite,
        'OrganizationPhone': _req.query.OrganizationPhone,
        'OrganizationOwner': _req.query.OrganizationOwner,
        'CreatedBy': _req.query.CreatedBy,
        'CreatedDate': _req.query.CreatedDate,
        'persons': _req.query.Persons,
        'Location': _req.query.Location
    } 
    db.insertStoredProcedureToExecute(_res, 'InsertOrganizationData', params);
});

router.get('/edit', function (_req, _res) {
    let params = {
        'OrganizationUniqueID': _req.query.OrganizationUniqueID,
        'OrganizationName': _req.query.OrganizationName,
        'OrganizationMission': _req.query.OrganizationMission,
        'OrganizationEmail': _req.query.OrganizationEmail,
        'OrganizationWebsite': _req.query.OrganizationWebsite,
        'OrganizationPhone': _req.query.OrganizationPhone,
        'OrganizationOwner': _req.query.OrganizationOwner,
        'ModifiedBy': _req.query.ModifiedBy,
        'ModifiedDate': _req.query.ModifiedDate,
        'persons': _req.query.Persons,
        'Location': _req.query.Location
    }
    db.editStoredProcedureToExecute(_res, 'EditOrganizationData', params);
});

router.get('/delete', function (_req, _res) {
    let params = {
        'OrganizationUniqueID': _req.query.OrganizationUniqueID,
    }
    db.deleteStoredProcedureToExecute(_res, 'DeleteOrganizationData', params);
});

module.exports = router;