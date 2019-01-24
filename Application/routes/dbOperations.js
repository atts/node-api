'use strict';
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

var conn = new _sqlPackage.ConnectionPool(dbConfig);

var QueryToExecuteInDatabase = function (response, strQuery) {
    
    _sqlPackage.close(); 
    _sqlPackage.connect(dbConfig, function (error) {
        if (error) {
            console.log("Error while connecting to database :- " + error);
            response.send(error);
        }
        else {  
            var request = new _sqlPackage.Request(); 
            request.query(strQuery, function (error, responseResult) {
                if (error) {
                    console.log("Error while connecting to database:- " + error);
                    response.send(error);
                }
                else {
                    if (responseResult.recordset) {
                        response.send(responseResult.recordset);
                    }
                    else {
                        response.send("no data");
                    }
                }
            });
        }
    });
}

var insertStoredProcedureToExecute = function (response, sp_Name, params_Values) {
    _sqlPackage.close();
    conn.connect().then(function (conn) {
        var request = new _sqlPackage.Request(conn);
        for (var obj in params_Values) {
            var val = params_Values[obj];
            var key = obj
            request.input(key, _sqlPackage.VarChar(255), val);
        }
        request.execute(sp_Name).then(function (err, recordsets, returnValue, affected) {
            console.log("Your details added successfully");
            conn.close();
            response.send("Your details added successfully");
        }).catch(function (err) {
            console.log(err);
            conn.close();
            response.send("The details could not be added. Please try again!");
        });
    });
}

var editStoredProcedureToExecute = function (response, sp_Name, params_Values) {
    _sqlPackage.close();
    conn.connect().then(function (conn) {
        var request = new _sqlPackage.Request(conn);
        for (var obj in params_Values) {
            var val = params_Values[obj];
            var key = obj
            request.input(key, _sqlPackage.VarChar(255), val);
        }
        request.execute(sp_Name).then(function (err, recordsets, returnValue, affected) {
            console.log("Your details were updated successfully");
            conn.close();
            response.send("Your details were updated successfully");
        }).catch(function (err) {
            console.log("The details could not be updated. Please try again!");
            conn.close();
             response.send("The details could not be updated. Please try again!");
        });
    });
}

var deleteStoredProcedureToExecute = function (response, sp_Name, params_Values) {
    _sqlPackage.close();
    conn.connect().then(function (conn) {
        var request = new _sqlPackage.Request(conn);
        for (var obj in params_Values) {
            var val = params_Values[obj];
            var key = obj
            request.input(key, _sqlPackage.VarChar(255), val);
        }
        request.execute(sp_Name).then(function (err, recordsets, returnValue, affected) {
            console.log("record was deleted successfully");
            conn.close();
            respone.send("record was deleted successfully");
        }).catch(function (err) {
            console.log("record could not be deleted. Please try again!");
            conn.close();
            response.send("record could not be deleted. Please try again!");
        });
    });
}

var checkStoredProcedureToExecute = function (response, sp_Name, params_Values, output_paramter) {
    conn.close();
    conn.connect().then(function (conn) {
        var request = new _sqlPackage.Request(conn);
        for (var obj in params_Values) {
            var val = params_Values[obj];
            var key = obj
            request.input(key, _sqlPackage.VarChar(255), val);
        }
        request.output(output_paramter, _sqlPackage.Int);
        request.execute(sp_Name, function (err, recordsets, returnValue, affected) {
            var _output = JSON.stringify(recordsets.output);
            var obj = JSON.parse(_output);
            var result = obj[output_paramter];
            if (result) {
                conn.close();
                response.send(true);
            }
            else {
                conn.close();
                response.send(false);
            }

        });
    });
};

module.exports = {QueryToExecuteInDatabase,insertStoredProcedureToExecute,editStoredProcedureToExecute,deleteStoredProcedureToExecute,checkStoredProcedureToExecute};