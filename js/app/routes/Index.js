/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Routes
 */

/**
 * Route racine de l'application.
 * @class IndexRoute
 * @namespace App
 * @extends Ember.Route
 */
App.IndexRoute = Ember.Route.extend({
    redirect: function() {
        // On redirige directement sur la page d'accueil
        this.transitionTo('deals');
    }
});