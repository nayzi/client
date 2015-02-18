/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.Log"}}{{/crossLink}} est un objet qui stock les informations
 * relatives à une action sur un bon de commande. Le système crée automatiquement les instances de
 * cet objet, il n'est donc pas nécessaire de créer manuellement des instances de
 * celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store.createRecord"}}{{/clink}}
 * 
 * @class Log
 * @namespace App
 * @extends DS.Model
 */
App.Log = DS.Model.extend({
    /**
     * Date d'occurence de l'action au format ISO-8601
     * @property date
     * @type String
     */
    date: DS.attr('string'),
    /**
     * Titre de l'action
     * @property rights
     * @type String
     */
    title: DS.attr('string'),
    /**
     * Description de l'action
     * @property desc
     * @type String
     */
    desc: DS.attr('string'),
    /**
     * Nom et prénom de l'utilisateur ayant effectué l'action
     * @property username
     * @type String
     */
    username: DS.attr('string')
});