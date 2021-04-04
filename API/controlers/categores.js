//#region

const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});
//#endregion

const getallCategories = (req, res) => {
    let sql = "select * from categories";
    con.query(sql, function (err, result, fields) {
        res.json(result);
   });
}
const getAllCategoriesForShow = (req, res) => {
    let sql = "select * from categories where visible = 1";
    con.query(sql, function (err, result, fields) {
        res.json(result);
   });
}


const editVisible = (req, res) => {
    let id = req.body['id'];
    let sql = "select visible from categories where ID = ?";
    con.query(sql,[id], function (err, result, fields) {
        let state = result[0]['visible'];
        if (state == 0) state = 1;
        else state = 0;
        let sql = "update categories set visible = ? where ID = ?";
        con.query(sql, [state, id], function (err, result, fields) {
        let sql = "select * from categories where ID = ?";
        con.query(sql, [ id], function (err, result, fields) {
                res.json(result);
            });
        });
    });
}
const deleteCat = (req, res)=>{
    let id = req.body['id'];
    let sql = "delete from categories where ID = ?"
      con.query(sql, [id], function (err, result, fields) {
          if (err) throw err;
      });    
}

const Update = (req, res) => {
    let id = req.body['id'];
    let name = req.body['name'];
    let pic = req.body['pic'];
    let sql = "update  categories set Name = ? , Pic = ? where ID = ?"
    con.query(sql, [name,pic,id], function (err, result, fields) {
        if (err) throw err;
    });
}
const add = (req, res) => {
    let name = req.body['name'];
    let pic = req.body['pic'];
    let sql = "insert into categories (Name,Pic) values(?,?)";
    con.query(sql, [name,pic,], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json("added correctly");
    });
    
}


module.exports = {
    getallCategories,
    editVisible,
    deleteCat,
    Update,
    add,
    getAllCategoriesForShow





}
