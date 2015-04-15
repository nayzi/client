/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Vues
 */

/**
 * Contenu lors de la création d'un bon de commande pour RCD
 * @class DealUpdateOrder
 * @namespace App
 * @extends AbstractViews.ListView
 */
App.DealUpdateOrderView = App.AbstractViews.ListView.extend({
    templateName: 'DealUpdateOrder',
    classNames: ['order']
});