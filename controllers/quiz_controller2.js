var models = require('../models/models.js');

// get /quizes/question

exports.question = function (req, res){
models.Quiz.findAll().success(function(quiz){
res.render('quizes/question',{pregunta:quiz[0].pregunta})
})
};

// get /quiz/answer

exports.answer = function (req, res){
	models.Quiz.findAll().success(function (quiz){
	if (req.query.respuesta === quiz[0].respuesta){
		res.render ('quizes/answer', {respuesta: 'Correcto'});
	}else{
		res.render ('quizes/answer', {respuesta: 'Incorrecto'});
	}

})
};

// get /quizes/
exports.index = function (req, res){
models.Quiz.findAll.then(
        function(quizes) {
            res.render('quizes/index.ejs', {quizes: quizes });
		})
};

// GET /quizes/:id
exports.show = function (req, res) {
	 models.Quiz.findById(req.params.quizId).then(function (quiz) {
        res.render('quizes/show', {
		quiz: quiz});
        })
    };

   
   

// GET /quizes/:id/answer
exports.answer = function (req, res) {
     models.Quiz.findById(req.params.quizId).then(function (quiz) {
        if (req.query.respuesta === quiz.respuesta) {
            res.render('quizes/answer', {
                quiz: quiz,
                respuesta: 'Correcto'
            });

        } else {
            res.render('quizes/answer', {
                quiz: quiz,
                respuesta: 'Incorrecto'
            });
        }
    })

    
};