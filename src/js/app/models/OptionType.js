/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.OptionType"}}{{/crossLink}} est un objet qui stock les informations
 * relatives un type d'option. Le système crée automatiquement les instances de cet objet,
 * il n'est donc pas nécessaire de créer manuellement des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store.createRecord"}}{{/clink}}
 * 
 * @class OptionType
 * @namespace App
 * @extends DS.Model
 */
App.OptionType = DS.Model.extend({
    /**
     * Label de l'option
     * @property label
     * @type {String}
     */
    label: DS.attr('string'),
    optionTypeReplace: DS.attr('string')
});