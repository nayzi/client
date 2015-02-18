/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.Action"}}{{/crossLink}} est un objet qui stock les informations
 * relatives à une action de l'utilisateur. Le système crée automatiquement les instances de
 * cet objet, il n'est donc pas nécessaire de créer manuellement des instances de
 * celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store.createRecord"}}{{/clink}}
 * 
 * @class Action
 * @namespace App
 * @extends DS.Model
 */
App.Action = DS.Model.extend({
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
    desc: DS.attr('string')
});