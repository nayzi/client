/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Vues
 */

/**
 * En-tête de la modification d'une affaire
 * @class HeaderDealsEditView
 * @namespace App
 * @extends AbstractViews.HeaderView
 */
App.HeaderDealsEditView = App.AbstractViews.HeaderView.extend({
    templateName: 'headerDealsForm',
    title: Ember.computed(function() {
        return new Ember.Handlebars.SafeString('<a href="#/deals/deal/' + this.get('controller.id') + '">Affaire n°' + this.get('controller.number') + '</a> - Modification');
    })
});