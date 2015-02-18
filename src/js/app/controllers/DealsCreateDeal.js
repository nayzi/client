/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Contrôleurs
 */

/**
 * 
 * 
 * @class DealsCreateDealController
 * @namespace App
 * @extends App.AbstractControllers.DealsFormController
 */
App.DealsCreateDealController = App.AbstractControllers.DealsFormController.extend({
    actions: {
        cancel: function() {
            this.transitionToRoute('deals.index');
        }
    },
    submitForm: function() {
        return this.get('model').save();
    },
    validations: {
        number: [
            {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                pattern: /^\d{6}$/,
                message: 'Doit contenir 6 chiffres'
            },
            {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                message: 'L\'affaire existe déjà',
                type: Ember.Validations.Type.FUNCTION,
                check: function(value) {
                    return Utils.checkIfExist({
                        type: 'deal',
                        dealNumber: value
                    });
                }
            }
        ],
        clientName: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: new RegExp('^[a-zA-Z0-9_ -]{1,}$'),
            message: 'Doit contenir des caractères alphanumériques (_, -, &lt;espace&gt; sont inclus)'
        },
        dealName: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: new RegExp('^[a-zA-Z0-9_ -]{1,}$'),
            message: 'Doit contenir des caractères alphanumériques (_, -, &lt;espace&gt; sont inclus)'
        },
        eg: [
            {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                pattern: /^\d{3}$/,
                message: 'Doit contenir 3 chiffres'
            }, {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                type: Ember.Validations.Type.LISTRANGE,
                callback: 'Utils.setInputValue',
                message: 'EG non standard'
            }
        ],
        ral: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: /^\d{4}$/,
            message: 'Doit contenir 4 chiffres'
        },
        ralUnderConveyor: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: /^\d{4}$/,
            message: 'Doit contenir 4 chiffres'
        }
    }
});