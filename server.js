
'use strict';

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('cl', ['cl']); // letar fram databas vi vill ta data ifrån
var bodyParser = require('body-parser');
var router = express.Router();
app.use(express.static(__dirname + "/public"));// hämtar statiska filer..html,css,img
app.use(bodyParser.json());



app.get('/contactlist', function(req,res){
	db.cl.find(function(err,docs){
		res.json(docs);
		});// hämtar data från db.cl
	
		});
	
	app.get('/gugge', function(req,res){
	db.cl.find({'name':'gugge'},function(err,docs){
		//res.redirect('directive/q.html');
		
		res.send(docs);
		});// hämtar data från db.cl med namn gugge
	
		});
		
	app.get('/sebbe', function(req,res){
	db.cl.find({'name':'sebbe'},function(err,docs){
			
		res.send(docs);
		
		
		});// hämtar data från db.cl med namn sebbe
	
		});
		
	app.get('/bebbe', function(req,res){
	db.cl.find({'name':'bebbe'},function(err,docs){
		
		
		res.send(docs);
		});// hämtar data från db.cl med namn bebbe
	
		});
	
	
	
	
app.post('/contactlist',function(req,res){ // skickar ny data och inserts ny data in i databasen
	
	db.cl.insert(req.body, function(err,doc){
		res.json(doc);
		
		
		}
	
		); // end insert function
		
		
	}); //end app.post

app.delete("/contactlist/:id",function(req,res){ // radera från db med hjälp av object id
	var id = req.params.id;
	
	db.cl.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
		}); 
	});
	
	
app.get('/contactlist/:id',function(req,res){ // hämtar bloggen till formulär för editering
	var id = req.params.id;
	
	db.cl.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
		});
	});
	
app.put('/contactlist/:id', function(req,res){
	var id = req.params.id;
	
	db.cl.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, 
						email: req.body.email, 
						title: req.body.title, 
						blogg: req.body.blogg}},
		new: true}, function(err, doc){
			res.json(doc);
			});
	});
	
	
app.listen(7000);
