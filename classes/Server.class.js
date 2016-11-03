'use strict';

module.exports = class Server {
  constructor() {
    // save our settings to this
    this.settings = g.settings.Server;

    // add express to this
    this.app = m.express();

    // run the setup method
    this.setup();
  }

  setup() {
    // tell express to use middleware to parse JSON
    this.app.use(m.bodyparser.json());
    // declare a webroot
    this.app.use(
      m.express.static(
        m.path.join(g.settings.appRoot, this.settings.webroot)
      )
    );

    // compress all files using gzip
    this.app.use(m.compression());

    // parse all request cookies
    this.app.use(m.cookieparser());

    // parse all urlencoded request body data
    // for example from "standard" HTML forms
    this.app.use(m.bodyparser.urlencoded({extended: false}));

    // listen on port 3000
    var me = this;

//==============================================================================
//==============================================================================

this.app.post('/nodeTest', function (req, res) {
    //
    var param1 = req.body.param1;
    var param2 = req.body.param2;
    //
    res.end("Server: Param1 = " + param1 + ", Param2 = " + param2);
    });
    
 //=============================================================================
 
 var mysql      = require('mysql');
 var connectionMySql;
 
this.app.post('/connectMySql', function (req, res) {
    //
    var ip = req.body.ip;
    var user  = req.body.user;
    var pass = req.body.pass;
    var db = req.body.database;
    //
    connectMySql(ip,user,pass,db,res);
    //
});

this.app.post('/executeSelect', function (req, res) {
    //
    var query = req.body.query;
    //
    executeSelect(connectionMySql,query,res);
});
    
 
connectMySql("localhost","root","","asasblogg",null);


function connectMySql(ip,user,pass,dbname,response){
    console.log("Connecting to DB");
    //
      connectionMySql =  mysql.createConnection({
      host     : ip,
      user     : user,
      password : pass,
      database : dbname
    });
    //
    connectionMySql.connect(function(err){
        if(!err) {
            console.log("Database is connected ...");
            //           
            //
            if(response !== null){
                response.end("Connection to: " + dbname + "   OK");
            }
            //
        } else {
            console.log("Error connecting database ... nn" + err);
             if(response !== null){
                 response.end("Connection to: " + dbname + "   Failed: " + err);
             }
        }
    });
}

/**
 * 
 */
function executeSelect(connection,query,response){
    //
    console.log("Processing query:" + query);
    //
    connection.query(query, function(err, rows, fields) {
    //
    //    connection.end();
    //
    if (!err)
        //
        console.log("Query successful: " + query);
        //
       if(response !== null){
            response.json(rows);
        }
        //
    else
        //
        console.log('Error while performing Query:' + query);
        //
       if(response !== null){
            response.end('Error while performing Query: ' + query);
        }
        //
  });
    //
}

//==============================================================================
//==============================================================================
    
    this.app.listen(this.settings.port,  function() {
      console.log("Server listening on port "+me.settings.port);
    });
  }
  
  
}
