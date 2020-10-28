// DOM操作のために定義する
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

// localStorageのvalueをKey(todos)で取得してtodosに定義する,jsで使えるようにjson=>js
const todos = JSON.parse(localStorage.getItem("todos"));

// 取得したtodos [todo,todo,todo]に対してaddTodoの処理をする
if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

// submitされた時に呼び出す処理
form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});


function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement("li");
        // todos.forEachでのtodoのcompletedが更新されるように
        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todoText;
        
        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");

            updateLS();
        });
        // contextmenuは右クリック
        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();

            updateLS();
        });

        // ulにliを追加
        todosUL.appendChild(todoEl);

        input.value = "";

        updateLS();
    }
}

// localStorageに保存する処理
function updateLS() {
    const todosEl = document.querySelectorAll("li");

    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}