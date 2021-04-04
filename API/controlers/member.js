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
const getmembers = (req, res) => {
    let sql = "select * from users";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    });    
}

const deleteMember = (req, res) => {
    let id = req.body['id'];
    let sql = "delete from users where UserId = ?";
    con.query(sql,[id], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json("delete Done");
    });
}
const update = (req, res) => {
    let id = req.body['UserId'];
    let name = req.body['Username'];
    let pass = req.body['password'];
    let fullname = req.body['FullName'];
    let state = req.body['GroubID'];
    let address = req.body['Address'];
    let phone = req.body['phone'];
    if (pass.length != 40) {
        pass = sha1(pass);
    }   
let sql = "update users set  Username = ? , password = ? , FullName= ? , GroubID = ?, Address = ?,phone = ? where UserId = ?     ";
con.query(sql,[name,pass,fullname,state,address,phone,id], function (err, result, fields) {
    if (err) throw err;
    res.status(200).json("Update Done");
});
}
const checkusername = (req, res) => {
    let username = req.params['username'];
    let sql = "select * from users where Username = ?";
    con.query(sql,[username], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    });
}
const newuser = (req, res) => {
    let name = req.body['Username'];
    let pass = req.body['password'];
    let fullname = req.body['FullName'];
    let state = req.body['GroubID'];
    let address = req.body['Address'];
    let phone = req.body['phone'];
    pass = sha1(pass);
    let sql = "insert into users(Username,password,FullName,GroubID,Address,phone)values(?,?,?,?,?,?)";
    con.query(sql,[name,pass,fullname,state,address,phone], function (err, result, fields) {
        if (err) throw err;
        let sql = "select * from users";
    
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            
            res.status(200).json(result);
        });
 });   
}
const getUserID = (req, res) => {
    let username = req.params['username'];
    let sql = "select UserId from users where Username = ?";
    con.query(sql,[username], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result[0]['UserId']);
    });
}



module.exports = {
    getmembers,
    deleteMember,
    update,
    checkusername,
    newuser,
    getUserID
}
