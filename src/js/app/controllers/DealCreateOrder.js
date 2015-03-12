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
 * @class DealCreateOrderController
 * @namespace App
 * @extends Ember.ObjectController
 * @uses Ember.Validations.Mixin.Validator
 */
App.DealCreateOrderController = App.AbstractControllers.DealFormController.extend({
    addOptionObersers: function(orderOptions) {console.log('DealCreateOrderController addOptionObersers');
    console.log('orderOptions');console.log(orderOptions);
    console.log('this');console.log(this);
        var self = this;
        
        this.get('options').then(function(options) {
            options.addObjects(orderOptions.map(function(optType) {
                var defaultValue = optType.get('isArray') ? optType.get('options').find(function(opt) {
                    return opt.get('id') === optType.get('defaultValue');
                }) : optType.get('options');

                var orderOptionRecord = this.get('store').createRecord('orderOption', {
                    order: this.get('model'),
                    optionType: optType.get('content'),
                    option: defaultValue
                });

                this.set(optType.get('name'), defaultValue);
                if (optType.get('isArray')) this.set(optType.get('name').capitalize() + 'Values', optType.get('options'));

                this.addObserver(optType.get('name'), function(sender, key) {
                    orderOptionRecord.set('option', sender.get(key));
                });

                if (!optType.get('isArray')) {
                    this.set(optType.get('name') + '_value', optType.get('isOptType26') ? parseInt(this.get('orderOption_19.label'), 10) * 2 : defaultValue.get('value'));

                    this.addObserver(optType.get('name') + '_value', function(sender, key) {
                        orderOptionRecord.set('optionValue', sender.get(key));
                    });
                    
                    this.get('optionObservers').addObjects([optType.get('name') + '_value', optType.get('name')]);
                } else {
                    this.get('optionObservers').addObjects(optType.get('name'));
                }

                return orderOptionRecord;
            }, self));

            while (orderOptions.length % 4 !== 0) {
                orderOptions.push(Ember.Object.create({
                    index: orderOptions.length,
                    content: null,
                    isArray: false
                }));
            }
        });

        Ember.run.sync();

        this.set('convTOptOrder', orderOptions);
    },
    init: function() {
        this._super();

        this.initValidations();
    },
    initLateProperties: function() {
        this.initOrderOptions();
    },
    initValidations: function() {
        this.addValidation('drawerName', ValidationsLibrary.get('drawerName'), true);
        this.addValidation('plan', ValidationsLibrary.get('plan'), true);
        this.addValidation('climat', ValidationsLibrary.get('climat'), true);
    },
    validations: {
        table: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            type: Ember.Validations.Type.FUNCTION,
            needContext: true,
            check: function() {
                if (this.get('table')) {
                    return Ember.RSVP.Promise.resolve();
                } else {
                    return Ember.RSVP.Promise.reject();
                }
            }
        }
    }
});