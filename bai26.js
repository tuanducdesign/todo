// create arr todo while
var arrTodo = [];
// sort arr todo after checked input
function sortTodo() {
    var arrTodoChecked = [];
    var arrTodoUnchecked = [];
    for (var i = 0; i < arrTodo.length; i++) {
        if (arrTodo[i].checked) {
            arrTodoChecked.push(arrTodo[i]);
        } else {
            arrTodoUnchecked.push(arrTodo[i]);
        }
    }
    arrTodo = arrTodoChecked.concat(arrTodoUnchecked);
}
// render todo
function renderTodo(arr) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += '<div class="todo-item">' +
        '<div class="todo-item-content">' +
        '<div class="todo-item-content-title">' +
        '<input type="checkbox" class="checkbox check">' +
        '<span>' + arr[i].title + '</span>' +
        '</div>' +
        '<div class="btn-group">' +
        '<div class="todo-item-content-remove">' +
        `<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#showcontent_${i}" aria-expanded="false" aria-controls="showcontent_${i}">Read Content</button>` +
        '<button class="btn btn-danger remove">Remove</button>' + 
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        `<div class="collapse" id="showcontent_${i}">` +
        '<div class="card card-body">' + arr[i].content + '</div>' +
        '</div>';
    }
    return str;
}
// render todo
$('.todo-container').append(renderTodo(arrTodo));
// function render modal
function renderModalAdd() {
    var str = '';
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
    '<div class="form-group">' +
    '<textarea class="form-control" id="content" name="content" rows="3" placeholder="Enter content"></textarea>' +
    '</div>' +
    '<div class="btn-group mx-auto d-flex mt-3 mb-3" role="group" aria-label="Basic example">' +
    '<button type="button" class="btn btn-primary submit">Submit</button>' +
    '</div>' +
    '</form>'+
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
    return str;
}
// render modal
$('.todo-create').append(renderModalAdd());
// show myModal
$('.add-todo').on('click', function() {
    $('#myModalAdd').modal('show');
    $('#todo').attr('required', true);
    $('#content').attr('required', true);
}
);
// function alert check remove todo
function alertRemoveTodo() {
    var r = confirm("Are you sure you want to remove this todo?");
    if (r == true) {
        var id = arrTodo[id];
        arrTodo.splice(id, 1);
        $(this).parent().parent().parent().fadeOut(500);
        $('.todo-container').html(renderTodo(arrTodo))
        localStorage.clear();
    }
    else {
        return false;
    }
}
// remove todo
$('.todo-container').on('click', '.remove', function() {
    alertRemoveTodo();
    checkTodo();
}
);
// function alert check remove all todo
function alertRemoveAll() {
    var r = confirm("Are you sure you want to remove all todo?");
    if (r == true) {
        arrTodo = [];
        $(this).parent().parent().parent().fadeOut(500);
        $('.todo-container').html(renderTodo(arrTodo));
        localStorage.clear();
    
    }
    else {
        return false;
    }
}
// check remove all todo for
$('.remove-all').on('click', function() {
    if (arrTodo.length > 0) {
        alertRemoveAll();
        checkTodo();
    } else {
        alert('You have deleted all todo!');
    }
}
);
// add new arrTodo
$('.submit').on('click', function() {
    var title = $('#todo').val();
    var content = $('#content').val();
    var id = arrTodo.length + 1;
    arrTodo.push({title, content, id});
    window.localstorageTodo();
    $('.todo-container').html(renderTodo(arrTodo));
}
);
// index todo
let index
// render todo to edit
function renderTodoEdit(arr) {
    checkTodoEdit();
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += '<div class="todo-item">' +
        '<div class="todo-item-content">' +
        '<div class="todo-item-content-title">' +
        '<span>' + arr[i].title + '</span>' +
        '</div>' +
        '<div class="btn-group">' +
        '<div class="todo-item-content-remove">' +
        `<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#readcontent_${i}" aria-expanded="false" aria-controls="readcontent_${i}">Read Content</button>` +
        `<button class="btn btn-danger edit" onclick="choose(${i})">Edit todo</button>` + 
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        `<div class="collapse" id="readcontent_${i}">` +
        '<div class="card card-body">' + arr[i].content + '</div>' +
        '</div>';
    }
    return str;
}
// choose todo
function choose(i){
    index = i;
}
// function render modal
function renderModalEdit() {
    var str = '';
    str += '<div class="modal fade" id="myModalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
    '<div class="modal-dialog modal-dialog-centered" role="document">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h5 class="modal-title" id="exampleModalLabel">Edit todo</h5>' +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' +
    '</button>' +
    '</div>' +
    '<div class="modal-body">' +
    '<div class="data"></div>' +
    '</div>' +
     '</div>' +
    '</div>' +
    '</div>';
    return str;
}
// show modal
$('.edit-todo').on('click', function() {
    $('#myModalEdit').modal('show');
    $( ".data" ).html('');
    $('.data').append(renderTodoEdit(arrTodo));
}
);
// render modal
$('.todo-edit').append(renderModalEdit());
// edit todo show input
$('.todo-edit').on('click', '.edit', function() {
    var title = $(this).parent().parent().parent().find('span').text();
    var content = $(this).parent().parent().parent().find('card-body').text();
    var str = '<form>' +
    '<div class="form-group">' +
    '<input type="text" class="form-control" id="todoEdit" name="todo" value="' + title + '">' +
    '</div>' +
    '<div class="form-group">' +
    '<textarea class="form-control" id="todoContentEdit" name="todoContent" rows="3" value="' + content + '"></textarea>' +
    '</div>' +
    '<div class="btn-group mx-auto d-flex mt-3 mb-3" role="group" aria-label="Basic example">' +
    '<button type="button" class="btn btn-primary savetodo">Save todo</button>' +
    '</div>' +
    '</form>';
    $('.data').html(str);
}
);
// push title from edit todo to arrTodo
$('.todo-edit').on('click', '.savetodo', function() {
    var title = $('#todoEdit').val();
    var content = $('#todoContentEdit').val();
    arrTodo[index]= {title, content, id : arrTodo[index].id};
    localstorageTodo()
    // close trigger
    $('.close').trigger('click');
    $('.todo-container').html(renderTodo(arrTodo));
}
);
// localstorage todo
function localstorageTodo() {
    localStorage.setItem('todo', JSON.stringify(arrTodo));
}
// load todo
function loadTodo() {
    var todo = localStorage.getItem('todo');
    if (todo != null) {
        arrTodo = JSON.parse(todo);
    }
}
// save todo
$(document).ready(function() {
    loadTodo();
    $('.todo-container').html(renderTodo(arrTodo));
}
);
// save todo onunload
$(window).on('unload', function() {
    localstorageTodo();
}
);
// save todo onclick
$('.submit').on('click', function() {
    $('.close').trigger('click');
    document.getElementById("todo").value = "";
    document.getElementById("content").value = "";
}
);
// check arrTodo
function checkTodo() {
    if (arrTodo.length == 0) {
        // on homepage
        $('.todo-container').html('');
        $( ".todo-container" ).append('<div class="alert alert-primary" role="alert">Click the Add todo button, to add your new todo</div>');
    }
}
// check arrTodo modal edit
function checkTodoEdit() {
    if (arrTodo.length == 0) {
        // on modal edit
        $( ".data" ).html('')
        $( ".data" ).append('<div class="alert alert-primary" role="alert">No data found</div>');
    }
}
// show checkTodo
$(document).ready(function() {
    checkTodo();
}
);
// localStorage checkTodo
$(window).on('unload', function() {
    checkTodo();
}
);
// input checkbox if else
$('.todo-container').on('click', '.checkbox', function() {
    if ($(this).is(':checked')) {
        sortTodo();
    }
}
);
// create localStorage input checkbox click
$('.todo-container').on('click', '.checkbox', function() {
    var title = $(this).parent().parent().parent().find('span').text();
    var check = $(this).is(':checked');
    var obj = {title, check};
    localstorageTodo();
    console.log(obj);
}
);