/**
 * Created by hudinghua 2017/02/28.
 */

'use strict'

module.exports = function(sequelize,DataTypes){
	return sequelize.define('ms_merchants',{
		id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            defaultValue:DataTypes.INTEGER
        },
        name:{
            type:DataTypes.STRING,
            field:'username',
            allowNull:false,
            comment:'Login account'
        },
        password:{
            type:DataTypes.STRING,
            field:'password',
            allowNull:false,
            comment:'Login password'
        },
        email:{
            type:DataTypes.STRING,
            field:'email',
            allowNull:false,
            comment:'Email'
        }
	},{
    	timestamps:false
    });
};