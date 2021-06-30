const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/";
const my_db = "db_myFirstMenu";
const saladsCollection = "salads";


function handleUpdate(req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var dbo = db.db(my_db);
    var myquery = { _id: new mongodb.ObjectID(req.params.id) };
    var saladObjToUpdate = req.body;
    var newvalues = { $set: saladObjToUpdate };
    dbo
      .collection(saladsCollection)
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        // --- todo check first if document exist if not send 404 and return.
        console.log(result);
        res.sendStatus(200);
        db.close();
      });
  });
}

function handleDelete(req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var dbo = db.db(my_db);
    var myquery = { _id: new mongodb.ObjectID(req.params.id) };
    dbo.collection(saladsCollection).deleteOne(myquery, function (err, result) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      // --- todo check first if document exist if not send 404 and return.
      

      console.log(result);
      res.sendStatus(200);
      db.close();
    });
  });
}

function handlePost(req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var dbo = db.db(my_db);
    var bookObj = req.body;
    dbo.collection(saladsCollection).insertOne(bookObj, function (err, result) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      console.log(result);
      res.sendStatus(200);
      db.close();
    });
  });
}

function handleGet(req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    let dbo = db.db(my_db);
    dbo
      .collection(saladsCollection)
      .find({})
      .toArray(function (err, salads) {
        if (err) {
          res.sendStatus(500);
          return; 
        }
        res.send(salads);
        db.close();
      });
      
  });
}

module.exports.handleGet = handleGet;
module.exports.handlePost = handlePost;
module.exports.handleDelete = handleDelete;
module.exports.handleUpdate = handleUpdate;
