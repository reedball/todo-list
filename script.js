function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

var checkBoxes = document.getElementsByClassName("form-check-input");

var checkBoxFunction = function(){
    let todos = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < todos.length; i++){
        if (todos[i].text === this.parentNode.innerText){
            if (this.checked === true){
                todos[i].checked = true;
            }
            else if (this.checked === false) {
                todos[i].checked = false;
            }
        }
    }
    todos = JSON.stringify(todos);
    localStorage.setItem("todos", todos);
}


let checkBoxEvent = () => {
    Array.from(checkBoxes).forEach(c => c.addEventListener("click", checkBoxFunction));
}


var trashes = document.getElementsByClassName("trashIcon");

var myFunction = function (){
    this.parentNode.remove();
    let items = JSON.parse(localStorage.getItem("todos"));
    for (let i =0; i< items.length; i++) {
        if (items[i].text == this.parentNode.innerText) {
            items.splice(i, 1);
        }
    }
    items = JSON.stringify(items);
    localStorage.setItem("todos", items);
    if (JSON.parse(localStorage.getItem("todos")).length === 0 ){
        localStorage.clear();
    }
}

let listClickEvent = ()=> {
    Array.from(trashes).forEach(t => t.addEventListener("click", myFunction));
}


let getTodos = () => {
    removeAllChildNodes(document.getElementById("todoContainer"));
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(t => {
        let newTodo = document.createElement("li");
        newTodo.classList.add("list-group-item");
        newTodo.innerHTML = t.text;

        let checkbox = document.createElement("input");
        checkbox.classList.add("form-check-input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "checkBox");
        checkbox.checked = t.checked;

        let trash = document.createElement("i");
        trash.classList.add("fas", "fa-trash-alt", "trashIcon");
        trash.setAttribute("aria-hidden", "true");

        document.getElementById("todoContainer").appendChild(newTodo);
        newTodo.appendChild(trash);
        newTodo.appendChild(checkbox);
    });

    listClickEvent();
    checkBoxEvent();
}

if (localStorage.getItem("todos")){
    getTodos();
}


document.getElementById("button-addon2").addEventListener("click", function(){
    let todo = {
        text: document.getElementById("inputTodo").value,
        checked: false
    };
    document.getElementById("inputTodo").value = "";
    let todos = localStorage.getItem("todos");
    todos = todos ? JSON.parse(todos) : [];
    todos.unshift(todo);
    todos = JSON.stringify(todos);
    localStorage.setItem("todos", todos);
    getTodos();
})