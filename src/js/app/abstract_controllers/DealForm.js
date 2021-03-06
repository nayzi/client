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
 * @class DealFormController
 * @namespace AbstractControllers
 * @extends Ember.ObjectController
 * @uses Ember.Validations.Mixin.Validator
 */
App.AbstractControllers.DealFormController = Ember.ObjectController.extend(Ember.Validations.Mixin.Validator, {
    actions: {
        cancel: function() {
            this.reset();
            this.transitionToRoute('deal.index');
        },
        addConveyor: function() {
            this.get('tableController').send('addConveyor');
        },
        removeConveyor: function() {
            this.get('tableController').send('removeConveyor');
        },
        successfulSaving: function() {
            this.transitionToRoute('deal');
        },
        failSaving: function() {
            console.log('Saving failed');
        }
    },
    tableController: null,
    isEditing: true,
    tableColBaseController: Ember.computed(function() {
        var ctrl;
        
        switch(parseInt(this.get('conveyorType.id'), 10)) {
            case 3:
                ctrl = PASC.BdcTable.Ext.RCDController;
                break;
                
            default:
                ctrl = Ember.ObjectController.extend(PASC.BdcTable.ColControllerMixin);
                break;
        }
        
        return ctrl;
    }),
    table: function() {
        Ember.run.next(this, this.validate, 'table');

        return this.get('tableController.isTableValid');
    }.observes('tableController.isTableValid'),
    submitForm: function() {
        var self = this;

        var newOrder = this.get('model');
        var newOrderPieces = [];
        var newOrderOptions = [];
        var newOrderPieceOptions = [];
        var newPieceOrders = [];
        var newConveyors = [];
        var newConveyorOptions = [];

        return Ember.RSVP.Promise.all([newOrder.get('options').then(function(options) {
                newOrderOptions = options.get('content');

                return Ember.RSVP.Promise.resolve();
            }), newOrder.get('orderPieces').then(function(orderPieces) {
                newOrderPieces = orderPieces.get('content');

                return Ember.RSVP.Promise.all(orderPieces.map(function(orderPiece) {
                    return orderPiece.get('options').then(function(options) {
                        newOrderPieceOptions.pushObjects(options.get('content'));
                        return Ember.RSVP.Promise.resolve();
                    });
                }));
            }), newOrder.get('conveyors').then(function(conveyors) {
                newConveyors = conveyors.get('content');

                return Ember.RSVP.Promise.all(conveyors.map(function(conveyor) {
                    return Ember.RSVP.Promise.all([conveyor.get('options').then(function(options) {
                            newConveyorOptions = options.get('content');
                            return Ember.RSVP.Promise.resolve();
                        }), conveyor.get('pieceOrders').then(function(pieceOrders) {
                            newPieceOrders = pieceOrders.get('content');
                            return Ember.RSVP.Promise.resolve();
                        })]);
                }));
            })]).then(function() {
            return self.save(newOrder, newOrderPieces, newOrderPieceOptions, newOrderOptions, newPieceOrders, newConveyors, newConveyorOptions);
        });

    },
    save: function(newOrder, newOrderPieces, newOrderPieceOptions, newOrderOptions, newPieceOrders, newConveyors, newConveyorOptions) {
        return newOrder.save().then(function() {
            return Ember.RSVP.Promise.all(newOrderPieces.map(function(orderPiece) {
                return orderPiece.save();
            }).concat(newOrderOptions.map(function(orderOption) {
                return orderOption.save();
            })).concat(newConveyors.map(function(conveyor) {
                return conveyor.save();
            }))).then(function() {
                return Ember.RSVP.Promise.all(newOrderPieceOptions.map(function(orderPieceOption) {
                    return orderPieceOption.save();
                }).concat(newPieceOrders.map(function(pieceOrder) {
                    return pieceOrder.save();
                })).concat(newConveyorOptions.map(function(conveyorOption) {
                    return conveyorOption.save();
                })));
            });
        }, undefined, 'Create order');
    },
    initOrderOptions: function() {
        var orderOptions = [];

        this.get('conveyorType.conveyorTypeOptions').forEach(function(item) {
            if (item.get('isOrderOption')) {
                var existingOptionT = orderOptions.findBy('content.id', item.get('option.optionType.id'));

                if (Ember.isEmpty(existingOptionT)) {
                    var name = 'orderOption_' + item.get('option.optionType.id');

                    orderOptions.pushObject(Ember.Object.create({
                        index: orderOptions.length,
                        name: name,
                        content: item.get('option.optionType.content'),
                        options: (item.get('option.isCustomizable') ? item.get('option.content') : [item.get('option.content')]),
                        isArray: !item.get('option.isCustomizable'),
                        defaultValue: item.get('option.isDefault') ? item.get('option.id') : null
                    }));

                    this.addValidation(name + (item.get('option.isCustomizable') ? '_value' : ''), ValidationsLibrary.get(this.get('conveyorType.id'), name), !item.get('option.isCustomizable'));
                } else {
                    if (item.get('option.isDefault')) {
                        existingOptionT.set('defaultValue', item.get('option.id'));
                    }
                    existingOptionT.set('options', existingOptionT.get('options').concat(item.get('option.content')));
                }
            }
        }, this);

        this.addOptionObersers(orderOptions);
    },
    addOptionObersers: Ember.K,
    optionObservers: Ember.computed(function() {
        return Ember.A();
    }),
    removeOptionOberservers: function() {
        this.get('optionObservers').forEach(function(observerName) {
            this.removeOberserver(observerName);
        }, this);
    }
});