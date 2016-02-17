function config($translateProvider) {

	$translateProvider
		.translations('en', {
			// PAGES
			TOOLSPAGES: 'Tools',
			FACTORSTOREPAGE: 'Factor Store',
			FACTORADMINPAGE: 'Factor Editor',
			ADMINPAGE: 'Administrator',

		})
		.translations('fr', {


			app_name : 'nuts',
			app_desc : 'suivi budgétaire',

            contract_info: 'Information',

            link: 'Lien',
            socle: 'Socle',
            i3g: 'I3G',
            geomod: 'Géomodélisation',
            reservoir: 'Réservoir',

            completed: 'Avancement',
            contracts: 'Prestations',
            contract_name: 'Prestation',
            create_contract: "Créer une prestation",
            contract_description: "Description",
            contract_type: "Type de prestation",
            contract_cpsi: "CPSI",
            contract_cpm: "CPM",
            contract_contract: "Contrat",
            contract_contractor: "Prestataire",
            contract_mutual_agreement: "Gré à gré",
            contract_start_date: "Début",
            contract_end_date: "Fin",
            contract_end_warranty: "Fin de garantie",
            contract_sap: "SAP",
            contract_da: "DA",
            contract_dsct: "DSCT",
            contract_asc: "ASC",
            contract_cmd: "Commande",
            contract_tech_prop: "Proposition technique",
            contract_fin_prop: "Proposition financière",
            contract_props: "Propositions",
            contract_nb_uo: "Nombre d'UO",
            contract_tjm: "TJM",
            contract_budget_line: "Budget",
            contract_budget_year: "Année",
            contract_budget_account: "Compte d'imputation",
            contract_state: "Statut",
            contract_progress: "Avancement",
            contract_budget_prev: "Budgété",
            contract_budget_mob: "Mobilisé",
            contract_budget_engage: "Engagé",
            contract_budget_real: "Réalisé",
            contract_budget_pdc2: "PDC 2",
            contract_budget_pdc5: "PDC 5",
            contract_budget_pdc9: "PDC 9",
            contract_budget_pdc: "Cloture",
            contract_facture: "Factures",
            contract_facture_prev: "Date prévisionnelle de facturation",
            contract_facture_montant: "Montant",
            contract_facture_comment: "Commentaires",
            add: "Ajouter",

            deliverables: 'Livrables',
            deliverable: 'Livrable',
            existing_deliverables: 'Livrables existants',
            deliverable_name: 'Nom du livrable',
            volet: "Volet",
            action: "Action",
            create_deliverable: "Créer un livrable",
            progress: "Avancement",

            contractors: 'Prestataires',
            contractor_name: "Nom du prestataire",
            create_contractor: "Créer un prestataire",
            logo: "Logo",
            set_logo: "Utiliser en tant que logo",

            accounts: 'Comptes',
            account_name: "Nom du compte d'imputation",
            create_account: "Créer un compte d'imputation",
            tags: 'Tags',
            tag_name: "Nom du tag",
            manage_tags: 'Gestion des tags',
            create_tag: "Créer un tag",

            projects: 'Projets',
            project_name: 'Nom du projet',
            create_project: 'Créer un projet',
            modify: 'Modifier',
            authorized_users: 'Utilisateurs autorisés',

            project_cig: 'Projet CIG',

            home : 'Home',
            admin : 'Admin',
            users : 'Utilisateurs',
            search : 'Recherche',
            create_user: 'Créer un utilisateur',
            authorized_projects: 'Projets autorisés',
            save: 'Sauvegarder',
            user_name: 'Prénom NOM',
            user_igg: 'IGG',
            user_mail: 'Mail',
            roles: 'Rôles',
            choose_team: 'Sélectionner une équipe'

		});

	$translateProvider.preferredLanguage('fr');

}

angular
	.module('fup')
	.config(config);
