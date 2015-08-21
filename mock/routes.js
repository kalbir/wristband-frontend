var auth_header = 'fakeauth';

// data
var apps = require('./data/apps');
var stages = require('./data/stages');
var users = require('./data/users');

// modules
var utils = require('./utils');

var uuids = [];

module.exports = function (app) {

  app.post('/login', function (req, res) {
    if (!utils.contains(users, req.body.username)) {
      return res.send(401);
    }

    var id = utils.id();
    uuids.push(id);
    res.send(200, id);
  });

  // authenticate all other requests
  app.all('*', function (req, res, next) {
    if (!utils.contains(uuids, req.headers[auth_header])) {
      return res.send(401);
    }

    // else continue
    next();
  });

  app.get('/apps', function(req, res) {
    res.json(utils.asArray(apps));
  });

  app.get('/apps/:name', function(req, res) {
    res.json(apps[req.params.name]);
  });

  app.get('/stages/', function(req, res) {
    res.json(utils.asArray(stages));
  });

  app.get('/stages/:name', function(req, res) {
    res.json(stages[req.params.name]);
  });

};