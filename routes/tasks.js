/*
* This page creates a RESTful API
*/
//load extenal js
//$.getScript('../secure.js')
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://' + process.env.DBUSERNAME + ':' + process.env.DBPASSWORD + '@' + process.env.DBHOST + ':' + process.env.DBPORT + '/' + process.env.DBNAME, ['tasks']);

/*
* function to get all tasks
*/
router.get('/tasks', function(req, res, next){
  db.tasks.find(function(err, tasks){
    if(err){
      res.send(err);
    }
    res.json(tasks);
  });
});

/*
* function to get all single task
* :id make id a parameter
* req is the way we get requests
*/
router.get('/task/:id', function(req, res, next){
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});

/*
* save task
* :id make id a parameter
*/
router.post('/task', function(req, res, next){
  var task = req.body;
  //we use task.isDone + '' to make it a string
  if(!task.title || !(task.isDone + '')){
    //send a 400 status
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  }else{
    db.tasks.save(task, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
    });
  }
});

/*
* delete task
*/
router.delete('/task/:id', function(req, res, next){
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});

/*
* update task
*/
router.put('/task/:id', function(req, res, next){
  var task = req.body;
  var updtask = {};

  if(task.isDone){
    updtask.isDone = task.isDone;
  }

  if(task.title){
    updtask.title = task.title;
  }

  if(!updtask){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  }else{
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updtask, {}, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
    });
  }
});
module.exports = router; //so that we can access the router from different files
