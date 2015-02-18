/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module Modèles
 * @submodule Modèles abstraits
 */

/**
 * Un {{#crossLink "App.AbstractModels.ItemOption"}}{{/crossLink}} est un objet
 * qui stock les informations relatives à une option sélectionné pour un objet
 * du type `Item`. Le type `Item` est defini en étendant cet objet.
 * 
 * @class ItemOption
 * @namespace AbstractModels
 * @extends DS.Model
 */
App.AbstractModels.ItemOption = DS.Model.extend({
    // Nécessaire pour les objets étants créé côté client
    clientId: function() {
        if (this.get('isNew')) {
            return App.generateIdForRecord();
        } else {
            return this.get('id');
        }
    }.property(),
    /**
     * Type d'option
     * @property optionType
     * @type {App.OptionType}
     */
    optionType: DS.belongsTo('optionType', {async: true}),
    /**
     * Option
     * @property option
     * @type {App.Option}
     */
    option: DS.belongsTo('option', {async: true}),
    /**
     * Valeur personnalisé
     * @property optionValue
     * @type {String|Integer|Boolean}
     */
    optionValue: DS.attr('string')
});