//#region

const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});
//#endregion
const getitems = (req, res) => {
    let sql = "select * from items";  
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        
        res.status(200).json(result);
    });
}
const getItemsForShow = (req, res) => {
    let id = req.params.id;

    let sql = "select * from items where categorie_id = ? and visible = 1";  
    con.query(sql,[id], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    });
}


const additem = (req, res) => {
    let Name = req.body['Name'];
    let categorie_id = req.body['categorie_id'];
    let Pic = req.body['Pic'];
    let Price = req.body['Price'];
    let State = req.body['State'];
    let NumberOfItems = req.body['NumberOfItems'];
    let descr = req.body['descr'];
    let color_count = req.body['color_count'];
    let colors = req.body['colors'];
let sql = "insert into items (Name,categorie_id,Pic,Price,State,NumberOfItems,descr,color_count,colors) values(?,?,?,?,?,?,?,?,?)";
con.query(sql,[Name,categorie_id,Pic,Price,State,NumberOfItems,descr,color_count,colors], function (err, result, fields) {
    if (err) throw err;
    let sql = "select * from items";
con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.status(200).json(result);
});
});  
}

const update = (req, res) => {
    let id = req.body['ID'];
    let name = req.body['Name'];
    let cat_id = req.body['categorie_id'];
    let pic = req.body['Pic'];
    let Price = req.body['Price'];
    let State = req.body['State'];
    let NumberOfItems = req.body['NumberOfItems'];
    let descr = req.body['descr'];
    let color_count = req.body['color_count'];
    let colors = req.body['colors'];

let sql = "update items set   Name = ? , categorie_id= ? , Pic = ?, Price = ?,State = ? , NumberOfItems = ? ,descr = ? ,color_count = ?,colors = ?  where ID = ?     ";
con.query(sql,[name,cat_id,pic,Price,State,NumberOfItems,descr,color_count,colors,id], function (err, result, fields) {
    if (err) throw err;
    res.status(200).json("Update Done");
});
}
const editvisible = (req, res) => {
    let id = req.body['id'];
    let sql = "select visible from items where ID = ?";
    con.query(sql,[id], function (err, result, fields) {
        let state = result[0]['visible'];
        if (state == 0) state = 1;
        else state = 0;
        let sql = "update items set visible = ? where ID = ?";
        con.query(sql, [state, id], function (err, result, fields) {
          let sql = "select * from items where ID = ?";
          con.query(sql, [ id], function (err, result, fields) {
              res.json(result);
          });
     });
   });

}

const deleteitem = (req, res) => {
    let id = req.body['id'];
    let sql = "delete from items where ID = ?"
        con.query(sql, [id], function (err, result, fields) {
          if (err) throw err;
  });
}
const getitem = (req, res) => {
    let id = req.params.id;
    let sql = "select * from items where categorie_id = ?";
    con.query(sql,[id], function (err, result, fields) {
        res.json(result);
   });
}


module.exports = {
    getitems,
    additem,
    update,
    editvisible,
    deleteitem,
    getitem,
    getItemsForShow



}
