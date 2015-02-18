/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Routes
 */

/**
 * Route racine pour la gestion des affaires
 * @class DealsRoute
 * @namespace App
 * @extends Ember.Route
 * @uses Ember.SimpleAuth.AuthenticatedRouteMixin
 */
App.DealsRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin);