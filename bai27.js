// create arr todo while
let arrTodo = [];
// render todo
function renderTodo(arr) {
    let str = '';
    for (let i = 0; i < arr.length; i++) {
        str += '<div class="todo-item">' +
            '<div class="todo-item-content">' +
            '<div class="todo-item-content-title">' +
            '<input type="checkbox" class="checkbox check">' +
            '<span>' + arr[i].title + '</span>' +
            '</div>' +
            '<div class="todo-item-content-remove">' +
            '<button class="btn btn-danger remove">Remove</button>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    return str;
}
// render todo
$('.todo-container').append(renderTodo(arrTodo));
// function render modal
function renderModalAdd() {
    let str = '';
    str += '<div class="modal fade" id="myModalAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Create todo</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<form>' +
        '<div class="form-group">' +
        '<input type="text" class="form-control" id="todo" name="todo" placeholder="Enter todo">' +
        '</div>' +
        '<div class="btn-group mx-auto d-flex mt-3 mb-3" role="group" aria-label="Basic example">' +
        '<button type="button" class="btn btn-primary submit">Submit</button>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return str;
}
// render modal
$('.todo-create').append(renderModalAdd());
// show myModal
$('.add-todo').on('click', function () {
    $('#myModalAdd').modal('show');
    $('#todo').attr('required', true);
});
// remove todo
$('.todo-container').on('click', '.remove', function () {
    var id = arrTodo[id];
    arrTodo.splice(id, 1);
    $(this).parent().parent().parent().fadeOut(500);
    $('.todo-container').html(renderTodo(arrTodo))
});
// add new arrTodo
$('.submit').on('click', function () {
    const title = $('#todo').val();
    const id = arrTodo.length + 1;
    const status = false;
    arrTodo.push({
        title,
        id,
        status
    });
    // window localstorageTodo
    window.localstorageTodo();
    $('.todo-container').html(renderTodo(arrTodo));
});
// localstorage todo
function localstorageTodo() {
    localStorage.setItem('todo', JSON.stringify(arrTodo));
}
// load todo
function loadTodo() {
    const todo = localStorage.getItem('todo');
    if (todo != null) {
        arrTodo = JSON.parse(todo);
    }
}
// save todo
$(document).ready(function () {
    loadTodo();
    $('.todo-container').html(renderTodo(arrTodo));
});
// save todo onunload
$(window).on('unload', function () {
    localstorageTodo();
});
// save todo onclick
$('.submit').on('click', function () {
    $('.close').trigger('click');
    document.getElementById("todo").value = "";
});
const index = arrTodo.findIndex(function (item) {
    return item.status === true;
})
// function checkbox
function checkbox() {
    $('.todo-container').on('click', '.check', function () {
        const title = $(this).parent().parent().parent().find('span').text();
        // get id todo
        const id = arrTodo.length + 1;
        const status = $(this).is(':checked');
        arrTodo[index] = {title, status, id};
        console.log(arrTodo, Math.random());
        if ($(this).prop('checked')) {
            $(this).parent().parent().parent().addClass('completed');
        } else {
            $(this).parent().parent().parent().removeClass('completed');
        }
        loadTodo();
        localstorageTodo();
    });
}
checkbox();