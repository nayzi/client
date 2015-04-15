/* 
 * @license PASC Client - Fives Cinetic
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Vues
 */

/**
 * 
 * 
 * @class HeaderDealsView
 * @namespace App
 * @extends AbstractViews.HeaderView
 */
App.HeaderDealsView = App.AbstractViews.HeaderView.extend({
    templateName: "headerDeals",
        
        dialog: JQ.DialogView.extend({
        classNames: ["dialog-delete-deal"],
            resizable: !1,
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "blind",
                duration: 500
            },
            autoOpen: !1,
            modal: !0,
            width: 400,
            title: "Confirmation",
            init: function() {
                var a = this;
                this.set("buttons", [{
                    text: "Oui",
                    click: function() {
                        console.log(a.get("controller.controllers.popInDeals.jojo"));
                        console.log('cccccco');
                        console.log(a);
                        a.get("parentView.controller").send("delete",a.get("controller.controllers.popInDeals.jojo"));
                        $(this).dialog("close")
                    }
                }, {
                    text: "Non",
                    click: function() {
                        $(this).dialog("close")
                    }
                }]);
                return this._super()
            }
        }),
        
        
    
 
    buttonCreate: JQ.ButtonView.extend({
        icons: {
            primary: "ui-icon-plusthick"
        },
        text: !1,
        label: "Cr\u00e9er une affaire",
        click: function() {
            this.get("controller").send("create")
        }
    })
});