var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "easylearning.guru",
  user: "kcc_student",
  password: "Kccitm.edu.in1",
  database: "kccStudent"
});


router.get('/', function(req, res, next) {
    con.connect(function(err) {
        if (err) console.log("err");
        console.log("Connected to mySQL server!");
      });
    res.render('index')
});

router.post('/about', function(req, res, next) {
    console.log(req.body)
    var sql = "INSERT INTO `himani` (`LastName`, `FirstName`,`Address`) \
    VALUES ('"+req.body.name+"', '"+req.body.country+"','"+req.body.age+"');"
   con.connect()
      con.query(sql, function (err, result) {
        //if (err) throw err;
        console.log(result);
        res.json({"Name":req.body})
      });
});

router.get('/read', function (req, res) {
  con.connect(function(err) {
    // if (err) throw err;
    con.query("SELECT * FROM himani", function (err, result, fields) {
      // if (err) throw err;
      console.log(result);
      res.json({"Name":result})
    });
  });
});
router.get('/delete', function (req, res) {
  res.render('delete')
});
  router.post('/del', function (req, res) {
  con.connect(function(err) {
    // if (err) throw err;
    var id = req.body.id;
    var sql = 'DELETE FROM himani WHERE id = ?';
    con.query(sql,[id], function (err, result) {
      // if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      res.redirect('/read')
    });
  });
});

// router.get('/update', function (req, res) {
//   res.render('update')
// });
// router.post('/edit', function(req, res, next){
//   con.connect(function(err) {
//     var id = req.body.id;
//     var name = req.body.name;  
//     var country = req.body.country;
//     var age = req.body.age;
//     var sql = `
//     UPDATE table_name 
//     SET name = ?, 
//     country = ?, 
//     age = ?, 
//     WHERE id = ?"
//     `;
  
//     con.query(sql,[id],[name],[country],[age], function(error, data){
  
//       if(error)
//       {
//         throw error;
//       }
//       else
//       {
//         console.log("Number of records updated: ");
//         response.redirect('/read');
//       }
  
//     });
  
//   });
// });


module.exports = router;  