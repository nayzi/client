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
 * @class PopInDealController
 * @namespace App
 * @extends Ember.Controller
 * @uses Ember.Validations.Mixin.Validator
 */
App.PopInDealController = Ember.Controller.extend(Ember.Validations.Mixin.Validator, {
    actions: {
        successfulSaving: function() {
            var bpe = this.get('bpe');
            var convType = this.get('convType');

            // Efface les champs
            this.send('resetForm');
            
            this.transitionToRoute('deal.createOrder', bpe, convType);
        },
        failSaving: function() {
            
        }
    },
    needs: ['deal'],
    submitForm: function() {
        return Ember.RSVP.Promise.resolve();
    },
    ConvTypeValues: Ember.computed(function() {
        return this.store.find('conveyorType');
    }).property(),
    bpe: null,
    convType: null,
    validations: {
        bpe: [
            {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                pattern: /^\d{3}$/,
                message: 'Doit contenir 3 chiffres'
            },
            {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                type: Ember.Validations.Type.RANGE,
                message: 'Doit être compris entre 100 et 399 (inclus)',
                min: 100,
                max: 399,
                STRICT: false
            },
            {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                message: 'Le BPE existe déjà',
                type: Ember.Validations.Type.FUNCTION,
                needContext: true,
                check: function(value) {
                    return Utils.checkIfExist({
                        type: 'order',
                        dealId: this.get('controllers.deal.id'),
                        bpe: value
                    });
                }
            }
        ],
        convType: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            type: Ember.Validations.Type.LIST,
            message: 'Veuillez choisir un type de convoyeur'
        }
    }
});