/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.PieceOrder"}}{{/crossLink}} est un objet qui stock les
 * informations relatives à une commande de pièce pour un convoyeur. Le système
 * crée automatiquement les instances de cet objet, il n'est donc pas nécessaire
 * de créer manuellement des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store/createRecord:method"}}{{/clink}}
 * 
 * @class PieceOrder
 * @namespace App
 * @extends DS.Model
 */
App.PieceOrder = DS.Model.extend({
    // Nécessaire pour les objets étants créé côté client
    clientId: function() {
        if (this.get('isNew')) {
            return App.generateIdForRecord();
        } else {
            return this.get('id');
        }
    }.property(),
    /**
     * Convoyeur liée à cette commande de pièce
     * @property conveyor
     * @type {App.Conveyor}
     */
    conveyor: DS.belongsTo('conveyor', {async: true}),
    /**
     * Référence de la pièce dans le bon de commande
     * @property orderPiece
     * @type {App.OrderPiece}
     */
    orderPiece: DS.belongsTo('orderPiece', {async: true}),
    /**
     * Nombre de pièce à commander
     * @property nbPieces
     * @type {Integer}
     */
    nbPieces: DS.attr('number', {defaultValue: 0})
});