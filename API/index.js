//#region constants
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-Parser');
const crypto = require('crypto');
const cors = require('cors');
const secret = "123esfdfsdfasdasd";
const session = require('express-session')
const mysql = require('mysql');
const port = 3000;
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});
const app = express();

//#endregion constans

//#region  app.use
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(bodyParser.urlencoded())

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: null,
        secure: true,
        sameSite: 'none'
    }
}));
  

app.use(cookieParser());
//#endregion app.use

//#region app.requre difined by me
const auth = require('./controlers/auth')
const categores = require('./controlers/categores')
const members = require('./controlers/member')
const items = require('./controlers/items')
const orders = require('./controlers/orders')
//#endregion app.requre difined by me


//#region functions
// sha1 crypto function
//get data and return the sha1 of the data
function sha1(data) {return crypto.createHash("sha1").update(data, "binary").digest("hex");}

//check the object is empty or not
function isEmpty(obj) {
return Object.keys(obj).length; //returns 0 if empty or an integer > 0 if non-empty
}

//#endregion functions

app.listen(port, () => {
    console.log("http sever running on local host "+port)
});

//#region Auth /api/auth
app.post('/api/auth/login', (req, res) => {
    auth.login(req, res);
})

app.get('/api/auth/isLogin', (req, res) => {
   // console.log("check login done");
     res.json(req.cookies['name'])
});
app.get('/api/auth/logout', function (req, res) {
    res.clearCookie('name');
    res.json('cookie username cleared');
   // console.log("check user state done");
});
app.get('/api/auth/userstate', function (req, res) {
    let username = req.cookies['name'];
    let sql = "select GroubID from users where Username = ?";
   con.query(sql, [username], function (err, result, fields) {
        if (result==undefined || isEmpty(result)==0) {
            res.json("noneuser");
        }
        else {
           if((result && result[0]['GroubID'])== 1){
            res.json("admin");
            }
           else {
               res.json("user");

           }    
        }

    });

});
//#endregion




//#region categories /api/categores

app.get('/api/categores', function (req, res) {
    categores.getallCategories(req, res);
});


app.route('/api/categorie/editvisible')
  .put(function (req, res) {
      categores.editVisible(req, res);
  })


app.route('/api/categorie/delete')
    .post(function (req, res) {
        categores.deleteCat(req, res);
    });


app.route('/api/categorie/Update')
    .put(function (req, res) {
        categores.Update(req,res);
    });


app.route('/api/categorie/add')
    .post(function (req, res) {
        categores.add(req, res);
    });
    app.route('/api/categorie/getAllCategoriesForShow')
    .get(function (req, res) {
        categores.getAllCategoriesForShow(req, res);
    });
    

//#endregion



//#region Members /api/members
app.route('/api/members/getmembers')
.get(function (req, res) {
    members.getmembers(req, res);
});

app.route('/api/members/getUserID:username')
.get(function (req, res) {
    members.getUserID(req, res);
});

app.route('/api/members/deleteMember')
    .put(function (req, res) {
        members.deleteMember(req, res);
    });


app.route('/api/members/update')
    .put(function (req, res) {
        members.update(req, res);
    });


app.route('/api/members/checkusername:username')
    .get(function (req, res) {
        members.checkusername(req, res);
});    



app.route('/api/members/newuser')
    .post(function (req, res) {
        members.newuser(req, res);
    });

//#endregion




//#region items /api/items
    app.route('/api/items/getitems')
        .get(function (req, res) {
            items.getitems(req, res);
        });
        app.route('/api/items/getItemsForShow:id')
        .get(function (req, res) {
            items.getItemsForShow(req, res);
        });
        


    app.route('/api/items/additem')
    .post(function (req, res) {
        items.additem(req, res);
    });

    
    app.route('/api/items/update')
    .put(function (req, res) {
        items.update(req, res);
    });


    app.route('/api/items/editvisible')
    .put(function (req, res) {
        items.editvisible(req, res);
    })
 
    
    app.route('/api/items/delete')
    .post(function (req, res) {
        items.deleteitem(req, res);

    });

    app.get('/api/items:id', function (req, res) {
        items.getitem(req, res);
    });
    
//#endregion


//#region orders /api/orders

    app.get('/api/orders/getpannedorders', function (req, res) {
        orders.getPaneedOrders(req, res);
    });
    app.put('/api/orders/deleteOrder', function (req, res) {
        orders.DeleteOrder(req, res);
    });

    app.post('/api/orders/changeState', function (req, res) {
        orders.changeState(req, res);
    });
    app.get('/api/Orders/getPannedOrderData:OrderID', function (req, res){
    orders.getPannedOrderDate(req, res);
    })
    app.put('/api/Orders/updateQuantity', function (req, res){
        orders.updateQuantity(req, res);
    })
    app.get('/api/Orders/getAllOrders', function (req, res){
        orders.getAllOrders(req, res);
    })
    app.post('/api/Orders/checkCart', function (req, res){
        orders.checkCart(req, res);
    })
    app.post('/api/Orders/addToCart', function (req, res){
        orders.addToCart(req, res);
    })
    app.get('/api/Orders/getCartData:UserID', function (req, res){
        orders.getCartData(req, res);

    })
    app.post('/api/Orders/newOrder', function (req, res){
        orders.newOrder(req, res);
    })
    app.post('/api/Orders/newOrderData', function (req, res){
        orders.newOrderData(req, res);
    })
    app.put('/api/Orders/emptyCart', function (req, res){
        orders.emptyCart(req, res);
    })
    app.put('/api/Orders/UpdateCart', function (req, res){
        orders.UpdateCart(req, res);
    })
    app.put('/api/Orders/UpdateCartDelete', function (req, res){
        orders.UpdateCartDelete(req, res);
    })
    
app.get('/api/Orders/getUserOrders:UserID', function (req, res) {
        orders.getUserOrders(req, res);
    })
    
    
    
    
    
    

//#endregion







      



















 