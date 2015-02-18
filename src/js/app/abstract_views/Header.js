/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module Vues
 * @submodule Vues abstraites
 */

/**
 * Principe de base d'un en-tête classique (comprenant un champ de recherche)
 * 
 * @class HeaderView
 * @namespace AbstractViews
 * @extends Ember.View
 */
App.AbstractViews.HeaderView = Ember.View.extend({
    tagName: 'header',
    classNames: ['appHeader'],
    didInsertElement: function() {
        this._super();
        this.$('.appHeader input[type="text"]').focus();
    },
    buttonLogout: JQ.ButtonView.extend({
        label: "Déconnexion",
        text: true,
        click: function() {
            this.get('controller').send('invalidateSession');
        }
    })
});