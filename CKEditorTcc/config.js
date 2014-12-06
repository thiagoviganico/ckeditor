﻿﻿/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {

	

// ESTE TESTE NÃO PASSOU, MESMO CASO DO SEGUINTE ONDE NÃO POSSUI GRUPOS
//config.toolbar_Basic = [
//	[ 'Source', '-', 'Bold', 'Italic' ]
//];
//config.toolbar = 'Basic';	 		
//	 		



// ESTE TESTE ONDE NÃO POSSUI GRUPOS NÃO ESTÁ FUNCIONANDO
//	CKEDITOR.config.toolbar = [
//['Styles','Format','Font','FontSize'],
//'/',
//['Bold','Italic','Underline','StrikeThrough','-','Undo','Redo','-','Cut','Copy','Paste','Find','Replace','-','Outdent','Indent','-','Print'],
//'/',
//['NumberedList','BulletedList','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
//['Image','Table','-','Link','Flash','Smiley','TextColor','BGColor','Source']
//] ;
////	
	
	//TESTE CUSOMIZANDO A BARRA DE FERRAMENTAS PARA VER SE A LISTA DE TECLAS DE ATALHO LISTA CORRETAMENTE
//	 			{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
//	 			{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
//	 			{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ] },
//	 			{ name: 'insert' },
//	 			{ name: 'styles' },
//	 			{ name: 'colors' },
//	 			{ name: 'tools' },
//	 			{ name: 'others' },
//CKEDITOR.config.toolbarGroups = [
//	 		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
//	 			{ name: 'links' },
//	 			{ name: 'forms' },
//	 			'/',
//	 			{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
//	 			'/',
//	 			{ name: 'about' }
//	 		];
	// Define changes to default configuration here. For example:
//config.language = 'fr';
	// config.uiColor = '#AADC6E';
	// %REMOVE_START%
	config.plugins =
		'keyStrokesHelp,' +
		'about,' +
		'a11yhelp,' +
		'basicstyles,' +
		'bidi,' +
		'blockquote,' +
		'clipboard,' +
		'colorbutton,' +
		'colordialog,' +
		'contextmenu,' +
		'dialogadvtab,' +
		'div,' +
		'elementspath,' +
		'enterkey,' +
		'entities,' +
		'filebrowser,'+
		'find,' +
		'flash,' +
		'floatingspace,' +
		'font,' +
		'format,' +
		'forms,' +
		'horizontalrule,' +
		'htmlwriter,' +
		'image,' +
		'iframe,' +
		'indentlist,' +
		'indentblock,' +
		'justify,' +
		'link,' +
		'list,' +
		'liststyle,' +
		'magicline,' +
		'maximize,' +
		'newpage,' +
		'pagebreak,' +
		'pastefromword,' +
		'pastetext,' +
		'preview,' +
		'print,' +
		'removeformat,' +
		'resize,' +
		'save,' +
		'selectall,' +
		'showblocks,' +
		'showborders,' +
		'smiley,' +
		'sourcearea,' +
		'specialchar,' +
		'stylescombo,' +
		'tab,' +
		'table,' +
		'tabletools,' +
		'templates,' +
		'toolbar,' +
		'undo,' +
		'wysiwygarea';
	// %REMOVE_END%
};

// %LEAVE_UNMINIFIED% %REMOVE_LINE%
