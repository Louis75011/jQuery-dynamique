$(document).ready(function () {
    // Gestion du carousel
    $(".owl-carousel").owlCarousel({
        items: 1,
        nav: false,
        loop: true,
        autoplay: true,
        margin: 50,
        autoplayTimeout: 5000,
        autoplaySpeed: 2000,
    });

    // Afficher menu déroulant au survol
    $(".main-menu-link, .sub-menu").hover(function () {
        $(".sub-menu").css("display", "block");
    }, function () {
        $(".sub-menu").css("display", "none");
    })

    // Ouverture de menu de connexion (formulaire/email)
    $(".user-settings > .log-button").click(function () {
        if ($(".log-rollover-email span").text().length === 0) {
            $(".log-rollover").css("display", "flex");
        } else {
            $(".log-rollover-email").css("display", "flex");
        }
    })

    // Fermeture (formulaire)
    $(".log-rollover > .log-button").click(function () {
        $(".log-rollover").css("display", "none");
    })

    // Fermeture (email)
    $(".log-rollover-email > .log-button").click(function () {
        $(".log-rollover-email").css("display", "none");
    })

    // Validation de formulaire
    $("#log-submit").click(function () {
        let email = $("#email").val();
        let password = $("#password").val();
        if ([email, password].includes("")) {
            alert("Veuillez renseigner les champs");
            return;
        }
        if (!isValidEmail(email)) {
            alert("E-mail invalide");
            return;
        }
        fakeLogin(email, password);
    })

    // Validation de l'email par REGEX
    function isValidEmail(value) {
        if (
            /\S+@\S+\.\S+/.test(value) &&
            !/[`!#$%^&*()+_ /\=\[\]{};':"\\|,<>?~]/.test(value) // Texte séparé par un arobase puis un point, puis empêche de mettre des caractères spéciaux
        ) {
            return true;
        }
        return false;
    }
});

// Tuto requête AJAX : https://www.pierre-giraud.com/jquery-apprendre-cours/creation-requete-ajax/
// API gratuite : https://fr.openfoodfacts.org/data
function fakeLogin(email, password) {
    $.ajax({
            //L'URL de la requête 
            url: "https://world.openfoodfacts.org/api/v0/product/737628064502.json",
            //La méthode d'envoi (type de requête)
            method: "GET",
            //Le format de réponse attendu
            dataType: "json",
        })
        // Ce code sera exécuté en cas de succès
        .done(function (response) {
            // let data = JSON.stringify(response);
            // console.log(response);
            executeLogin(email);
        })
        //Ce code sera exécuté en cas d'échec - L'erreur est passée à fail()
        //On peut afficher les informations relatives à la requête et à l'erreur
        .fail(function (error) {
            alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
        })
        //Ce code sera exécuté que la requête soit un succès ou un échec
        .always(function () {
            alert("Requête effectuée");
        });
};

// Lancement du bouton connecté une fois le compte ajouté (à cliquer une nouvelle fois)
function executeLogin(email) {
    $(".log-rollover-email span").text(email);
    $(".log-rollover").css("display", "none");
};