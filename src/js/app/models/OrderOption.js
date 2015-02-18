/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.OrderOption"}}{{/crossLink}} est un objet qui stock les
 * informations relatives à une personnalisation d'un bon de commande. Le système
 * crée automatiquement les instances de cet objet, il n'est donc pas nécessaire
 * de créer manuellement des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store/createRecord:method"}}{{/clink}}
 * 
 * @class OrderOption
 * @namespace App
 * @extends App.AbstractModels.ItemOption
 */
App.OrderOption = App.AbstractModels.ItemOption.extend({
    /**
     * Bon de commande liée à cette option
     * @property order
     * @type {App.Order}
     */
    order: DS.belongsTo('order', {async: true})
});