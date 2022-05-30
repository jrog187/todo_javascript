//selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



//functions
function addTodo(event){
    //prevents submission
    event.preventDefault();
    //todo div
    const todoDiv = document.createElement("div");
    // giv div a class
    todoDiv.classList.add("todo");
    //create li
    const todoLi = document.createElement("li");
    todoLi.innerText = todoInput.value;
    //giv li a class
    todoLi.classList.add("todo-item");
    //append or attach todoLi to todoDiv
    todoDiv.appendChild(todoLi);
    saveLocalTodos(todoInput.value);
    //create check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        //todo.addEventListener('transitionend', function(){
            //todo.remove();
        //});      
    }
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
    
function filterTodo(e){
            const todos = todoList.childNodes;
            todos.forEach(function(todo){
                switch(e.target.value){
                    case "all":
                        todo.style.display = 'flex';
                        break;
                    case "completed":
                        if(todo.classList.contains('completed')){
                            todo.style.display = 'flex';
                        }else{
                            todo.style.display = 'none';
                        }
                        break;
                     case "uncompleted":
                        if(!todo.classList.contains('completed')){
                            todo.style.display = 'flex';
                        }else{
                            todo.style.display = 'none';
                    }
            }
         });
}


function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        // giv div a class
        todoDiv.classList.add("todo");
        //create li
        const todoLi = document.createElement("li");
        todoLi.innerText = todo;
        //giv li a class
        todoLi.classList.add("todo-item");
        //append or attach todoLi to todoDiv
        todoDiv.appendChild(todoLi);
       
        //create check button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
    
        todoList.appendChild(todoDiv);
    });

}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todo.indexOf(todoIndex), 1);
    localStorage.setItem('todos',JSON.stringify(todos));
}