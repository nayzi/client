/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Routes
 */

/**
 * Route pour la création d'une affaire
 * @class DealsCreateDealRoute
 * @namespace App
 * @extends Ember.Route
 * @uses Ember.SimpleAuth.AuthenticatedRouteMixin
 */
App.DealsCreateDealRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    actions: {
        willTransition: function() {
            this.controller.send('resetForm');
            this.controller.get('model').rollback();
        }
    },
    model: function() {
        return this.store.createRecord('deal');
    },
    renderTemplate: function() {
        this.render('dealsForm');
        this.render('headerDealsCreate', {
            into: 'dealsForm',
            outlet: 'header'
        });
        this.render('dealsCreateDetails', {
            into: 'dealsForm',
            outlet: 'content'
        });
    }
});