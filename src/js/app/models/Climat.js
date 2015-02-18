/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.Climat"}}{{/crossLink}} est un objet qui stock les informations
 * relatives au climat. Le système crée automatiquement les instances de cet objet,
 * il n'est donc pas nécessaire de créer manuellement des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store/createRecord:method"}}{{/clink}}
 * 
 * @class Climat
 * @namespace App
 * @extends DS.Model
 */
App.Climat = DS.Model.extend({
    /**
     * Label fournissant une manière lisible d'identifier un enregistrement
     * @property label
     * @type string
     */
    label: DS.attr('string'),
    /**
     * Manière d'identifié un climat avec un nom court (généralement une lettre)
     * @property abbreviation
     * @type string
     */
    abbreviation: DS.attr('string')
});

App.Climat.FIXTURES = [
    {
        id: 1,
        label: 'Normal'
    }
];