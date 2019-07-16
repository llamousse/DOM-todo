class TodoComponent {
    constructor(componentElement) {
        // Assign outer TodoComponent Element. We should do all of our searching within here, not `document`.
        this.componentElement = componentElement;
        // Get the todos container element
        this.todosElement = this.componentElement.querySelector('.todos-container');

        // instantiate the Todos class with it
        this.todos = new Todos(this.todosElement);
        // Do the same with form Element
        this.formElement = this.componentElement.querySelector('.todo-form');
        // I've given you a hint here. Look at the TodoForm constructor.
        this.form = new TodoForm(this.formElement, this.todos); 
    }
}

class Todos {
    constructor(containerElement) {
        this.containerElement = containerElement;
    }
    addTodo(text) {
        // Add a todo element to the container, and instantiate its class
        const todo = document.createElement('div');
        todo.textContent = text;
        this.containerElement.appendChild(todo);
        new Todo(todo);
    }
}

class Todo {
    constructor(todoElement) {
        this.todoElement = todoElement;
        // What do we need to add to make our element to make `this.toggle` work?
        this.todoElement.addEventListener('click', () => {
            this.toggle();
        });
    }
    toggle() {
        // Toggle the element being 'done'
        this.todoElement.classList.toggle('done');      
    }
}

class TodoForm {
    // Note the second argument, `todos`. It is an instance of the `Todos` class
    constructor(formElement, todos) {
        this.formElement = formElement;
        this.todos = todos;
        this.input = this.formElement.querySelector('input');
        this.addButton = this.formElement.querySelector('.add');

        // stretch - make a button clear all completed todos
        // this.clearButton;

        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
        this.formElement.addEventListener('submit', event => {
            event.preventDefault();
            this.submitTodo();
        });
    }
    submitTodo() {
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
        // see 'value'. 
        const text = this.input.value;
        this.input.value = "";

        // We need to actually add a todo to the page. If only we had access to
        // a class that has a member function that does just that.
        this.todos.addTodo(text);
    }
}

// Instantiate TodoComponent Classes
document.querySelectorAll('.todo-component')
    .forEach(todoElem => new TodoComponent(todoElem));

