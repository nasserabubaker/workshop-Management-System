//#region

const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});
const crypto = require('crypto');
function sha1(data) {return crypto.createHash("sha1").update(data, "binary").digest("hex");}
//#endregion

const login = (req, res) => {
    let username = req.body['user'];
    let password = sha1(req.body['pass']);
    let sql = "SELECT * FROM users where Username = ? and password = ?";
    con.query(sql, [username, password], function (err, result, fields) {
        if (result != undefined && result.length != 0) {
            res.cookie('name', username).json(username); //Sets cookies
        }
        else {
            res.json(null);
        }
    });
    //console.log("login done");
}

module.exports = {
    login,

}
