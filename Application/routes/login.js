'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const Linkedin = require('node-linkedin')('789seuq6gqlxgt', '2UggsHJrhTGPBlQc');
var db = require('./dbOperations');

const _sqlPackage = require('mssql');

const dbConfig = {
    user: "wiwowserveradmin@wiwowserver",
    password: "Wiwow$20",
    server: "wiwowserver.database.windows.net",
    port: 1433,
    database: "wiwowDB-prod",
    options: {
        "encrypt": true,
    }
};

const scope = ['r_basicprofile', 'r_emailaddress'];
var origin = "";

router.get('/', function (req, res) {
    origin = req.headers.referer;
    Linkedin.auth.authorize(res, scope);
});

Linkedin.auth.setCallback('http://api-prod.azurewebsites.net/login/oauth/linkedin/callback');

router.get('/oauth/linkedin/callback', function (req, res) {
    var userData;
    var promise = new Promise(function (resolve, reject) {
        Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function (err, results) {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                var my_access_token = results.access_token;
                var linkedin = Linkedin.init(my_access_token);
                linkedin.people.me(function (err, $in) {
                    resolve($in);
                });
                // linkedin.connections.retrieve(function (err, connections) {
                //     console.log(connections);
                // });
            }
        })
    });
    promise.then(function (value) {
        res.redirect(origin + "?&UserName=" + value.formattedName + "&UserEmail=" + value.emailAddress + "&UserImageUrl=" + encodeURIComponent(value.pictureUrl) + "&Location=" + value.location.name + "&Connections=" + value.numConnections + "&LinkedInProfile=" + encodeURIComponent(value.publicProfileUrl));
    });
});

router.get('/user/set', function (_req, _res) {
    var Sqlquery = "Update dbo.tblPerson SET IsVisible='" + _req.query.value + "' where PersonUniqueID='" + _req.query.PersonUniqueID + "'";
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

router.get('/user/claim', function (_req, _res) {
    var Sqlquery = "Update dbo.tblUserLoginDetails SET PeopleID ='" + _req.query.PeopleID + "' where UserEmail='" + _req.query.UserEmail + "'";
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

router.get('/user/claim/update', function (_req, _res) {
    var Sqlquery = "Update dbo.tblPerson SET PersonLinkedIn ='" + _req.query.LinkedInID + "' where PersonContactInfo='" + _req.query.UserEmail + "'";
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

router.get('/user/add', function (_req, _res) {
    let params = {
        'UserName': _req.query.UserName,
        'UserEmail': _req.query.UserEmail,
        'UserImageUrl': _req.query.UserImageUrl,
        'Location': _req.query.Location,
        'LinkedInProfile': _req.query.LinkedInProfile,
        'LinkedInConnections': _req.query.LinkedInConnections,
    };
    db.insertStoredProcedureToExecute(_res, 'InsertUserLoginDetails', params);
});

router.get('/user/register', function (_req, _res) {
    var pwd = _req.query.Password;
    var hash = bcrypt.hashSync(pwd, salt);
    let params = {
        'UserName': _req.query.UserName,
        'UserEmail': _req.query.UserEmail,
        'Password': hash,
    };
    db.insertStoredProcedureToExecute(_res, 'RegisterUserLoginDetails', params);
});

router.get('/user/update', function (_req, _res) {
    var Sqlquery = "Update dbo.tblUserLoginDetails SET UserName='" + _req.query.UserName + "', UserPhone='" + _req.query.UserPhone + "',AboutMe='" + _req.query.AboutMe + "' where UserEmail='" + _req.query.UserEmail + "'";
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

router.get('/user/get', function (_req, _res) {
    var Sqlquery = "Select UserEmail,UserName,UserImage,UserRole,UserPhone,UserPhone,PeopleID,LinkedInProfile,AboutMe,Location,LinkedInConnections,UserImageUrl from dbo.tblUserLoginDetails where UserEmail='" + _req.query.UserEmail + "'";
    db.QueryToExecuteInDatabase(_res, Sqlquery);
});

router.get('/user/check', function (_req, _res) {
    var pwd = _req.query.Password; 
    var Sqlquery = "Select UserEmail,Password from dbo.tblUserLoginDetails where UserEmail='" + _req.query.UserEmail + "'";
    _sqlPackage.close();
    _sqlPackage.connect(dbConfig, function (error) {
        if (error) {
            console.log("Error while connecting to database :- " + error);
            _res.send(error);
        }
        else {
            var request = new _sqlPackage.Request();
            request.query(Sqlquery, function (error, responseResult) {
                if (error) {
                    console.log("Error while connecting to database:- " + error);
                    _res.send(error);
                }
                else {
                    if (responseResult.recordset) {
                        var dbPwd = responseResult.recordset[0].Password;
                        bcrypt.compare(pwd, dbPwd, function (err, res) {
                            if (res) {
                                _res.send("success");
                            }
                            else {
                                _res.send("failed");
                            }
                        });
                        
                    }
                    else {
                        _res.send("no data");
                    }
                }
            });
        }
    });
});

module.exports = router;