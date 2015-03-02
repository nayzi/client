/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.OrderPiece"}}{{/crossLink}} est un objet qui stock les
 * informations relatives à une pièce d'un bon de commande. Le système crée automatiquement
 * les instances de cet objet, il n'est donc pas nécessaire de créer manuellement
 * des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store/createRecord:method"}}{{/clink}}
 * 
 * @class OrderPiece
 * @namespace App
 * @extends DS.Model
 */
App.OrderPiece = DS.Model.extend({
    // Nécessaire pour les objets étants créé côté client
    clientId: function() {
        if (this.get('isNew')) {
            return App.generateIdForRecord();
        } else {
            return this.get('id');
        }
    }.property(),
    /**
     * Bon de commande lié
     * @property order
     * @type {App.Order}
     */
    order: DS.belongsTo('order', {async: true}),
    /**
     * Pièce
     * @property piece
     * @type {App.Piece}
     */
    piece: DS.belongsTo('piece', {async: true}),
    /**
     * Défini si c'est une commande automatique ou non
     * @property isComputed
     * @type {Boolean}
     */
    isComputed: DS.attr('boolean', {defaultValue: false}),
    /**
     * Liste des options sur la pièce
     * @property options
     * @type {App.OrderPieceOption[]}
     */
    orderPieceOptions: DS.hasMany('orderPieceOption', {async: true})
});