/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Routes
 */

/**
 * Route pour le login
 * @class LoginRoute
 * @namespace App
 * @extends Ember.Route
 */
App.LoginRoute = Ember.Route.extend({
    // clear a potentially stale error message from previous login attempts
    setupController: function(controller, model) {
        controller.set('errorMessage', null);
    },
    actions: {
        // display an error when authentication fails
        sessionAuthenticationFailed: function(errors) {
            this.controller.send('displayErrors', errors);
        }
    }
});