/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Vues
 */

/**
 * En-tête de la gestion des bons de commande
 * @class HeaderDealCreateView
 * @namespace App
 * @extends AbstractViews.HeaderView
 */
App.HeaderDealCreateView = App.AbstractViews.HeaderView.extend({
    templateName: "headerDealCreate",
    dialog: JQ.DialogView.extend({
        classNames: ["dialog-update-order"],
        resizable: !1,
        show: {
            effect: "blind",
            duration: 10
        },
        hide: {
            effect: "blind",
            duration: 500
        },
        autoOpen: !1,
        modal: !0,
        width: 400,
        title: "Informations",
        text: 'jijijij',
        init: function() {
            var a = this;

            this.set("buttons", [{
                text: "Ok",
                click: function() {

                    $(this).dialog("close")
                }
            }]);
            return this._super()
        }
    }),
    fullscreenButton: JQ.ButtonView.extend({
        label: "Plein \u00e9cran (F11)",
        icons: {
            primary: "ui-icon-newwin"
        },
        text: !1,
        click: function() {
            document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() :
                document.webkitExitFullscreen && document.webkitExitFullscreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.msRequestFullscreen ? document.documentElement.msRequestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
    }),
    addConveyorButton: JQ.ButtonView.extend({
        label: "Ajouter un convoyeur",
        icons: {
            primary: "ui-icon-plusthick"
        },
        text: !1,
        click: function() {
            this.get("controller").send("addConveyor")
        }
    }),
    saveButton: JQ.ButtonView.extend({
        label: "Sauvegarder",
        icons: {
            primary: "ui-icon-disk"
        },
        text: !1,
        click: function() {
            this.get("controller").send("submitForm")
        }
    })
});