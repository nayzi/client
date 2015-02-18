/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Vues
 */

/**
 * Affiche le formulaire de modification d'une affaire
 * @class DealsEditDetailsView
 * @namespace App
 * @extends App.AbstractViews.DealsFormDetailsView
 */
App.DealsEditDetailsView = App.AbstractViews.DealsFormDetailsView.extend({
    buttonSave: JQ.ButtonView.extend({
        click: function() {
            this.get('controller').send('submitForm');
        },
        label: "Modifier l'affaire"
    }),
    didInsertElement: function() {
        this.$('input[name=number]').attr('disabled', 'disabled');
        this.$('input[name=eg]').attr('disabled', 'disabled');
    }
});