/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Routes
 */

/**
 * Route pour la création d'un bon de commande
 * @class DealCreateOrderRoute
 * @namespace App
 * @extends Ember.Route
 * @uses Ember.SimpleAuth.AuthenticatedRouteMixin
 */
App.DealCreateOrderRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    actions: { 
        willTransition: function() {console.log('willTransition DealCreateOrderRoute');
            var record = this.controller.get('model');
            this.controller.removeOptionOberservers();
            
            return Ember.RSVP.Promise.all([record.get('conveyors').then(function(conveyors) {
                return Ember.RSVP.Promise.all([conveyors.map(function(conveyor) {
                    return Ember.RSVP.Promise.all([conveyor.get('pieceOrders').then(function(pieceOrders) {
                        pieceOrders.forEach(function(pieceOrder) {
                            pieceOrder.rollback();
                        });
                    }), conveyor.get('options').then(function(options) {
                        options.forEach(function(option) {
                            option.rollback();
                        });
                    })]).then(function() {
                        conveyor.rollback();
                    });
                })]);
            }), record.get('orderPieces').then(function(orderPieces) {
                return Ember.RSVP.Promise.all(orderPieces.map(function(orderPiece) {
                    return orderPiece.get('options').then(function(options) {
                        options.forEach(function(option) {
                            option.rollback();
                        });
                    }).then(function() {
                        orderPiece.rollback();
                    });
                }));
            }), record.get('options').then(function(options) {
                options.forEach(function(option) {
                    option.rollback();
                });
            })]).then(function() {
                record.rollback();
            });
        }
    },
    beforeModel: function(transition) {console.log('beforeModel DealCreateOrderRoute');
        var convTypeId = parseInt(transition.params['deal.createOrder'].conv_type);
        if (convTypeId !== 3) { // Si jamais la page n'existe pas
            this.transitionTo('deal.index');
        } else {
            var climats = this.store.find('climat');
            var optTypes = this.store.find('optionType');
            var convType = this.store.find('conveyorType', convTypeId);
            var pieceTypes = this.store.find('pieceType');
            var pieces = this.store.find('pieces');

            this.set('ClimatValues', climats);
            this.set('convTypeObject', convType);
            this.set('OptTypes', optTypes);
            this.set('PieceTypes', pieceTypes);
            this.set('Pieces', pieces);

            return Ember.RSVP.Promise.all([climats, optTypes, pieceTypes, convType.then(function(cType) {
                return Ember.RSVP.Promise.all([cType.get('conveyorTypeOptions').then(function(data) {
                    var options = [];

                    data.forEach(function(item) {
                        options.push(item.get('_data.option.id'));
                    });

                    return data.get('store').find('option', {'ids': options.uniq()}).then(function(dataOptions) {
                        var opt = [];

                        data.forEach(function(item) {
                            opt.push(item.get('option'));
                        });

                        dataOptions.forEach(function(option) {
                            opt.push(option.get('optionType'));
                        });

                        // Make sure to resolve all the relations
                        // Will not make any HTTP request because all data are already loaded
                        return Ember.RSVP.Promise.all(opt);
                    });
                }), cType.get('pieceAvailabilities').then(function(pieceAvailabilities) {
                    var availabilities = [];

                    pieceAvailabilities.forEach(function(item) {
                        availabilities.push(item.get('_data.piece.id'));
                    });

                    return pieceAvailabilities.get('store').find('piece', {'ids': availabilities}).then(function(pieces) {
                        return Ember.RSVP.Promise.all(pieceAvailabilities.map(function(pieceAvailability) {
                            return pieceAvailability.get('piece').then(function(piece) {
                                return Ember.RSVP.Promise.all([piece.get('options').then(function(options) {
                                    return Ember.RSVP.Promise.all(options.map(function(option) {
                                        return option.get('optionType');
                                    }));
                                }), piece.get('pieceType'), piece.get('climats')]);
                            });
                        }));
                    });
                })]);
            })]);
        }
    },
    model: function(params, transition) {console.log('model DealCreateOrderRoute');
        return this.get('store').createRecord('order', {
            otp: params.otp
        });
    },
    afterModel: function(model) {console.log('afterModel DealCreateOrderRoute');
        return this.get('convTypeObject').then(function(cType) {
            model.set('conveyorType', cType);
        });
    },
    setupController: function(controller, model) {console.log('setupController DealCreateOrderRoute');
        this._super(controller, model);

        model.set('deal', this.modelFor('deal'));
        controller.set('ClimatValues', this.get('ClimatValues'));
        controller.set('PieceTypes', this.get('PieceTypes'));
        controller.set('Pieces', this.get('Pieces'));
        controller.set('OptionTypes', this.get('OptTypes'));

        controller.initLateProperties();
        Ember.run.next(controller, controller.send, 'addConveyor');
    },
    renderTemplate: function(controller, model) {console.log('renderTemplate DealCreateOrderRoute');
        this.render('dealCreate');
        this.render('headerDealCreate', {
            into: 'dealCreate',
            outlet: 'header'
        });
        
        this.render('dealCreateOrder', {
            into: 'dealCreate',
            outlet: 'content'
        });
    }
});