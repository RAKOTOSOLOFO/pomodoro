function dchiffre(nb) {
	if(nb < 10) {// si le chiffre indiqué est inférieurs à dix ...
		nb = "0"+nb; // .. on ajoute un zéro devant avant affichage
	}

	return nb;
}

$(document).ready(function() {
    console.log('hello');


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

    var h = 0; // Heure
    var m = 0; // Minute
    var s = 0; // Seconde

    var temps; // Contiendra l'exécution de notre code
    var bo = true; // Permettra de contrôler l'exécution du code

    $("#start").click(function() {

        if ($('#selectedtask').length > 0) {
            m = 1;
            $('#m').html(dchiffre(m));
            if(bo) { // On controle bo pour savoir si un autre Intervalle est lancé
                temps = setInterval(function() {
                    if (s==1 & m==0) {
                        clearInterval(temps);
                        var task = $('#selectedtask');
                        task.remove();
                        task.attr('class', '');
                        $('#done').append(task);

                        $("#curnttask").html('');

                        $('#m').html('25');
                        $('#s').html('00');
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
            }
        }
    });

    $("#pause").click(function() {
    	clearInterval(temps); // On stop l'intervalle lancer

           // On affiche les variable dans les conteneur dédié
    	$("#s").html(dchiffre(s));
    	$("#m").html(dchiffre(m));

           // Affecter true a bo pour indiquer qu'il n'y a plus d'Intervalle actif
    	bo = true
    });
});
