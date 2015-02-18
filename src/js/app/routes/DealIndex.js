/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Routes
 */

/**
 * Route pour la gestion d'une affaire
 * @class DealIndexRoute
 * @namespace App
 * @extends Ember.Route
 * @uses Ember.SimpleAuth.AuthenticatedRouteMixin
 */
App.DealIndexRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    renderTemplate: function() {
        this.render('dealIndex');
        this.render('headerDeal', {
            into: 'dealIndex',
            outlet: 'header'
        });
        
        this.render('dealDetails', {
            into: 'headerDeal',
            outlet: 'details'
        });
        
        this.render('listOrders', {
            into: 'dealIndex',
            outlet: 'content'
        });
    }
});