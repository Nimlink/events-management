function config($translateProvider) {

	$translateProvider
		.translations('en', {

		})
		.translations('fr', {


			app_name : 'immotrankil',
            fiche : 'Fiche du locataire',
			appreciation : 'Appréciation générale',

            capacite_tiny: 'Capacité',
            capacite_short: 'Capacité du locataire à payer les loyers en temps et en heure',
            capacite_long: 'Capacité du locataire à payer les loyers en temps et en heure',

            attitude_tiny: 'Attitude',
            attitude_short: 'Attitude du locataire durant la location',
            attitude_long: 'Attitude du locataire durant la location : sollicitations intempestives, etc.',

            degradation_tiny: 'Dégradation',
            degradation_short: 'Etat des lieux de sortie du bien loué',
            degradation_long: 'Etat des lieux de sortie du bien loué : dégradations, propreté, etc.',

            moyenne: 'Moyenne',

            phrase_avis_1: 'Un propriétaire à ',
            phrase_avis_2: ' indique avoir eu ',
            phrase_avis_3: ' comme locataire du ',
            phrase_avis_4: ' au ',

            list_avis: 'Liste des avis',
            ajouter_avis: 'Ajouter un avis',
            rediger_avis: 'Rédiger un avis',
            mes_avis: 'Mes avis',
            prenom_nom: 'Prénom - Nom',
            chercher_locataire: 'Chercher locataire',
            rechercher: 'Rechercher',

            code_postal: 'Code postal',
            entree: 'Entrée',
            sortie: 'Sortie',
            sauver: 'Sauvegarder',
            cancel: 'Annuler',
            sortir: 'Sortir',

            dashboard: 'Tableau de bord du propriétaire',
            avis_rediges: 'avis rédigés',
            locataires: 'locataires consultés',

            prenom: 'Prénom',
            nom: 'Nom',

            nobody: 'Aucune personne trouvée',
            ok: 'Ok',
            plusieurs_personnes_trouvees: 'Plusieurs personnes ont été trouvées',
            link : 'Lien',
            toomany: 'Trop de personnes ont été trouvées, Veuillez affiner votre recherche',
            town: 'Ville',
            missing_parameters: 'Veuillez svp renseigner les champs suivants',
            usure: 'Etes vous sûr de mettre 0 à ce locataire ?',
            dateNotOk: "La date de sortie ne peut pas être inférieure à la date d'entrée",
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
            search: "Chercher un locataire",
            issue_on_registration : "Problème non identifié. Veuillez vous reconnecter plus tard.",
            mail_activated: "Votre adresse e-mail est bien enregistrée. L'analyse de votre attestation est en cours. Vous serez notifié dès validation du document."

		});

	$translateProvider.preferredLanguage('fr');

}

angular
	.module('fup')
	.config(config);
