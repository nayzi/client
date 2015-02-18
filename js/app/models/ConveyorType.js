/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.ConveyorType"}}{{/crossLink}} est un objet qui stock les
 * informations relatives à un type de convoyeur. Le système crée automatiquement
 * les instances de cet objet, il n'est donc pas nécessaire de créer manuellement
 * des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store/createRecord:method"}}{{/clink}}
 * 
 * @class ConveyorType
 * @namespace App
 * @extends DS.Model
 */
App.ConveyorType = DS.Model.extend({
    /**
     * Label fournissant une manière lisible d'identifier un enregistrement
     * @property label
     * @type {String}
     */
    label: DS.attr('string'),
    /**
     * Fournit une manière abbrévié de désigner un type de convoyeur
     * @property abbreviation
     * @type {String}
     */
    abbreviation: DS.attr('string'),
    /**
     * Liste des options disponibles pour un type de convoyeur
     * @property conveyorTypeOptions
     * @type {App.ConveyorTypeOption[]}
     */
    conveyorTypeOptions: DS.hasMany('conveyorTypeOption', {async: true}),
    /**
     * Liste des options pièces disponibles pour un type de convoyeur
     * @property pieceAvailabilities
     * @type {App.PieceAvailability[]}
     */
    pieceAvailabilities: DS.hasMany('pieceAvailability', {async: true})
});

App.ConveyorType.FIXTURES = [
    {
        id: 1,
        label: 'Courbe à rouleaux commandés débrayables',
        abbreviation: 'CRCD'
    }, {
        id: 2,
        label: 'Rouleaux commandés débrayables',
        abbreviation: 'RCD'
    }, {
        id: 3,
        label: 'Rouleaux libres',
        abbreviation: 'RL'
    }
];