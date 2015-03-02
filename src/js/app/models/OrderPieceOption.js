/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.OrderPieceOption"}}{{/crossLink}} est un objet qui stock les
 * informations relatives à une personnalisation d'une pièce de commande d'un bon de
 * commande. Le système crée automatiquement les instances de cet objet, il n'est
 * donc pas nécessaire de créer manuellement des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store/createRecord:method"}}{{/clink}}
 * 
 * @class OrderPieceOption
 * @namespace App
 * @extends App.AbstractModels.ItemOption
 */
App.OrderPieceOption = App.AbstractModels.ItemOption.extend({
    /**
     * Pièce de bon de commande liée à cette option
     * @property orderPiece
     * @type {App.OrderPiece}
     */
    orderPiece: DS.belongsTo('orderPiece', {async: true}),
    optionType: DS.belongsTo('optionType', {async: true}),
    option: DS.belongsTo('option', {async: true})
});