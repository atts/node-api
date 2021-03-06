'use strict';
const _sqlPackage = require('mssql');

const dbConfig = {
    user: "<<user name>>",
    password: "<<password>>",
    server: "<<server name>>",
    port: 1433,
    database: "<<db name>>",
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