/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

(function() {
	
	var template = '<a id="{id}"' +
		' class="cke_button cke_button__{name} cke_button_{state} {cls}"' +
		( CKEDITOR.env.gecko && CKEDITOR.env.version >= 10900 && !CKEDITOR.env.hc ? '' : '" href="javascript:void(\'{titleJs}\')"' ) +
		' title="{title}"' + //exibido quando deixamos o mouse sobre o botão , é um atributo de <a
		' tabindex="-1"' +
		' hidefocus="true"' +
		' role="button"' +

//ADICIONAR MAIS UM ARIA-LABELLEBY ESPECÍFICO PARA A TECLA DE ATAHO		

		' aria-haspopup="{hasArrow}"';

	// Some browsers don't cancel key events in the keydown but in the
	// keypress.
	// TODO: Check if really needed for Gecko+Mac.
	if ( CKEDITOR.env.opera || ( CKEDITOR.env.gecko && CKEDITOR.env.mac ) )
		template += ' onkeypress="return false;"';

/* *****************************************************************************************
 * Aqui é implementado o aria-pressed quando o botão recebe foco
 *******************************************************************************************/
	// With Firefox, we need to force the button to redraw, otherwise it
	// will remain in the focus state.
	if ( CKEDITOR.env.gecko )
		template += ' onblur="this.style.cssText = this.style.cssText;"';

	template += ' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);"' +
		' onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' +
		' onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);" ' +
		( CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : 'onclick' ) + // #188
			'="CKEDITOR.tools.callFunction({clickFn},this);return false;">' +
		'<span class="cke_button_icon cke_button__{iconName}_icon" style="{style}" ';
		
		template += 'aria-labelledby="{id}_label"';

	template += '>&nbsp;</span>' +
		'<span id="{id}_label" class="cke_voice_label ">{stroke}'+'</span>'							 + //quando a ferramenta recebe foco é lido o nome da ferramenta-->

		'{arrowHtml}' +
		'</a>';
//cke_button__{name}_label utilizado quando for sorce= .cke_button_source_label
	var templateArrow = '<span class="cke_button_arrow">' +
		// BLACK DOWN-POINTING TRIANGLE
	( CKEDITOR.env.hc ? '&#9660;' : '' ) +
		'</span>';

	var btnArrowTpl = CKEDITOR.addTemplate( 'buttonArrow', templateArrow ),
		btnTpl = CKEDITOR.addTemplate( 'button', template );

	CKEDITOR.plugins.add( 'button', {
		beforeInit: function( editor ) {
			editor.ui.addHandler( CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler );
		}
	});

	/**
	 * Button UI element.
	 *
	 * @readonly
	 * @property {String} [='button']
	 * @member CKEDITOR
	 */
	CKEDITOR.UI_BUTTON = 'button';

	/**
	 * Represents a button UI element. This class should not be called directly. To
	 * create new buttons use {@link CKEDITOR.ui#addButton} instead.
	 *
	 * @class
	 * @constructor Creates a button class instance.
	 * @param {Object} definition The button definition.
	 */
	CKEDITOR.ui.button = function( definition ) {
		CKEDITOR.tools.extend( this, definition,
		// Set defaults.
		{
			title: definition.label,
			click: definition.click ||
			function( editor ) {
				editor.execCommand( definition.command );
			}
		});

		this._ = {};
	};

	/**
	 * Represents button handler object.
	 *
	 * @class
	 * @singleton
	 * @extends CKEDITOR.ui.handlerDefinition
	 */
	CKEDITOR.ui.button.handler = {
		/**
		 * Transforms a button definition in a {@link CKEDITOR.ui.button} instance.
		 *
		 * @member CKEDITOR.ui.button.handler
		 * @param {Object} definition
		 * @returns {CKEDITOR.ui.button}
		 */
		create: function( definition ) {
			return new CKEDITOR.ui.button( definition );
		}
	};

	/** @class CKEDITOR.ui.button */
	CKEDITOR.ui.button.prototype = {
		/**
		 * Renders the button.
		 *
		 * @param {CKEDITOR.editor} editor The editor instance which this button is
		 * to be used by.
		 * @param {Array} output The output array to which append the HTML relative
		 * to this button.
		 */
		render: function( editor, output ) {
			var env = CKEDITOR.env,
				id = this._.id = CKEDITOR.tools.getNextId(),
				stateName = '',
				command = this.command,
				// Get the command name.
				clickFn;

			this._.editor = editor;

			var instance = {
				id: id,
				button: this,
				editor: editor,
				focus: function() {
					var element = CKEDITOR.document.getById( id );
					element.focus();
				},
				execute: function() {
					this.button.click( editor );
				},
				attach: function( editor ) {
					this.button.attach( editor );
				}
			};

			var keydownFn = CKEDITOR.tools.addFunction( function( ev ) {
				if ( instance.onkey ) {
					ev = new CKEDITOR.dom.event( ev );
					return ( instance.onkey( instance, ev.getKeystroke() ) !== false );
				}
			});

			var focusFn = CKEDITOR.tools.addFunction( function( ev ) {
				var retVal;

				if ( instance.onfocus )
					retVal = ( instance.onfocus( instance, new CKEDITOR.dom.event( ev ) ) !== false );

				// FF2: prevent focus event been bubbled up to editor container, which caused unexpected editor focus.
				if ( CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 )
					ev.preventBubble();
				return retVal;
			});

			var selLocked = 0;

			var mousedownFn = CKEDITOR.tools.addFunction( function() {
				// Opera: lock to prevent loosing editable text selection when clicking on button.
				if ( CKEDITOR.env.opera ) {
					var edt = editor.editable();
					if ( edt.isInline() && edt.hasFocus ) {
						editor.lockSelection();
						selLocked = 1;
					}
				}
			});

			instance.clickFn = clickFn = CKEDITOR.tools.addFunction( function() {

				// Restore locked selection in Opera.
				if ( selLocked ) {
					editor.unlockSelection( 1 );
					selLocked = 0;
				}

				instance.execute();
			});


			// Indicate a mode sensitive button.
			if ( this.modes ) {
				var modeStates = {};

				function updateState() {
					// "this" is a CKEDITOR.ui.button instance.

					var mode = editor.mode;

					if ( mode ) {
						// Restore saved button state.
						var state = this.modes[ mode ] ? modeStates[ mode ] != undefined ? modeStates[ mode ] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;

						this.setState( editor.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : state );
					}
				}

				editor.on( 'beforeModeUnload', function() {
					if ( editor.mode && this._.state != CKEDITOR.TRISTATE_DISABLED )
						modeStates[ editor.mode ] = this._.state;
				}, this );

				editor.on( 'mode', updateState, this );

				// If this button is sensitive to readOnly state, update it accordingly.
				!this.readOnly && editor.on( 'readOnly', updateState, this );
			} else if ( command ) {
				// Get the command instance.
				command = editor.getCommand( command );

				if ( command ) {
					command.on( 'state', function() {
						this.setState( command.state );
					}, this );

					stateName += ( command.state == CKEDITOR.TRISTATE_ON ? 'on' : command.state == CKEDITOR.TRISTATE_DISABLED ? 'disabled' : 'off' );
				}
			}

			// For button that has text-direction awareness on selection path.
			if ( this.directional ) {
				editor.on( 'contentDirChanged', function( evt ) {
					var el = CKEDITOR.document.getById( this._.id ),
						icon = el.getFirst();

					var pathDir = evt.data;

					// Make a minor direction change to become style-able for the skin icon.
					if ( pathDir !=  editor.lang.dir )
						el.addClass( 'cke_' + pathDir );
					else
						el.removeClass( 'cke_ltr' ).removeClass( 'cke_rtl' );

					// Inline style update for the plugin icon.
					icon.setAttribute( 'style', CKEDITOR.skin.getIconStyle( iconName, pathDir == 'rtl', this.icon, this.iconOffset ) );
				}, this );
			}

			if ( !command )
				stateName += 'off';

			var name = this.name || this.command,
				iconName = name;

			// Check if we're pointing to an icon defined by another command. (#9555)
			if ( this.icon && !( /\./ ).test( this.icon ) ) {
				iconName = this.icon;
				this.icon = null;
			}
			
			









	// CharCode <-> KeyChar.
	var keyMap = {
		8: "BACKSPACE",
		9: "TAB",
		13: "ENTER",
		16: "SHIFT",
		17: "CTRL",
		18: "ALT",
		19: "PAUSE",
		20: "CAPSLOCK",
		27: "ESCAPE",
		33: "PAGE UP",
		34: "PAGE DOWN",
		35: "END",
		36: "HOME",
		37: "LEFT ARROW",
		38: "UP ARROW",
		39: "RIGHT ARROW",
		40: "DOWN ARROW",
		45: "INSERT",
		46: "DELETE",
		91: "LEFT WINDOW KEY",
		92: "RIGHT WINDOW KEY",
		93: "SELECT KEY",
		96: "NUMPAD  0",
		97: "NUMPAD  1",
		98: "NUMPAD  2",
		99: "NUMPAD  3",
		100: "NUMPAD  4",
		101: "NUMPAD  5",
		102: "NUMPAD  6",
		103: "NUMPAD  7",
		104: "NUMPAD  8",
		105: "NUMPAD  9",
		106: "MULTIPLY",
		107: "ADD",
		109: "SUBTRACT",
		110: "DECIMAL POINT",
		111: "DIVIDE",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NUM LOCK",
		145: "SCROLL LOCK",
		186: "SEMI-COLON",
		187: "EQUAL SIGN",
		188: "COMMA",
		189: "DASH",
		190: "PERIOD",
		191: "FORWARD SLASH",
		192: "GRAVE ACCENT",
		219: "OPEN BRACKET",
		220: "BACK SLASH",
		221: "CLOSE BRAKET",
		222: "SINGLE QUOTE"
	};

// Modifier keys override.
keyMap[ CKEDITOR.ALT ] = 'ALT';
keyMap[ CKEDITOR.SHIFT ] = 'SHIFT';
keyMap[ CKEDITOR.CTRL ] = 'CTRL';

// Sort in desc.
var modifiers = [ CKEDITOR.ALT, CKEDITOR.SHIFT, CKEDITOR.CTRL ];

				function representKeyStroke( keystroke ) {
					var quotient, modifier,
						presentation = [];

					for ( var i = 0; i < modifiers.length; i++ ) {
						modifier = modifiers[ i ];
						quotient = keystroke / modifiers[ i ];
						if ( quotient > 1 && quotient <= 2 ) {
							keystroke -= modifier;
							presentation.push( keyMap[ modifier ] );
						}
					}

					presentation.push( keyMap[ keystroke ] || String.fromCharCode( keystroke ) );
					return presentation.join( '+' );
				}

			
var keystrokesByCode = editor.keystrokeHandler.keystrokes,
keystrokesByName = {};

for ( var i in keystrokesByCode )
keystrokesByName[ keystrokesByCode[ i ] ] = i;
//
codigo = keystrokesByName[this.name]
//                          
//alert('='+representKeyStroke(codigo)+'=')
//alert(representKeyStroke(codigo).length)
			var params = {
				id: id,
				name: name,
				iconName: iconName,
				label: this.label,
			stroke : representKeyStroke(codigo).length > 1? ', atalho :' + representKeyStroke(codigo) +'.': '',//sadiciona a tecla de atalho do botão no aria; quando recebe foco vai ler isso
			strokeKey : representKeyStroke(codigo).length > 1? representKeyStroke(codigo) : '' ,//para ser exibido no quando deixa o mous sobre o botão
				cls: this.className || '',
				state: stateName,
				title: this.title,
				titleJs: env.gecko && env.version >= 10900 && !env.hc ? '' : ( this.title || '' ).replace( "'", '' ),
				hasArrow: this.hasArrow ? 'true' : 'false',
				keydownFn: keydownFn,
				mousedownFn: mousedownFn,
				focusFn: focusFn,
				clickFn: clickFn,
				style: CKEDITOR.skin.getIconStyle( iconName, ( editor.lang.dir == 'rtl' ), this.icon, this.iconOffset ),
				arrowHtml: this.hasArrow ? btnArrowTpl.output() : ''
			};

			btnTpl.output( params, output );

			if ( this.onRender )
				this.onRender();

			return instance;
		},

		/**
		 * @todo
		 */
		setState: function( state ) {
			if ( this._.state == state )
				return false;

			this._.state = state;

			var element = CKEDITOR.document.getById( this._.id );

			if ( element ) {
				element.setState( state, 'cke_button' );

				state == CKEDITOR.TRISTATE_DISABLED ?
					element.setAttribute( 'aria-disabled', true ) :
					element.removeAttribute( 'aria-disabled' );

				state == CKEDITOR.TRISTATE_ON ?
					element.setAttribute( 'aria-pressed', true ) :
					element.removeAttribute( 'aria-pressed' );

				return true;
			} else
				return false;
		},

		/**
		 * Returns this button's {@link CKEDITOR.feature} instance.
		 *
		 * It may be this button instance if it has at least one of
		 * `allowedContent` and `requiredContent` properties. Otherwise,
		 * if command is bound to this button by `command` property, then
		 * that command will be returned.
		 *
		 * This method implements {@link CKEDITOR.feature#toFeature} interface method.
		 *
		 * @since 4.1
		 * @param {CKEDITOR.editor} Editor instance.
		 * @returns {CKEDITOR.feature} The feature.
		 */
		toFeature: function( editor ) {
			if ( this._.feature )
				return this._.feature;

			var feature = this;

			// If button isn't a feature, return command if is bound.
			if ( !this.allowedContent && !this.requiredContent && this.command )
				feature = editor.getCommand( this.command ) || feature;

			return this._.feature = feature;
		}
	};

	/**
	 * Adds a button definition to the UI elements list.
	 *
	 *		editorInstance.ui.addButton( 'MyBold', {
	 *			label: 'My Bold',
	 *			command: 'bold',
	 *			toolbar: 'basicstyles,1'
	 *		} );
	 *
	 * @member CKEDITOR.ui
	 * @param {String} name The button name.
	 * @param {Object} definition The button definition.
	 */
	CKEDITOR.ui.prototype.addButton = function( name, definition ) {
		this.add( name, CKEDITOR.UI_BUTTON, definition );
	};

})();
