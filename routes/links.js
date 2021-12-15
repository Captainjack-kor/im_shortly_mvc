const express = require('express');
const router = express.Router();
const controller = require('../controllers/links');

/* GET links listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', controller.get);
router.get('/:id', controller.findByPkValue);
router.post('/', controller.post);

//참고했음
//https://velog.io/@dlrbwls0302/TIL-SequelizeShortly-mvc-%EC%BD%94%EB%93%9C-%EB%B6%84%EC%84%9D

module.exports = router;
