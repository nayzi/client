/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

App.OrderRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    beforeModel: function(transition) {
        var convTypeId = parseInt(transition.params.conv_type);

        var climats = this.store.find('climat');
        var optTypes = this.store.find('optionType');
        var convType = this.store.find('conveyorType', convTypeId);
        var pieceTypes = this.store.find('pieceType');

        this.set('ClimatValues', climats);
        this.set('convTypeObject', convType);
        this.set('OptTypes', optTypes);
        this.set('PieceTypes', pieceTypes);

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
    },
    model: function(params, transition) {
        return this.get('store').find('order', params.order_id);
    },
    afterModel: function(model) {
        return Ember.RSVP.Promise.all([model.get('conveyorType'), model.get('options'), model.get('orderPieces').then(function(orderPieces) {
                return Ember.RSVP.Promise.all([orderPieces.get('options'), orderPieces.get('piece')]);
            }), model.get('conveyors').then(function(conveyors) {
                return Ember.RSVP.Promise.all(conveyors.map(function(conveyor) {
                    return Ember.RSVP.Promise.all([conveyor.get('pieceOrders'), conveyor.get('options')]);
                }));
            })]);
    }
});