/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Vues
 */

/**
 * En-tête de l'affichage détaillé d'une affaire
 * @class HeaderDealView
 * @namespace App
 * @extends AbstractViews.HeaderView
 */
App.HeaderDealView = App.AbstractViews.HeaderView.extend({
    templateName: 'headerDeal',
    classNames: ['dealDetails'],
    /**
     * Bouton pour créer un bon de commande
     * @attribute buttonCreate
     * @extends JQ.ButtonView
     */
    buttonCreate: JQ.ButtonView.extend({
        icons: {
            primary: 'ui-icon-plusthick'
        },
        label: "Ajouter un BDC",
        text: false,
        click: function() {
            $('.dialog-create-order').dialog('open');
        }
    }),
    /**
     * Bouton pour éditer une affaire
     * @attribute buttonEdit
     * @extends JQ.ButtonView
     */
    buttonEdit: JQ.ButtonView.extend({
        icons: {
            primary: 'ui-icon-pencil'
        },
        label: "Modifier l'affaire",
        text: false,
        click: function() {
            this.get('controller').send('edit');
        }
    }),
    /**
     * Pop-in pour rentrer les premières informations nécessaires à la création
     * d'un bon de commande
     * @attribute dialog
     * @extends JQ.DialogView
     */
    dialog: JQ.DialogView.extend({
        init: function() {
            this._super();
            this.set('controller', this.get('controller.controllers.popInDeal'));
            this.get('controller.isFormValid');
            this.addObserver('controller.isFormValid', function(sender, key) {
                this.$().dialog('option', 'buttons', [
                    {
                        text: 'Ajouter',
                        click: function() {
                            sender.get('controller').send('submitForm');
                        },
                        disabled: !this.get(key)
                    }, {
                        text: 'Annuler',
                        click: function() {
                            $(this).dialog("close");
                        }
                    }
                ]);
            });
        },
        classNames: ['dialog-create-order'],
        resizable: false,
        show: {
            effect: "blind",
            duration: 500
        },
        hide: {
            effect: "blind",
            duration: 500
        },
        beforeClose: function() {
            this.get('controller').send('resetForm');
        },
        autoOpen: false,
        modal: true,
        width: 400,
        title: 'Ajouter un bon de commande',
        buttons: [
            {
                text: 'Ajouter',
                disabled: true
            }, {
                text: 'Annuler',
                click: function() {
                    $(this).dialog("close");
                }
            }
        ]
    }),
    /**
     * Défini la vue utilisée pour afficher les détails de l'affaire
     * @attribute dealDetails
     * @uses App.DealDetailsView
     */
    dealDetails: App.AbstractViews.DealDetailsView
});