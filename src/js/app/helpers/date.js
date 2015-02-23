/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Helpers
 */

/**
 * Retourne une date formatée.
 * @method date
 * @for Ember.Handlebars.helpers
 * @param {String} date Date au format ISO-8601
 * @return {String} HTML String
 */
Ember.Handlebars.registerBoundHelper('date', function(date) {
	moment().locale('fr');
    return moment(date).format('llll');
});