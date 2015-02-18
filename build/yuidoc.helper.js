/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

module.exports = {
    clink: function(url) {
        //Helper function to make HTML link from different arguments
        var makelink = function(url, name, title) {
            return '<a href="' + url + '"' + (title !== undefined ? ' title="' + title +
                '" class="crosslink external"' : '') + '>' + name + '</a>';
        };

        // Test if we gave an URL as a parameter
        if (url.slice(0, 4) === 'http') {
            return makelink(url, url);
            // Test if we are trying to reference an Ember-data class
        } else if (url.slice(0, 2) === 'DS') {
            var type = undefined;
            var name;
            if (url.indexOf('/') !== -1) {
                var sub = url.split('/')[1];
                type = sub.split(':')[1];
                name = sub.split(':')[0];
                url = url.split('/')[0];

                return makelink('http://emberjs.com/api/data/classes/' + url + '.html#' + type + '_' + name, url, url + ' (' + type + ' ' + name + ')');
            } else {
                return makelink('http://emberjs.com/api/data/classes/' + url + '.html', url);
            }
            // Test if we are trying to reference an Ember class
        } else if (url.slice(0, 5) === 'Ember') {
            var type = undefined;
            var name;
            if (url.indexOf('/') !== -1) {
                var sub = url.split('/')[1];
                type = sub.split(':')[1];
                name = sub.split(':')[0];
                url = url.split('/')[0];

                return makelink('http://emberjs.com/api/classes/' + url + '.html#' + type + '_' + name, url, url + ' (' + type + ' ' + name + ')');
            } else {
                return makelink('http://emberjs.com/api/classes/' + url + '.html', url);
            }
        }
    }
};