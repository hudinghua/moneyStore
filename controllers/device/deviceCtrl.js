/**
 * Created by hudinghua 2017/03/01.
 */

var deviceSvc = require('../../services/device/deviceSvc');
var md5 = require('md5');
var Q = require('q');

module.exports = {
	getDevices:function(req,res,next){
		try{
			var result = {success:false,data:null,msg:null};
			deviceSvc.getDevices().then(function(data){
				result.success = true;
				result.data = data ? data : [];
				res.send(result);
			},function(error){
				result.msg = error;
				res.send(result);
			});
		}catch(err){
			LOGGER.error(err);
			next(err);
		}
	}
};