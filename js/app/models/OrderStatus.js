/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.OrderStatus"}}{{/crossLink}} est un objet qui stock les informations
 * relatives au status d'un bon de commande. Le système crée automatiquement les
 * instances de cet objet, il n'est donc pas nécessaire de créer manuellement des
 * instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store.createRecord"}}{{/clink}}
 * 
 * @class OrderStatus
 * @namespace App
 * @extends DS.Model
 */
App.OrderStatus = DS.Model.extend({
    /**
     * Nom et prénom de la personne qui maintient le bon de commande verrouillé
     * @property lockedBy
     * @type {string}
     */
    lockedBy: DS.attr('string', {defaultValue: undefined})
});