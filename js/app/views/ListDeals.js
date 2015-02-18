/* 
 * @license PASC Client - Fives Cinetic
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Vues
 */

/**
 * 
 * 
 * @class ListDealsView
 * @namespace App
 * @extends AbstractViews.ListView
 */
App.ListDealsView = App.AbstractViews.ListView.extend({
    templateName: 'listDeals',
    classNames: ['deals']
});