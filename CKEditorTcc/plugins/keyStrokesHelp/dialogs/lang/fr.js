/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.plugins.setLang( 'keyStrokesHelp', 'fr', {
	title: 'Instructions d\'accessibilité',
	contents: 'Utilisez la touche L pour sauter une liste et je articles pour sauter les listes. Pour retourner un article, ou d\'une liste, appuyez sur la touche SHIFT en même temps. Pour fermer cette boîte de dialogue appuyez sur ESC.',
	undefined: 'indéfinie',
	legend: [
		{
		name: 'Groupe ', /*Ferramenta + ${comando}, comando virá dinamicamente da lista de grupos de ferramentas*/
		items: [
			{
			name: ' Commande  ', /*Comando + ${nomeComando}, nomeComando virá da lista de ferramentas*/
			legend: 'appuyer sur '
		},
		]
	}
	]
});
