/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Helpers
 */

/**
 * Helper de type `if`.
 * Vrai si `value % mod === 0` et faux sinon.
 * @method ifMod
 * @for Ember.Handlebars.helpers
 * @param {Integer} value Nombre sur lequel appliquer la division euclidienne
 * @param {Hash} options
 * @return {String} HTML String
 */
Ember.Handlebars.registerBoundHelper('ifMod', function(value, options) {
    Ember.assert("You must pass exactly two arguments to the ifMod helper", arguments.length === 2);
    Ember.assert("You must pass a mod attribute to the ifMod helper", options.hash['mod']);
    Ember.assert("You must pass a valid attribute to the ifMod helper", options.hash['valid']);
    
    options.hash['skipFirst'] = options.hash['skipFirst'] || false;
    
    if (value % options.hash['mod'] === 0 && !options.hash['skipFirst']) {
        return new Ember.Handlebars.SafeString(options.hash['valid']);
    } else if (options.hash['skipFirst']) {
        return '';
    } else {
        return options.hash['unvalid'] ? new Ember.Handlebars.SafeString(options.hash['unvalid']) : '';
    }
});