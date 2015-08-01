var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/author', function(req, res){
    res.render('author', {title: 'Creditos'});
});

//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);


//Autoload
router.param('quizId', quizController.load);

router.get('/quizes/', quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);

module.exports = router;
