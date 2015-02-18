/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.Option"}}{{/crossLink}} est un objet qui stock les informations
 * relatives une option. Le système crée automatiquement les instances de cet objet,
 * il n'est donc pas nécessaire de créer manuellement des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store.createRecord"}}{{/clink}}
 * 
 * @class Option
 * @namespace App
 * @extends DS.Model
 */
App.Option = DS.Model.extend({
    /**
     * Type d'option
     * @property optionType
     * @type {App.OptionType}
     */
    optionType: DS.belongsTo('optionType', {async: true}),
    /**
     * Label de l'option
     * @property label
     * @type {String}
     */
    label: DS.attr('string'),
    /**
     * Valeur de l'option
     * @property value
     * @type {String}
     */
    value: DS.attr('string'),
    /**
     * Indique si l'option est personnalisable
     * @property isCustomizable
     * @type {Boolean}
     */
    isCustomizable: DS.attr('boolean'),
    /**
     * Indique si l'option est active
     * @property isActive
     * @type {Boolean}
     */
    isActive: DS.attr('boolean'),
    /**
     * Indique si l'option est l'option par défaut
     * @property isDefault
     * @type {Boolean}
     */
    isDefault: DS.attr('boolean')
});