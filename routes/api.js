/*
* This page creates a RESTful API
*/
//load extenal js
//$.getScript('../secure.js')
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://' + process.env.DBUSERNAME + ':' + process.env.DBPASSWORD + '@' + process.env.DBHOST + ':' + process.env.DBPORT + '/' + process.env.DBNAME, ['tasks'], ['tabs'], ['users']);
require('dotenv').config();
//for sessions
var session = require('client-sessions');

function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};
/*
* function to get all tasks
*/
router.get('/tasks', requireLogin, function(req, res, next){
  db.tasks.find(function(err, tasks){
    if(err){
      res.send(err);
    }
    res.json(tasks);
  });
});

/*
* function to get all tabs
*/
router.get('/tabs', requireLogin, function(req, res, next){
  db.collection("tabs").find(function(err, tabs){
    if(err){
      res.send(err);
    }
    res.json(tabs);
  });
});

/*
* function to get all tabs
*/
router.get('/users', requireLogin, function(req, res, next){
  db.collection("users").find({}, {passwordHash: 0}, function(err, users){
    if(err){
      res.send(err);
    }
    //TODO take out password hashes or store hashes in a different collection
    res.json(users);
  });
});

/*
* function to get single task
* :id make id a parameter
* req is the way we get requests
*/
router.get('/task/:id', requireLogin, function(req, res, next){
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});

/*
* function to get single user
* :id make id a parameter
* req is the way we get requests
*/
router.get('/user/:id', function(req, res, next){
  db.collection("users").findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
    if(err){
      res.send(err);
    }
    res.json(user);
  });
});

/*
* new user
*/
router.post('/new-user', function(req, res, next){
  var user = req.body;
  if(!user.display){
    //send a 400 status
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  }else{
    db.collection("users").save(user, function(err, user){
      if(err){
        res.send(err);
      }
      res.json(user);
    });
  }
});

/*
* function to get single task
* :id make id a parameter
* req is the way we get requests
*/
router.get('/tab/:id', requireLogin, function(req, res, next){
  db.collection('tabs').findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, tab){
    if(err){
      res.send(err);
    }
    res.json(tab);
  });
});


/*
* save task
* :id make id a parameter
*/
router.post('/task', requireLogin, function(req, res, next){
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
* save tab
* :id make id a parameter
* the post needs to go to new-list because that's where the form is
*/
router.post('/new-list', requireLogin, function(req, res, next){
  var tab = req.body;
  if(!tab.display){
    //send a 400 status
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  }else{
    db.collection("tabs").save(tab, function(err, tab){
      if(err){
        res.send(err);
      }
      res.json(tab);
    });
  }
});

router.post('/test', function(req, res, next){
  res.send('here');
});

/*
* update tab
* :id make id a parameter
*/
router.put('/tab/:id', requireLogin, function(req, res, next){
  var tab = req.body.tab;
  var updateInfo = req.body.updateInfo
  var udpTab = {}
  var n = 0;
  if(updateInfo.share){
    //TODO add share_id to share array
    udpTab.share_id = [];
    for(n=0;n<tab.share_id.length;n++){
      udpTab.share_id.push(tab.share_id[n])
    }
    for(n=0;n<updateInfo.share.length;n++){
      udpTab.share_id.push(updateInfo.share[n])
    }
  }
  if(!udpTab){
    //send a 400 status
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  }else{
    db.collection("tabs").update(
      {_id: mongojs.ObjectId(req.params.id)},
      {
        $set: {
          share_id: udpTab.share_id
        }
      },
      {},
      function(err, tab){
        if(err){
          res.send(err);
        }
        res.json(tab);
    });
  }
});

/*
* delete task
*/
router.delete('/task/:id', requireLogin, function(req, res, next){
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});

/*
* delete tab
*/
router.delete('/tab/:id', requireLogin, function(req, res, next){
  db.collection("tabs").remove({_id: mongojs.ObjectId(req.params.id)}, function(err, tab){
    if(err){
      res.send(err);
    }
    res.json(tab);
  });
});

/*
* update task
*/
router.put('/task/:id', requireLogin, function(req, res, next){
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
