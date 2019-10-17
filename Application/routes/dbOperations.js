'use strict';
const _sqlPackage = require('mssql');

const dbConfig = {
    user: "atts",
    password: "server@123",
    server: "attsserver.database.windows.net",
    port: 1433,
    database: "testdb",
    //database: "wiwowDB-prod",
    options: {
        "encrypt": true,
    }
};

var conn = new _sqlPackage.ConnectionPool(dbConfig);

var QueryToExecuteInDatabase = function(response, strQuery) {

    _sqlPackage.close();
    _sqlPackage.connect(dbConfig, function(error) {
        if (error) {
            console.log("Error while connecting to database :- " + error);
            response.send(error);
        } else {
            var request = new _sqlPackage.Request();
            request.query(strQuery, function(error, responseResult) {
                if (error) {
                    console.log("Error while connecting to database:- " + error);
                    response.send(error);
                } else {
                    if (responseResult.recordset) {
                        response.send(responseResult.recordset);
                    } else {
                        response.send("no data");
                    }
                }
            });
        }
    });
}

module.exports = { QueryToExecuteInDatabase };