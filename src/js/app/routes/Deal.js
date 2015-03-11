/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Routes
 */

/**
 * Route racine pour la gestion d'une affaire
 * @class DealRoute
 * @namespace App
 * @extends Ember.Route
 * @uses Ember.SimpleAuth.AuthenticatedRouteMixin
 */
App.DealRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    model: function(params) {
    	this.store.unloadAll('deal');
        return this.store.find('deal', params.deal_id);
    },
    afterModel: function(model) {
    	
        return model.get('orders');
    }
});