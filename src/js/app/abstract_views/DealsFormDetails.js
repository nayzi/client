/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module Vues
 * @submodule Vues abstraites
 */

/**
 * Affiche le formulaire d'une affaire
 * @class DealsFormDetailsView
 * @namespace AbstractViews
 * @extends Ember.View
 */
App.AbstractViews.DealsFormDetailsView = Ember.View.extend({
    templateName: 'dealsFormDetails',
    classNames: ['form', 'deals'],
    /**
     * Bouton pour sauvegarder une affaire. Envoie au ```Controller``` le signal pour
     * lancer la sauvegarde de l'affaire.
     * @attribute buttonSave
     * @extends JQ.ButtonView
     */
    buttonSave: JQ.ButtonView.extend({
        label: "Sauvegarder"
    }),
    /**
     * Bouton pour annuler le formulaire. Envoie au ```Controller``` le signal pour
     * annuler l'action en cours
     * @attribute buttonCancel
     * @extends JQ.ButtonView
     */
    buttonCancel: JQ.ButtonView.extend({
        click: function() {
            this.get('controller').send('cancel');
        },
        label: "Annuler"
    })
});
