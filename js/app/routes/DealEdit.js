/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Routes
 */

/**
 * Route pour l'édition d'une affaire
 * @class DealEditRoute
 * @namespace App
 * @extends Ember.Route
 * @uses Ember.SimpleAuth.AuthenticatedRouteMixin
 */
App.DealEditRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    actions: {
        willTransition: function() {
            this.controller.get('model').rollback();
        }
    },
    renderTemplate: function() {
        this.render('dealsForm');
        this.render('headerDealsEdit', {
            into: 'dealsForm',
            outlet: 'header'
        });
        this.render('dealsEditDetails', {
            into: 'dealsForm',
            outlet: 'content'
        });
    },
    setupController: function(controller, model) {
        this._super(controller, model);
        
        controller.validate();
    }
});