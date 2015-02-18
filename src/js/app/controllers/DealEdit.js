/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Contrôleurs
 */

/**
 * Edite une affaire
 * @class DealEditController
 * @namespace App
 * @extends App.AbstractControllers.DealsFormController
 */
App.DealEditController = App.AbstractControllers.DealsFormController.extend({
    actions: {
        cancel: function() {
            this.transitionToRoute('deal');
        }
    },
    submitForm: function() {
        if (this.get('model.isDirty')) {
            return this.get('model').save();
        } else {
            return Ember.RSVP.Promise.resolve();
        }
    },
    validations: {
        number: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: /.+/,
            message: 'Ne doit jamais apparaître'
        },
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
        eg: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: /.+/,
            message: 'Ne doit jamais apparaître'
        },
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