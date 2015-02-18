/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Routes
 */

/**
 * Route pour la gestion des affaires
 * @class DealsIndexRoute
 * @namespace App
 * @extends Ember.Route
 * @uses Ember.SimpleAuth.AuthenticatedRouteMixin
 */
App.DealsIndexRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    model: function() {
        // Retourne la liste de toutes les affaires
        return this.store.find('deal');
    },
    renderTemplate: function() {
        this.render('dealsIndex');
        this.render('headerDeals', {
            into: 'dealsIndex',
            outlet: 'header'
        });
        this.render('listDeals', {
            into: 'dealsIndex',
            outlet: 'content'
        });
    }
});