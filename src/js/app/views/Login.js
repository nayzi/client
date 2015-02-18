/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Vues
 */

/**
 * Affiche le formulaire d'identification
 * @class LoginView
 * @namespace App
 * @extends Ember.View
 */
App.LoginView = Ember.View.extend({
    classNames: ['form', 'login'],
    /**
     * Bouton pour s'identifier. Envoie au ```Controller``` le signal pour
     * s'identifier
     * @attribute buttonCreate
     * @extends JQ.ButtonView
     */
    buttonLogin: JQ.ButtonView.extend({
        click: function() {
            this.get('controller').send('submitForm');
        },
        label: "Connexion"
    }),
    /**
     * Bouton pour réinitialiser le formulaire. Envoie au ```Controller``` le
     * signal pour réinitialiser le formulaire.
     * @attribute buttonCancel
     * @extends JQ.ButtonView
     */
    buttonCancel: JQ.ButtonView.extend({
        click: function() {
            this.get('controller').send('cancel');
        },
        label: "Réninitialiser"
    })
});
