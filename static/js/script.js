// Fonction qui convertit un nombre entier (nb) en chaine de 2 charactère.
function dchiffre(nb) {
	if(nb < 10) {// si le chiffre indiqué est inférieurs à dix ...
		nb = "0"+nb; // .. on ajoute un zéro devant avant affichage
	}

	return nb;
}

function getTime(sec) {
    var min = Math.floor(sec/60);
    var second = sec%60;
    return min + 'min ' + second + 'sec';
}

// Fonction qui démare le chronomètre
function launchInterval(m, s) {
    var temps = setInterval(function() { // setInterval défini une fonction qui s'éxécutera toute les x miliseconde
        if (s<2 & m==0) { // Si le chronometre est fini (seconde < 2 et minute = 0)
            clearInterval(temps); // On suprime l'interval. Termine le chronometre
            bo = true;

            $('#m').val('0');
            $('#s').val('0');
            $('#m, #s').prop('disabled', false);

            $('.timerbtn').hide(); // Cacher les bouton 'timerbtn'
            $('.endbtn').show(); // et afficher les bouton 'endbtn'

        } else {
            s--; // retire une seconde

            if (s<1) { // si s==0 alors on retire une minute
                m--;
                s=59; // et on passe à 59 secondes
            }

            $('#m').val(m); // On actualise les minutes et seconde du cadran avec m et s
            $('#s').val(s);
        }
        secondCounter++;

    }, 1000); // Intervalle de répétition en miliseconde

    // On affecte false à bo pour empécher un second Intervalle de se lancer
    bo = false;
    return temps;
}

var temps; // contient l'interval du chronomettre
var bo = true; // permet de savoir si l'interval est lancé. S'il est lancé alors bo = false et sinon bo = true (permet de ne pas lancer l'interval plusieurs fois)
var paused = false; // On défini pause à false (deviendra true que si on clique sur "pause")

var secondCounter = 0;


$(document).ready(function() {

    $('#m, #s').prop('disabled', false); // On active les input du chrono (pour pouvoir modifier)
    var minute = 25;
    var second = 0;
    $('#m').val(minute);
    $('#s').val(second);

    $('#m').on('input', function() { // Quand on modifie le champs minute, on mets sa valeur dans la variable minute
        minute = $(this).val();
    });
    $('#s').on('input', function() {
        second = $(this).val();
    });

    $('#addtask').click(function(event) { // On ajoute un événement click sur le bouton qui a l'id 'addtask'
        console.log('testy');
        event.preventDefault(); // Eviter que le formulaire soit envoyé (et donc que la page recharge)
        var task = $('#input').val(); // Récupère la valeur du champs à l'id input
        if (task != '') { // Vérifier que le nom de la tache a été saisi
            $('#input').val(''); // On efface le champ text

            // Créer l'icone de supression de la tache
            var span = $('<span>').attr('class', 'glyphicon glyphicon-remove-sign');
            span.click(function() { // On défini un événement click dessus
                if ($(this).parent().attr('id') != 'selectedtask') { // On vérifie si le parent (la tache) possède l'id
                    $(this).parent().remove(); //                    'selectedtask'. Si non alors on peut le suprimer.
                }
            });

            var li = $('<li>'); // On crée un élément de liste
            li.click(function() {
                if (bo && !paused) {
                    var taskS = $(this).find('p').html(); // On récupére le nom de la tache
                    $("#curnttask").html(taskS); // On mets le nom de la tache dans le span a l'id 'curnttask'
                    $('#selectedtask').attr('id', ''); // on récupère l'élément qui à l'id selectedtask et on lui enlève
                    $(this).attr('id', 'selectedtask'); // On mets l'id selectedtask sur this (la tache sur laquelle on a cliqué)
                }
            });

            li.append(span); // On ajoute le span (l'icone pour suprimer) à l'élément li (la tache)
            li.append($('<p>').html(task)); // On ajoue un p qui contient le nom de la tache à l'élément li

            $('#todo').append(li); // On ajoute l'élément li à l'élément ul qui a l'id 'todo' (la liste "à faire")
        }
    });

    $("#start").click(function() {
        console.log(paused);
        if (bo && !paused) { // On controle bo pour savoir si un autre Intervalle est lancé
            if ($('#selectedtask').length > 0) { // Vérifie qu'il y'a plus de 0 élément qui ont l'id "selectedtask"
                m = parseInt($('#m').val());
                s = parseInt($('#s').val())
                temps = launchInterval(m, s); // On lance l'interval (voir fonction en haut)
            }
            $('#m, #s').prop('disabled', true); // On desactive les input du chrono
        }

    });


    $("#pause").click(function() {
        console.log(bo);
        if (!bo && !paused) { // Vérifie que l'interval est lancé et que pause est false
            clearInterval(temps); // On stop l'intervalle lancer
            bo = true // On passe bo a true (puisqu'on stope l'intervalle)
            paused = true; // On pase pause a true (puisqu'on passe en pause)
            $(this).html('Play'); // On change le contenu du boutton par "Play"
            $('#m, #s').prop('disabled', false); // On active les input du chrono (pour pouvoir modifier)

        } else if (bo && paused) { // SI l'interval n'est pas lancé et que pause est true
            m = parseInt($('#m').val()); // On récupère les minutes et les seconde dans l'html
            s = parseInt($('#s').val());
            temps = launchInterval(m, s); // On relance l'intervalle
            paused = false; // Et on mets pause a false (puisq'on sort de la pause)
            $(this).html('Pause'); // On rechange le contenu du bouton par "Pause"
            $('#m, #s').prop('disabled', true);  // On desactive les input du chrono
        }
    });

    $('#terminer').click(function() {
        var task = $('#selectedtask'); // On récupère la tache
        task.detach(); // On la retire du html
        task.attr('id', ''); // Change son id (pour enlever l'id 'selectedtask')
        task.find('p').html(task.find('p').html() + ' - ' + getTime(secondCounter));
        secondCounter = 0;
        $('#done').append(task); // On l'ajoute à la liste 'Fait'

        task.unbind(); // Suprime les event associé à task.

        $("#curnttask").html(''); // On efface le nom de la tache courante

        $('#m').val(minute);
        $('#s').val(second);

        if (!bo) {
            clearInterval(temps); // On stop l'intervalle lancer
            bo = true;
        }


        $('.endbtn').hide(); // Cacher les boutons 'endbtn'
        $('.timerbtn').show(); // Montrer les boutons 'timerbtn'
    });

    $('#recommencer').click(function() {
        $('#m').val(minute);
        $('#s').val(second);
        $('#start').trigger( "click" ); // Déclancher l'évenement click associé à l'élément qui a l'id 'start'

        $('.endbtn').hide(); // Cacher et faire réaparaitre les boutons
        $('.timerbtn').show();
    });

});
