/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.ConveyorTypeOption"}}{{/crossLink}} est un objet qui stock
 * les informations relatives aux options d'un convoyeur. Le système crée automatiquement
 * les instances de cet objet, il n'est donc pas nécessaire de créer manuellement
 * des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store.createRecord"}}{{/clink}}
 * 
 * @class ConveyorTypeOption
 * @namespace App
 * @extends DS.Model
 */
App.ConveyorTypeOption = DS.Model.extend({
    /**
     * Option lié
     * @property option
     * @type {App.Option}
     */
    option: DS.belongsTo('option', {async: true}),
    /**
     * Type de convoyeur liée à cette option
     * @property conveyor
     * @type {App.ConveyorType}
     */
    conveyorType: DS.belongsTo('conveyorType', {async: true}),
    /**
     * Indique si l'option est personnalisable au niveau du convoyeur
     * @property isConveyorOption
     * @type {Boolean}
     */
    isConveyorOption: DS.attr('boolean'),
    /**
     * Indique si l'option est à personnalisable au niveau du bon de commande
     * @property isOrderOption
     * @type {Boolean}
     */
    isOrderOption: DS.attr('boolean')
});