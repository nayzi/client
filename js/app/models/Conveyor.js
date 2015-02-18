/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.Conveyor"}}{{/crossLink}} est un objet qui stock les informations
 * relatives à un convoyeur d'un bon de commande. Le système crée automatiquement
 * les instances de cet objet, il n'est donc pas nécessaire de créer manuellement
 * des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store.createRecord"}}{{/clink}}
 * 
 * @class Conveyor
 * @namespace App
 * @extends DS.Model
 */
App.Conveyor = DS.Model.extend({
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
     * Repère du convoyeur servant à l'identifier sur le plan d'implantation
     * @property ref
     * @type {String}
     */
    ref: DS.attr('string'),
    /**
     * Entre-guide (EG) du convoyeur dans le cas du nom respect du EG affaire
     * @property eg
     * @type {Integer}
     */
    eg: DS.attr('number'),
    /**
     * Zone du convoyeur
     * @property zone
     * @type {String}
     */
    zone: DS.attr('string'),
    /**
     * Code couleur RAL à indiquer si différent du ral affaire
     * @property ral
     * @type {String}
     */
    ral: DS.attr('string', {defaultValue: 'RAL'}),
    /**
     * Code couleur RAL pour les éléments sous le convoyeur. A indiquer si différent
     * du RAL affaire
     * @property ralUnderConveyor
     * @type {String}
     */
    ralUnderConveyor: DS.attr('string', {defaultValue: 'RAL'}),
    /**
     * Position du convoyeur dans la liste des convoyeurs de l'affaire (numéroté de 0 à n sans doublons)
     * @property position
     * @type {Integer}
     */
    position: DS.attr('number'),
    /**
     * Liste des pièces commandés pour ce convoyeur
     * @property pieceOrders
     * @type {App.PieceOrder[]}
     */
    pieceOrders: DS.hasMany('pieceOrder', {async: true, defaultValue: []}),
    /**
     * Liste des options sur le convoyeur
     * @property options
     * @type {App.ConveyorOption[]}
     */
    options: DS.hasMany('conveyorOption', {async: true, defaultValue: []})
});