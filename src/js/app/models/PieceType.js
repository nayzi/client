/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.PieceType"}}{{/crossLink}} est un objet qui stock les
 * informations relatives à un type de pièce. Le système crée automatiquement
 * les instances de cet objet, il n'est donc pas nécessaire de créer manuellement
 * des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store/createRecord:method"}}{{/clink}}
 * 
 * @class PieceType
 * @namespace App
 * @extends DS.Model
 */
App.PieceType = DS.Model.extend({
    /**
     * Type de pièce parent
     * @property parent
     * @type {Integer}
     */
    parentType: DS.belongsTo('pieceType', {async: true}),
    /**
     * Label fournissant une manière lisible d'identifier un enregistrement
     * @property label
     * @type {String}
     */
    label: DS.attr('string')
});