/**
 * Created by hudinghua 2017/02/28.
 */

var express = require('express');
var routeMap = express.Router();

var adminCtrl = require('../controllers/admin/adminCtrl');
var deviceCtrl = require('../controllers/device/deviceCtrl');

routeMap.post('/signIn', function(req, res,next) {
    adminCtrl.signIn(req,res,next);
});
routeMap.post('/logout', function(req, res,next) {
    adminCtrl.logout(req,res,next);
});
routeMap.get('/getDevices', function(req, res,next) {
    deviceCtrl.getDevices(req,res,next);
});

module.exports = routeMap;