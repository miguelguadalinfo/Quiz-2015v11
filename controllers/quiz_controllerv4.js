var models = require('../models/models.js');
//Con esta version ha funcionado, actualizo para dejarlo como version tema 8
//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId='+quizId));
			}
		}
	).catch(function(error){next(error);})	
};

//GET /quizes
exports.index = function(req, res) {
	console.log(req.query.search);
	
	var search = '%';
	if (req.query.search) {
		search = req.query.search.replace(/ /g, '%');
		search = search.split("+").join("%");
		search = '%'+search+'%';
	}
	models.Quiz.findAll({where: ["pregunta like ?", search], order :"pregunta ASC"}).then(
	//models.Quiz.findAll().then(
		function(quizes) {
			res.render('quizes/index',{quizes: quizes, errors:[]});
		}
	).catch(function(error){next(error);})	
};

//GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show',{quiz: req.quiz, errors:[]});	
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado ='Incorrecto';
	if(req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
		resultado = 'Correcto';
	} 
	res.render('quizes/answer',	{quiz : req.quiz, 
								respuesta: resultado,
								errors:[]});		
};

//GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build(
		{pregunta : "Pregunta", respuesta : "Respuesta"}
	);	 
	res.render('quizes/new', {quiz : quiz, errors:[]});		
};

//GET /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(	
		function(err) {
			if (err) {
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
				//guarda en BBDD los campos pregunta y respuesta de quiz
				quiz.save({fields : ["pregunta", "respuesta"]}).then(
					function(){
						res.redirect('/quizes')
					}
				)
			}
		}
	);
};

//GET /quizes/:id/edit
exports.edit = function(req, res) {
	var quiz = req.quiz;
	res.render('quizes/edit',{quiz: quiz, errors:[]});
};

//GET /quizes/:id
exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	
	req.quiz.validate().then(	
		function(err) {
			if (err) {
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			} else {
				//guarda en base de datos los campos pregunta y respuesta de quiz
				req.quiz.save({fields : ["pregunta", "respuesta"]}).then(
					function(){
						res.redirect('/quizes')
					}
				)
			}
		}
	);
};

//DELETE /quizes/:id
exports.destroy = function(req, res) {
	req.quiz.destroy().then( function() {
			res.redirect('/quizes');
		}		
	).catch(function(error){next(error)});
};