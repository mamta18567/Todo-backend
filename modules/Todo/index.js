const controller = require('./controllers/todoController.js');
const todoValidator = require('./validators/todoValidator.js');
const authValidator = require('../../validators/authValidator.js')
const auth = authValidator.authenticateUser

router.post('/create/list',todoValidator.nameValidator,controller.createList)
router.get('/show/list',todoValidator.getList,auth,controller.getList)
router.put('/update/list',todoValidator.nameValidator,controller.updateList);
router.delete('/delete/singleTodo',todoValidator.deleteTodo,controller.deleteTodo);