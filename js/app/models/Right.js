/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.Right"}}{{/crossLink}} est un objet qui stock les
 * informations relatives à un accès. Le système crée automatiquement les instances
 * de cet objet, il n'est donc pas nécessaire de créer manuellement des instances
 * de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store.createRecord"}}{{/clink}}
 * 
 * @class Right
 * @namespace App
 * @extends DS.Model
 */
App.Right = DS.Model.extend({
    /**
     * Label fournissant une manière lisible d'identifier un enregistrement
     * @property label
     * @type string
     */
    label: DS.attr('string', {defaultValue: undefined})
});

App.Right.FIXTURES = [
    {
        id: 1,
        label: 'Administrateur'
    }, {
        id: 2,
        label: 'Gestionnaire'
    }, {
        id: 3,
        label: 'Utilisateur'
    }, {
        id: 4,
        label: 'Prestataire'
    }
];