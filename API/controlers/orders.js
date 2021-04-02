//#region

const { state } = require('@angular/animations');
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});
//#endregion

const getPaneedOrders = (req, res) => {
    let sql = "select * from orders where state = 0";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    });
}
const DeleteOrder = (req, res) => {
    let OrderID = req.body['OrderID'];
    let sql = "delete from orders where OrderID = ?";
    con.query(sql,[OrderID], function (err, result, fields) {
        if (err) throw err;
        let sql = "select * from orders where state = 0";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.status(200).json(result);
        });
    });
}
const changeState = (req, res) => {
    let OrderID = req.body['OrderID'];
    let sql = "select state from orders where OrderID = ?";
    con.query(sql,[OrderID], function (err, result, fields) {
        if (err) throw err;
        let resultt = result[0]['state'];
        resultt = !resultt;
        let sql = "Update orders set state = ? where OrderID = ?";
        con.query(sql,[resultt,OrderID], function (err, result, fields) {
            if (err) throw err;
            let sql = "select * from orders where state = 0";
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                res.status(200).json(result);
            });
        });
    });

}



module.exports = {
    getPaneedOrders,
    DeleteOrder,
    changeState,
    


}
