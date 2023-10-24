const express = require('express');
const router = express.Router();
const Todo = require('./model');

// Route for displaying all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find(); // Retrieve all todos from the database
        res.status(200).json(todos); // Send the todos as a JSON response
      //  console.log(todos)
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}); 

// Route for display one item
router.get('/:id', async (req, res) => {
  try {
      const itemId = req.params.id;
      const todos = await Todo.findById(itemId); // Retrieve all todos from the database
      res.status(200).json(todos); // Send the todos as a JSON response
    //  console.log(todos)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}); 

// Route for creating a new todo
router.post('/', async (req, res) => {
  const { task } = req.body;
  const newTodo = new Todo({ task, completed: false });
  await newTodo.save();

  // Send a success response with a JSON message
  res.status(201).json({ message: 'Todo created successfully', data: newTodo });
  //res.redirect('/todos');
});

// // Route for marking a todo as completed
// router.post('/:id/complete', async (req, res) => {
//   const { id } = req.params;
//   const todo = await Todo.findById(id);
//   todo.completed = true;
//   await todo.save();
//   res.redirect('/todos');
// });

// Route to handle POST request to delete an item by ID
router.post('/delete', async (req, res) => {
  
    const itemId = req.params.id; // Assuming the item ID is sent in the body of the POST request
  
   
    try {
      // Use Mongoose findByIdAndDelete with the retrieved ID
      const deletedItem = await Todo.deleteOne(itemId);
      if (deletedItem) {
        res.status(200).json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for deleting a todo

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   const newTodo = await Todo.findByIdAndDelete(id);
//    res.status(201).json({ message: 'deleted successfully', data: newTodo });
// })



module.exports = router;
