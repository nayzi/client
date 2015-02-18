/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.PieceAvailability"}}{{/crossLink}} est un objet qui stock les
 * informations relatives à une disponibilité de pièce. Le système crée automatiquement
 * les instances de cet objet, il n'est donc pas nécessaire de créer manuellement
 * des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store/createRecord:method"}}{{/clink}}
 * 
 * @class PieceAvailability
 * @namespace App
 * @extends DS.Model
 */
App.PieceAvailability = DS.Model.extend({
    /**
     * Pièce concerné
     * @property piece
     * @type {App.Piece}
     */
    piece: DS.belongsTo('piece', {async: true}),
    /**
     * Type de convoyeur concerné
     * @property conveyorType
     * @type {App.ConveyorType}
     */
    conveyorType: DS.belongsTo('conveyorType', {async: true}),
    /**
     * Défini si la pièce est active
     * @property pieces
     * @type {Boolean}
     */
    isActive: DS.attr('boolean')
});