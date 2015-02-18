/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module Contrôleurs
 * @submodule Contrôleurs abstraits
 */

/**
 * 
 * 
 * @class DealsFormController
 * @namespace AbstractControllers
 * @extends Ember.ObjectController
 * @uses Ember.Validations.Mixin.Validator
 */
App.AbstractControllers.DealsFormController = Ember.ObjectController.extend(Ember.Validations.Mixin.Validator, {
    actions: {
        cancel: function() {
            return false;
        },
        successfulSaving: function() {
            this.transitionToRoute('deal', this.get('model.id'));
        },
        failSaving: function() {
            
        }
    },
    /**
     * Liste des valeurs d'entre-guide
     * @property EgValues
     * @type {Integer[]}
     */
    EgValues: Ember.computed(function() {
        var data = [];
        // Create a list of possible EG
        for (var i = 6; i < 13; ++i) {
            data.push({id: 50 * i + 30});
        }

        return data;
    }).property()
});