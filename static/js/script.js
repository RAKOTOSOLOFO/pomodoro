function dchiffre(nb) {
	if(nb < 10) {// si le chiffre indiqué est inférieurs à dix ...
		nb = "0"+nb; // .. on ajoute un zéro devant avant affichage
	}

	return nb;
}

function launchInterval(m, s, bo, temps) {
    var temps = setInterval(function() {
        if (s<2 & m==0) {
            clearInterval(temps);
            $("#s").html('00');
            $("#m").html('00');
            $('.timerbtn').hide();
            $('.endbtn').show();

        } else {
            s--;

            if (s<1) {
                m--;
                s=59;
            }

            $("#s").html(dchiffre(s));
            $("#m").html(dchiffre(m));
        }

    },1000);

    // On affecte false à bo pour empécher un second Intervalle de se lancer
    bo = false;
    return temps;
}

$(document).ready(function() {

    $('#addtask').click(function() {
        var task = $('#input').val();
        if (task != '') {
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
        }
    });

    // var h = 0; // Heure
    // var m = 0; // Minute
    // var s = 0; // Seconde

    var temps; // Contiendra l'exécution de notre code
    var bo = true; // Permettra de contrôler l'exécution du code

    $("#start").click(function() {

        if ($('#selectedtask').length > 0) {
            m = 0;
            s = 20;
            $('#m').html(dchiffre(m));
            $('#s').html(dchiffre(s));
            if(bo) { // On controle bo pour savoir si un autre Intervalle est lancé
                temps = launchInterval(m, s, bo);
            }
        }
    });

    var paused = false;

    $("#pause").click(function() {
        if (bo) {
            if (!paused) {
                clearInterval(temps); // On stop l'intervalle lancer
                bo = true
                paused = true;
                $(this).html('Play');

            } else {
                m = parseInt($('#m').html());
                s = parseInt($('#s').html());
                temps = launchInterval(m, s, bo);
                paused = false;
                $(this).html('Pause');
            }
        }
    });

    $('#terminer').click(function() {
        var task = $('#selectedtask');
        task.remove();
        task.attr('id', '');
        $('#done').append(task);

        task.find('span').click(function() {
            if ($(this).parent().attr('id') != 'selectedtask') {
                $(this).parent().remove();
            }
        });

        $("#curnttask").html('');

        $('#m').html('25');
        $('#s').html('00');

        $('.endbtn').hide();
        $('.timerbtn').show();
    });

    $('#recommencer').click(function() {
        $('#start').trigger( "click" );
        $('.endbtn').hide();
        $('.timerbtn').show();
    });
});
