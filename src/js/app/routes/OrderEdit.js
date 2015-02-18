/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

App.OrderEditRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    actions: {
        willTransition: function() {
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
    setupController: function(controller, model) {
        this._super(controller, model);

        controller.set('ClimatValues', this.get('ClimatValues'));
        controller.set('PieceTypes', this.get('PieceTypes'));
        controller.set('OptionTypes', this.get('OptTypes'));

        controller.initLateProperties();
    },
    renderTemplate: function(controller, model) {
        this.render('orderEdit');
        this.render('headerOrderEdit', {
            into: 'orderEdit',
            outlet: 'header'
        });
        
        this.render('contentOrderEdit', {
            into: 'orderEdit',
            outlet: 'content'
        });
    }
});