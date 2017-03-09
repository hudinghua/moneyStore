/**
 * Created by hudinghua 2017/03/01.
 */

var merchantsSvc = require('../../services/admin/merchantsSvc');
var md5 = require('md5');
var Q = require('q');

module.exports = {
	signIn:function(req,res,next){
		try{
			var result = {success:false,data:null,msg:null};
			merchantsSvc.getUserOne(req.body.loginName).then(function(data){
				req.session.loginName = req.body.loginName;
				LOGGER.info('<<<<<<<<<<<<<<<<<<Current user:'+req.session.loginName+'>>>>>>>>>>>>>>>>>>');
				result.success = true;
				result.data = data ? data.dataValues : {};
				res.send(result);
			},function(error){
				result.msg = error;
				res.send(result);
			});
		}catch(err){
			LOGGER.error(err);
			next(err);
		}
	},
	logout:function(req,res,next){
		try{
			var result = {success:false,data:null,msg:null};
			if (req.session && req.session.loginName) {
				req.session.loginName = null;
			}else{
				req.session = null;
			}
			result.success = true;
			res.send(result);
		}catch(err){
			LOGGER.error(err);
			next(err);
		}
	}
};