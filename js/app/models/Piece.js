/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.Piece"}}{{/crossLink}} est un objet qui stock les
 * informations relatives à une pièce. Le système crée automatiquement
 * les instances de cet objet, il n'est donc pas nécessaire de créer manuellement
 * des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store/createRecord:method"}}{{/clink}}
 * 
 * @class Piece
 * @namespace App
 * @extends DS.Model
 */
App.Piece = DS.Model.extend({
    /**
     * Type de pièce
     * @property pieceType
     * @type {Integer}
     */
    pieceType: DS.belongsTo('pieceType', {async: true}),
    /**
     * Label fournissant une manière lisible d'identifier un enregistrement
     * @property label
     * @type {String}
     */
    label: DS.attr('string'),
    /**
     * Défini la référence ERP
     * @property erpRef
     * @type {String}
     */
    erpRef: DS.attr('string'),
    /**
     * Défini les climats pour lesquels la pièce fonctionne
     * @property climats
     * @type {App.Climat[]}
     */
    climats: DS.hasMany('climat', {async: true}),
    /**
     * Défini la liste des options disponibles pour une pièce
     * @property options
     * @type {App.Option[]}
     */
    options: DS.hasMany('option', {async: true})
});