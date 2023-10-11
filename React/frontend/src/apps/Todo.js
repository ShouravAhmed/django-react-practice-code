
import {useState} from 'react';

export const Todo = () => {

    const [todoList, setTodoList] = useState([]);

    const [todoTitle, setTodoTitle] = useState("");
    const todoTextChanged = (event) => {
        setTodoTitle(event.target.value);
    }

    const todoSaveButtonClicked = (event) => {
        if(event?.key?.length > 0 && event.key !== "Enter") {
            return;
        }
        if(todoTitle.length >= 3) {
            setTodoList([{id: todoList.length === 0 ? 1 : todoList.length + 1, title: todoTitle, isCompleted: false}, ...todoList])
        }
        setTodoTitle("");
        console.log(todoList);
    }

    const deleteTodo = (id) => {
        setTodoList(todoList.filter((todo)=>{
            return todo.id !== id;
        }))
    }
    
    const todoCompleted = (id) => {
        setTodoList(todoList.map((todo) => {
            if(todo.id === id) {
                todo.isCompleted = true;
            }
            return todo;
        }))
    }

    const editTodo = (id) => {
        setTodoTitle(todoList.find(item => item.id === id).title);
        deleteTodo(id);
    }

  return (
    <div>
        <input type="text" onChange={todoTextChanged} onKeyUp={todoSaveButtonClicked} value={todoTitle}/>
        <input type="button" value="save" onClick={todoSaveButtonClicked}/>
        <hr />

        {todoList.map((todo, key) => {
            return <div className='todo'>
                <h1 className='title' style={{color: todo.isCompleted ? "Green" : "Black"}}>{todo.title}</h1>
                <button onClick={()=>{deleteTodo(todo.id)}}> X </button>
                <button onClick={()=>{editTodo(todo.id)}}> Edit </button>
                <button onClick={()=>{todoCompleted(todo.id)}}> Completed </button>
            </div>
        })}
        
    </div>
  )
}
