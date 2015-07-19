var path = require('path');

// Carga modelo ORM
var Sequelize = require ('sequelize');

//usar BBDD sqlite:
var sequelize = new Sequelize(null,null,null,

                             {dialect:"sqlite",storage:"quiz.sqlite",});

//var sequelize = New Sequelize( null, null, null, { dialect: "sqlite", storage : "quiz.sqlite",});

// importamos la definicion de la Tabla Quiz en quiz.js

 var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
 exports.Quiz = Quiz;  // exporta definición de tabla.


 sequelize.sync().success(function(){
	 Quiz.count().success(function (count){
		 if(count === 0){
			 Quiz.create({
				 pregunta: 'Capital de Italia',
				 respuesta: 'Roma'
			 })
		.success(function(){console.log('Base de datos inicializada')});
		};
	 });
 });
