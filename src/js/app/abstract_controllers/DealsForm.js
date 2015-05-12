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
    needs: ["popInDealU"],
    actions: {
        cancel: function() {
            return !1
        },
        successfulSaving: function() {
            this.transitionToRoute("deal", this.get("model.id"))
        },
        failSaving: function() {}
    },
    EgValues: Ember.computed(function() {
        for (var a = [], b = 6; 13 > b; ++b) a.push({
            id: 50 * b + 30
        });
        return a
    }).property()
});