/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.ConveyorOption"}}{{/crossLink}} est un objet qui stock les
 * informations relatives à une personnalisation d'un convoyeur. Le système crée
 * automatiquement les instances de cet objet, il n'est donc pas nécessaire de créer
 * manuellement des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store/createRecord:method"}}{{/clink}}
 * 
 * @class ConveyorOption
 * @namespace App
 * @extends App.AbstractModels.ItemOption
 */
App.ConveyorOption = App.AbstractModels.ItemOption.extend({
    /**
     * Convoyeur liée à cette option
     * @property conveyor
     * @type {App.Conveyor}
     */
    conveyor: DS.belongsTo('conveyor', {async: true})
});