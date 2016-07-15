function config($translateProvider) {

	$translateProvider
		.translations('en', {

		})
		.translations('fr', {


			app_name : 'events-management',

            moyenne: 'Moyenne',

            entree: 'Entrée',
            sortie: 'Sortie',
            sauver: 'Sauvegarder',
            cancel: 'Annuler',
            sortir: 'Sortir',

            dashboard: 'Tableau de bord',

            prenom: 'Prénom',
            nom: 'Nom',

            ok: 'Ok',
            link : 'Lien',
            missing_parameters: 'Veuillez svp renseigner les champs suivants',
            mail: 'Mail',
            password: 'Password',
            attestation_limitation : "Le fichier d'attestation ne peut pas dépasser 100 Mb",
            password_different : 'Les passwords ne peuvent pas être différents',
            no_attestation : 'Une attestation est nécessaire pour créer le compte',
            issue_on_registration : 'Le compte existe déjà !',
            issue : 'Problème non identifié. Veuillez vous reconnecter plus tard.',
            password_forgotten :'Mot de passe oublié',
            register_ok: 'Inscription enregistrée !',
            mail_activation: "Un mail d'activation de votre compte vient de vous être envoyé.",
            search: "Chercher",
            issue_on_registration : "Problème non identifié. Veuillez vous reconnecter plus tard.",
            mail_activated: "Votre adresse e-mail est bien enregistrée. L'analyse de votre attestation est en cours. Vous serez notifié dès validation du document."

		});

	$translateProvider.preferredLanguage('fr');

}

angular
	.module('fup')
	.config(config);
