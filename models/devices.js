/**
 * Created by hudinghua 2017/02/28.
 */

'use strict'

module.exports = function(sequelize,DataTypes){
	return sequelize.define('ms_devices',{
		id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            defaultValue:DataTypes.INTEGER
        },
        name:{
            type:DataTypes.STRING,
            field:'name',
            allowNull:false,
            comment:'Device Name'
        },
        password:{
            type:DataTypes.STRING,
            field:'model'
        }
	},{
    	timestamps:true
    });
};