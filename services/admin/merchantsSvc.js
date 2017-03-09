/**
 * Created by hudinghua 2017/03/01.
 */

var models = require('../../models');
var Q = require('q');

module.exports = {
	getUserOne:function(user){
		var deferred = Q.defer();
		try{
	  		models.ms_merchants.findOne({
	  			where:{
	  				username:user
	  			}
	  		}).then(function(result){
	  			deferred.resolve(result);
	  		},function(err){
	  			deferred.reject(err);
	  		});
		}catch(err){
			deferred.reject(err.message);
		}
		return deferred.promise;
	},
	getUsers:function(){
		var deferred = Q.defer();
		try{
	  		models.ms_merchants.findAll().then(function(result){
	  			deferred.resolve(result);
	  		},function(err){
	  			deferred.reject(err);
	  		});
		}catch(err){
			deferred.reject(err.message);
		}
		return deferred.promise;
	}
};