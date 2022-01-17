$(document).ready(function () {

    let edit = false;

    console.log('jquery working');
    $('#task-result').hide();

    fectchTasks();

    $('#search').keyup(function () {
        if ($('#search').val()){
            let search = $('#search').val();
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: {search},
                success: function (response) {
                    let task = JSON.parse(response);
                    let template = '';
                    task.forEach(task => {
                        template += `
                        <li>${task.name}</li>
                    `
                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }
            });
        }
    });

    $('#task-form').submit(function (e) {
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#taskId').val()
        };

        let url = edit === false ? 'task-add.php' : 'task-edit.php';

        $.post('task-add.php', postData, function (response) {
            fectchTasks();
            $('#task-form').trigger('reset');
        });
        e.preventDefault();
    });

    function fectchTasks() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(tasks => {
                    template += `
                    <tr taskId="${tasks.id}">
                        <td>${tasks.id}</td>
                        <td><a href="#" class="task-edit">${tasks.name}</a></td>
                        <td>${tasks.description}</td>
                        <td>
                            <button class="task-delete btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                `
                });
                $('#tasks').html(template);
            }
        });
    }

    $(document).on('click', '.task-delete', function () {
        if (confirm('Are you sure you want to delete it?')){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
            $.post('task-delete.php', {id}, function (response) {
                fectchTasks();
            });
        }
    });
    
    $(document).on('click', '.task-edit', function () {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        $.post('task-single.php', {id}, function (response) {
           const task = JSON.parse(response);
           $('#name').val(task.name);
           $('#description').val(task.description);
           $('#taskId').val(task.id);
           edit = true;
        });
    })

});