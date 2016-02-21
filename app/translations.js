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
            locataires: 'locataires cherchés',

            prenom: 'Prénom',
            nom: 'Nom',

            nobody: 'Aucune personne trouvée',
            ok: 'Ok',
            plusieurs_personnes_trouvees: 'Plusieurs personnes ont été trouvées',
            link : 'Lien',
            toomany: 'Trop de personnes ont été trouvées, Veuillez affiner votre recherche',
            town: 'Ville',
            missing_parameters: 'Veuillez svp renseigner les champs suivants',
            usure: 'Etes vous sûr de mettre 0 à ce locataire ?'
		});

	$translateProvider.preferredLanguage('fr');

}

angular
	.module('fup')
	.config(config);
