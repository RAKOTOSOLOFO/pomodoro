$(document).ready(function() {
    console.log('hello');


    $('#addtask').click(function() {
        var task = $('#input').val();
        $('#input').val('');

        var span = $('<span>').attr('class', 'glyphicon glyphicon-remove-sign');
        span.click(function() {
            if ($(this).parent().attr('id') != 'selectedtask') {
                $(this).parent().remove();
            }
        });

        var li = $('<li>');
        li.click(function() {
            var taskS = $(this).find('p').html();
            $("#curnttask").html(taskS);
            $('#selectedtask').attr('id', '');
            $(this).attr('id', 'selectedtask');
        });

        li.append(span);
        li.append($('<p>').html(task));

        $('#todo').append(li);
    });
});
