/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.User"}}{{/crossLink}} est un objet qui stock les informations
 * relatives à un utilisateur. Le système crée automatiquement les instances de
 * cet objet, il n'est donc pas nécessaire de créer manuellement des instances de
 * celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store.createRecord"}}{{/clink}}
 * 
 * @class User
 * @namespace App
 * @extends DS.Model
 */
App.User = DS.Model.extend({
    /**
     * Prénom et nom de l'utilisateur mis bout à bout
     * @property username
     * @type {String}
     */
    username: DS.attr('string'),
    /**
     * Liste des droits de l'utilisateur
     * @property rights
     * @type {App.Right[]}
     */
    rights: DS.hasMany('right', {async: true}),
    /**
     * Liste des actions faîtes par l'utilisateur
     * @property actions
     * @type {App.Action[]}
     */
    actions: DS.hasMany('action', {async: true})
});

App.User.FIXTURES = [
    {
        id: 1,
        username: "Barthélemy Laurans",
        rights: [1]
    }, {
        id: 2,
        username: "User lambda",
        rights: [3]
    }, {
        id: 3,
        username: "Sébastien Thollet",
        rights: [2]
    }, {
        id: 4,
        username: "Prestataire",
        rights: [4]
    }
];