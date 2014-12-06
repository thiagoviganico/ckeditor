CKEDITOR.dialog.add( 'abbrDialog', function ( editor ) {
	
//var definition = CKEDITOR.plugins.get( 'toolbar' );
//mostra como listar os grupos com minha alteração em plugin.toolbar
//alert(definition.getToolbarGroups(editor));
//alert(editor.toolbox.toolbars[0].items[0].allowed);
//alert(editor.toolbox.toolbars[0].id);
//alert(editor.ui.buttons)


/**
 * Obtém todas as ferramentas registradas pelos seus respectivos plugins.
 * Pode ser utilizado para obter de que plugin a ferramenta pertence e então acessar o lang para traduzir o nome
 * 
 * 
 * FAZER FAZER FAZER FAZER FAZER FAZER FAZER FAZER
 * 
 * FAZER UM MÉTODO QUE RECEBE A FERRAMENTA(BOLD, NEGRITO) E PROCURE DENTRO DESTA LISTA DE GRUPOS(PLUGINS) NO CÓDIGO ABAIXO
 * 
 * 
 * 
 */
	
			var groups = {},
				itemName, item, itemToolbar, group, order;
			for ( itemName in editor.ui.items ) {
				item = editor.ui.items[ itemName ];
				itemToolbar = item.toolbar || 'others';
				if ( itemToolbar ) {
					// Break the toolbar property into its parts: "group_name[,order]".
					itemToolbar = itemToolbar.split( ',' );
					group = itemToolbar[ 0 ];
					order = parseInt( itemToolbar[ 1 ] || -1, 10 );

					// Initialize the group, if necessary.
					groups[ group ] || ( groups[ group ] = [] );

					// Push the data used to build the toolbar later.
					//ItemName=bold,italic... order: numero que representa a ordem dos itens
					groups[ group ].push( { name: itemName, order: order} );
					//group-> não é igual ao nome do plugin, mas pode ser feito um mapeamento para buscar o lang do plug
//					alert('group: '+ group + '  item: ' +itemName)
				}
			}


//Estrutura da barra de ferramentas, grupos e itens.
//


	return {
		/**
		 * Tentar criar duas linhas com as teclas de atalho b,i,u.
		 * Utilizar com nvda.
		 */
		title: 'Teclas de atalho',
	    minWidth: 600,
	    minHeight: 500,
		
	    contents: [
				{
					id: 'hotkeyHelp',
					label: 'Rótulo',
					title: 'Titulo',
					elements: [
					        {
					        	type: 'html',
								html: '<div id="myDiv">Sample <b>text</b>.</div><div id="otherId">Another div.</div>'
					        }
					]
				}
	            
		           
		           
		

		
		]
	};
});