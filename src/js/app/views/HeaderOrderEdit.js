/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Vues
 */

/**
 * En-tête de l'édition d'un bon de commande
 * @class HeaderOrderEditView
 * @namespace App
 * @extends AbstractViews.HeaderView
 */
App.HeaderOrderEditView = App.AbstractViews.HeaderView.extend({
    templateName: 'headerOrderEdit',
    fullscreenButton: JQ.ButtonView.extend({
        label: 'Plein écran (F11)',
        icons: {
            primary: 'ui-icon-newwin'
        },
        text: false,
        click: function() {
            if (!document.fullscreenElement && // alternative standard method
                !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
    }),
    addConveyorButton: JQ.ButtonView.extend({
        label: 'Ajouter un convoyeur',
        icons: {
            primary: 'ui-icon-plusthick'
        },
        text: false,
        click: function() {
            this.get('controller').send('addConveyor');
        }
    }),
    saveButton: JQ.ButtonView.extend({
        label: 'Sauvegarder',
        icons: {
            primary: 'ui-icon-disk'
        },
        text: false,
        click: function() {
            this.get('controller').send('submitForm');
        }
    })
});