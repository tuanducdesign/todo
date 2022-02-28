# At submit

``js

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

``

## At checkbox

``js

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

``
