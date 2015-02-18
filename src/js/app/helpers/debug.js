/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

Ember.Handlebars.registerBoundHelper('debug', function(data) {
    console.log('Debug: ' + data);
    
    if (Ember.isEmpty(data) && !Ember.isArray(data) && typeof data !== "object") return data;
    else if (Ember.isArray(data)) return data.valueOf();
    else if (typeof data === "object") return data.valueOf();
    
    return data.toString();
});