var path = require('path');
// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;


// Carga modelo ORM
var Sequelize = require ('sequelize');


// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, {
    dialect: protocol,
    protocol: protocol,
    port: port,
    host: host,
    storage: storage, // solo SQLite (.env)
    omitNull: true // solo Postgres
});

//usar BBDD sqlite:
//var sequelize = new Sequelize(null,null,null,

                        //     {dialect:"sqlite",storage:"quiz.sqlite",});



// importamos la definicion de la Tabla Quiz en quiz.js

 var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
 exports.Quiz = Quiz;  // exporta definición de tabla.


 sequelize.sync().success(function(){
	 Quiz.count().success(function (count){
		 if(count === 0){
			 Quiz.create({
				 pregunta: 'Capital de Italia',
				 respuesta: 'Roma'
			 });
			 Quiz.create({
				 pregunta: 'Capital de Portugal',
				 respuesta: 'Lisboa'
			 });Quiz.create({
				 pregunta: 'Capital de Francia',
				 respuesta: 'Paris'
			 })
		.success(function(){console.log('Base de datos inicializada')});
		};
	 });
 });
