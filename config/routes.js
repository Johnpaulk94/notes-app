const express = require('express')
const router = express.Router()
const notesController = require('../app/controllers/notesController')
const categoriesController = require('../app/controllers/categoriesController')
const usersController = require('../app/controllers/UsersController')
const authenicateUser=require('../app/middlewares/authentication')

router.get('/notes',authenicateUser,notesController.list)
router.get('/notes/:id',authenicateUser,notesController.show)
router.post('/notes',authenicateUser,notesController.create)
router.put('/notes/:id',authenicateUser,notesController.update)
router.delete('/notes/:id',authenicateUser,notesController.delete)

router.get('/categories',authenicateUser,categoriesController.list)
router.get('/categories/:id',authenicateUser,categoriesController.show)
router.post('/categories',authenicateUser,categoriesController.create)
router.put('/categories/:id',authenicateUser,categoriesController.update)
router.delete('/categories/:id',authenicateUser,categoriesController.delete)


router.post('/users/register',usersController.register)
router.get('users/account',usersController.show)
router.post('/users/login',usersController.login)
router.delete('/users/logout',usersController.logout)

module.exports = router
