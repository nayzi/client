/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Vues
 */

/**
 * Affiche le formulaire de création d'une affaire
 * @class DealsCreateDetailsView
 * @namespace App
 * @extends App.AbstractViews.DealsFormDetailsView
 */
App.DealsCreateDetailsView = App.AbstractViews.DealsFormDetailsView.extend({
    buttonSave: JQ.ButtonView.extend({
        click: function() {
            this.get('controller').send('submitForm');
        },
        label: "Créer l'affaire"
    })
});
