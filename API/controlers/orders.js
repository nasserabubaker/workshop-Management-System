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
    let typee = req.body['type'];
    let sql = "select state from orders where OrderID = ?";
    con.query(sql,[OrderID], function (err, result, fields) {
        if (err) throw err;
        let resultt = result[0]['state'];
        resultt = !resultt;
        let sql = "Update orders set state = ? where OrderID = ?";
        con.query(sql,[resultt,OrderID], function (err, result, fields) {
            if (err) throw err;
            let sql = "";
            if (typee == 0) {
                 sql = "select * from orders where state = 0";

            }
            else {
                 sql = "select * from orders ";

            }
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                res.status(200).json(result);
            });
        });
    });

}
const getPannedOrderDate = (req, res) => {
    let OrderID = req.params.OrderID;
    let sql = "select * from orderdata where OrderID = ?";
    con.query(sql,[OrderID], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    });
}
const updateQuantity = (req, res) => {
    let OrderID = req.body.OrderID;
    let ItemID = req.body.ItemID;
    let Quantity = req.body.Quantity;
    let defrence = req.body.defrence;
    let sql = "update orderdata set Quantity = ? where OrderID = ? and ItemID = ? ";
    con.query(sql,[Quantity,OrderID,ItemID], function (err, result, fields) {
        if (err) throw err;
        let sql = "select Amount from orders where OrderID = ?";
        con.query(sql,[OrderID], function (err, result, fields) {
            if (err) throw err;
            let amount = result[0]['Amount'];
            amount += defrence;
            let sql = "update orders set Amount = ? where OrderID = ?";
            con.query(sql,[amount,OrderID], function (err, result, fields) {
                if (err) throw err;
                res.status(200).json("added");
            });
           
        });
    }); 
}

const getAllOrders = (req, res) => {
    let sql = "select * from orders";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    });
}

const checkCart = (req, res) => {
    let UserID = req.body.UserID;
    let ItemID = req.body.ItemID;
    let sql = "select * from cart where UserID = ? and ItemID = ?";
    con.query(sql,[UserID,ItemID], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    });
}
const addToCart = (req, res) => {
    let UserID = req.body.UserID;
    let ItemID = req.body.ItemID;
    let Quantity = req.body.Quantity;
    let Descr = req.body.Descr;
    let sql = "insert into cart(UserID,ItemID,Quantity,Descr)values(?,?,?,?)";
    con.query(sql,[UserID,ItemID,Quantity,Descr], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    });
}

const getCartData = (req, res) => {
    let UserID = req.params.UserID;
    let sql = "select * from cart where UserID = ?";
    con.query(sql, [UserID], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
  
    })
}
const newOrder = (req, res) => {
    let UserID = req.body.UserID;
    let Descr = req.body.Descr;
    let Date = req.body.Date;
    let Amount = req.body.Amount;
    let sql = "insert into orders(UserID,Descr,Date,Amount)values(?,?,?,?) ";
    con.query(sql, [UserID,Descr,Date,Amount], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
  
    })
}
const newOrderData = (req, res) => {
    let OrderID = req.body.OrderID;
    let ItemID = req.body.ItemID;
    let Quantity = req.body.Quantity;
    let Descr = req.body.Descr;
    let sql = "insert into orderdata(OrderID,ItemID,Quantity,Descr)values(?,?,?,?) ";
    con.query(sql, [OrderID,ItemID,Quantity,Descr], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
  
    })
}

const emptyCart = (req, res) => {
    let UserID = req.body.UserID;

    let sql = "delete from cart where UserID =?";
    con.query(sql, [UserID], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
  
    })
}
const UpdateCart = (req, res) => {
    let UserID = req.body.UserID;
    let ItemID = req.body.ItemID;
    let Quantity = req.body.Quantity;
    let Descr = req.body.Descr;

    let sql = "update cart set  Quantity = ? where UserID = ? and  ItemID = ? ";
    con.query(sql, [Quantity,UserID,ItemID], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    })
}
const UpdateCartDelete = (req, res) => {
    let UserID = req.body.UserID;
    let ItemID = req.body.ItemID;

    let sql = "delete from cart where UserID = ? and  ItemID = ?";
    con.query(sql, [UserID,ItemID], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    })
}
const getUserOrders = (req, res) => {
    let UserID = req.params.UserID;
    let sql = "select * from orders where UserID = ? ";
    con.query(sql, [UserID], function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    })
}




module.exports = {
    getPaneedOrders,
    DeleteOrder,
    changeState,
    getPannedOrderDate,
    updateQuantity,
    getAllOrders,
    checkCart,
    addToCart,
    getCartData,
    newOrder,
    newOrderData,
    emptyCart,
    UpdateCart,
    UpdateCartDelete,
    getUserOrders

}
