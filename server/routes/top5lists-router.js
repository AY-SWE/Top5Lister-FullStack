/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const Top5ListController = require('../controllers/top5list-controller')
const router = express.Router()

router.post('/top5list', Top5ListController.createTop5List)
router.put('/top5list/:id', Top5ListController.updateTop5List)
router.delete('/top5list/:id', Top5ListController.deleteTop5List)
router.get('/top5list/:id', Top5ListController.getTop5ListById)
router.get('/top5lists', Top5ListController.getTop5Lists)
router.get('/top5listpairs', Top5ListController.getTop5ListPairs)

module.exports = router