document.addEventListener('DOMContentLoaded', function () {
    var textInput = document.querySelector('input[type=text]');
    textInput.addEventListener('keypress', function () {
        this.classList.remove("emptyText");
    });

    var form = document.querySelector("#todo-form");
    form.addEventListener('submit', function (e){
        e.preventDefault();
        var textInput = document.querySelector('input[type=text]');
        if(textInput.value.length == 0) {
            textInput.classList.add("emptyText");
        }
        addItem();
    });
    render();
});