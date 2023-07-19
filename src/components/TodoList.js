import React, { useState } from 'react';

function TodoList() {
  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(false)

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (search !== "") {
      const updatedTodos = {
        id: Math.random() * 1000,
        text: search,
      };
      setTodos(prevItems => [...prevItems, updatedTodos]);
      setSearch("");
    }
  }

  function deleteTodo(id) {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);

    if(updatedTodos.length === 0){
       setMessage(true)
    }
  }

  function handleToggleCheck(id) {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      });
    });
  }
  
 return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder='Add Todo....'
        />
        <button type="submit">Add Todo</button>
      </form>

      {todos.map(todo => ( 
        <div key={todo.id}>
           <div className='todos'>
            <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleCheck(todo.id)}
            className='input1'
            />
            <p className={todo.completed ? "checked" : "notchecked"}>{todo.text}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete Todo</button>
           </div>
        </div>
      ))}

      {message && <p className='last'>No todos remaining.</p>}
    </div>
  );
}
export default TodoList;
