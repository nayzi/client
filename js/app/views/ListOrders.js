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
 * @class ListOrdersView
 * @namespace App
 * @extends AbstractViews.ListView
 */
App.ListOrdersView = App.AbstractViews.ListView.extend({
    /*
     * @property templateName
     * @default listOrders
     */
    templateName: 'listOrders',
    /*
     * L'élément root aura au moins la classe CSS 'orders'
     * @property classNames
     * @default ['orders']
     */
    classNames: ['orders']
});