var express = require('express');
var bodyparser = require('body-parser');
var mongo = require('mongodb');
var fs = require('fs');
//var im = require('imagemagick');
//var sharp = require('sharp');
var mongoClient = mongo.MongoClient;
var app = express();
var db;

app.use(bodyparser.json({limit: '50mb'}));
app.use("/", express.static(__dirname + '/public'));
app.use("/command-center", express.static(__dirname + '/public/command-center'));

mongoClient.connect('mongodb://spaces-app:TimDaveAndSteve@ds145370.mlab.com:45370/spaces', function(err, database){
    if (err) return console.log(err);
    db = database;

    app.listen(process.env.PORT || 3000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
});


app.get('/api/entity/:id', function(req,res){
    var id = mongo.ObjectID(req.params.id);
    db.collection('entity').find( {"_id" : id}).toArray(function(err,result){
        if (err) return console.log(err);

        res.json(result);
    })
});

app.post('/api/entity', function(req,res){
    req.body.active = true;
    req.body.date_created = Date.now();

    db.collection('entity').insert(req.body, function(err, entityResult){
        if (err) return console.log(err);

        res.json(entityResult);
    })
});

//user
app.get('/api/user', function(req,res){
   db.collection('user').find({"active":true}).toArray(function(err, result){
       if (err) return console.log(err);

       res.json(result);
   })
});

app.get('/api/user/:id', function(req,res){
    var id = mongo.ObjectID(req.params.id);
    db.collection('user').find( {"_id" : id}).toArray(function(err,result){
        if (err) return console.log(err);

        res.json(result);
    })
});

app.post('/api/user', function(req,res){
    req.body.active = true;
    req.body.date_created = Date.now();

    db.collection('user').insert(req.body, function(err, entityResult){
        if (err) return console.log(err);

        res.json(entityResult);
    })
});

app.put('/api/user/:id', function(req, res){
    var id = mongo.ObjectID(req.params.id);
    delete req.body._id;

    db.collection('user').findOneAndUpdate({"_id":id}, {$set : req.body}, function(err, result){
        if (err) return console.log(err);

        res.json(result);
    })
});

app.delete('/api/user/:id', function(req, res){
    var id = mongo.ObjectID(req.params.id);

    db.collection('user').findOneAndUpdate({"_id":id}, {$set : {"active":false}}, function(err, result){
        if (err) return console.log(err);

        res.json(result);
    })
});

//location
app.get('/api/location', function(req,res){
    var entity_id = getEntityId();

    db.collection('location').find({"active":true}).toArray(function(err, result){
        if (err) return console.log(err);

        res.json(result);
    })
});

app.get('/api/location/:id', function(req,res){
    var id = mongo.ObjectID(req.params.id);

    db.collection('location').find( {"_id" : id}).toArray(function(err,result){
        if (err) return console.log(err);

        res.json(result);
    })
});

app.post('/api/location', function(req,res){
    req.body.active = true;
    req.body.date_created = Date.now();
    req.body.entity_id = getEntityId();

    db.collection('location').insert(req.body, function(err, entityResult){
        if (err) return console.log(err);

        res.json(entityResult);
    })
});

app.put('/api/location/:id', function(req, res){
    var id = mongo.ObjectID(req.params.id);
    delete req.body._id;

    db.collection('location').findOneAndUpdate({"_id":id}, {$set : req.body}, function(err, result){
        if (err) return console.log(err);

        res.json(result);
    })
});

app.delete('/api/location/:id', function(req, res){
    var id = mongo.ObjectID(req.params.id);

    db.collection('location').findOneAndUpdate({"_id":id}, {$set : {"active":false}}, function(err, result){
        if (err) return console.log(err);

        res.json(result);
    })
});

//spaces
app.get('/api/location/:location_id/spaces', function(req,res){
    var location_id = mongo.ObjectID(req.params.location_id);

    db.collection('spaces').find({"location_id":location_id}).toArray(function(err, result){
        if (err) return console.log(err);

        res.json(result);
    })
});

app.get('/api/spaces/:id', function(req,res){
    var id = mongo.ObjectID(req.params.id);

    db.collection('spaces').find( {"_id" : id}).toArray(function(err,result){
        if (err) return console.log(err);

        res.json(result);
    })
});

app.post('/api/location/:location_id/spaces', function(req,res){
    req.body.active = true;
    req.body.date_created = Date.now();
    req.body.location_id = req.params.location_id;

    db.collection('spaces').insert(req.body, function(err, entityResult){
        if (err) return console.log(err);

        res.json(entityResult);
    })
});

app.put('/api/spaces/:id', function(req, res){
    var id = mongo.ObjectID(req.params.id);
    delete req.body._id;

    db.collection('spaces').findOneAndUpdate({"_id":id}, {$set : req.body}, function(err, result){
        if (err) return console.log(err);

        res.json(result);
    })
});

app.delete('/api/spaces/:id', function(req, res){
    var id = mongo.ObjectID(req.params.id);

    db.collection('spaces').findOneAndUpdate({"_id":id}, {$set : {"active":false}}, function(err, result){
        if (err) return console.log(err);

        res.json(result);
    })
});

//event
app.get('/api/event', function(req,res){
    var entity_id = req.params.entity_id;

    db.collection('event').find({"entity_id":entity_id}).toArray(function(err, result){
        if (err) return console.log(err);

        res.json(result);
    })
});

app.get('/api/event/:id', function(req,res){
    var id = mongo.ObjectID(req.params.id);

    db.collection('event').find( {"_id" : id}).toArray(function(err,result){
        if (err) return console.log(err);

        res.json(result);
    })
});

app.post('/api/event', function(req,res){
    req.body.active = true;
    req.body.date_created = Date.now();
    //req.body.entity_id = req.params.entity_id;

    db.collection('event').insert(req.body, function(err, entityResult){
        if (err) return console.log(err);

        res.json(entityResult);
    })
});

app.put('/api/event/:id', function(req, res){
    var id = mongo.ObjectID(req.params.id);
    delete req.body._id;

    db.collection('event').findOneAndUpdate({"_id":id}, {$set : req.body}, function(err, result){
        if (err) return console.log(err);

        res.json(result);
    })
});

app.delete('/api/event/:id', function(req, res){
    var id = mongo.ObjectID(req.params.id);

    db.collection('event').findOneAndUpdate({"_id":id}, {$set : {"active":false}}, function(err, result){
        if (err) return console.log(err);

        res.json(result);
    })
});

var getEntityId = function(){
    return '58dbe71a278b2216b1c1abe4';
};