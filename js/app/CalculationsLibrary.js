/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

CalculationsLibrary = {
    get: function(convTypeId, key) {
        if (arguments.length < 2) {
            key = convTypeId;
            convTypeId = 0;
        }
        
        var val;
        var rootKey = key.split('_')[0];
        var valForKeyExist = !(CalculationsLibrary['CONVTYPE_' + convTypeId] === undefined || CalculationsLibrary['CONVTYPE_' + convTypeId][key] === undefined);
        var valForRootKeyExist = !(CalculationsLibrary['CONVTYPE_' + convTypeId] === undefined || CalculationsLibrary['CONVTYPE_' + convTypeId][rootKey] === undefined);

        if (valForKeyExist) {
            val = CalculationsLibrary['CONVTYPE_' + convTypeId][key];
        } else if (CalculationsLibrary['CONVEYORS'][key] !== undefined) {
            val = CalculationsLibrary['CONVEYORS'][key];
        } else if (CalculationsLibrary['GLOBAL'][key] !== undefined) {
            val = CalculationsLibrary['GLOBAL'][key];
        } else if (rootKey !== key) {
            if (valForRootKeyExist) {
                val = CalculationsLibrary['CONVTYPE_' + convTypeId][rootKey];
            } else if (CalculationsLibrary['CONVEYORS'][rootKey] !== undefined) {
                val = CalculationsLibrary['CONVEYORS'][rootKey];
            } else if (CalculationsLibrary['GLOBAL'][rootKey] !== undefined) {
                val = CalculationsLibrary['GLOBAL'][rootKey];
            }
        }

        Ember.warn('CalculationLibrary: Aucun calcul automatique trouvé pour la clé `' + key + '`', val !== undefined);

        if (val === undefined) {
            val = Ember.K;
        }

        return val;
    },
    GLOBAL: {
        
    },
    CONVEYORS: {
        conveyorOption_2: function() {
            var ctrl = this.get('parentView.controller'); // ColController
            
            if (!this.get('hasError') && !ctrl.get('pieceOrders').any(function(pieceOrder) {
                return pieceOrder.get('orderPiece.piece.pieceType.id') === 1 + '' && pieceOrder.get('nbPieces') > 0;
            })) {
                var x = parseInt(ctrl.get('conveyorOption_2_value'), 10);
                var y = 2940;
                var z = ctrl.get('parentController.orderOption_26_value') ? ctrl.get('parentController.orderOption_26_value') : 1;
                var nbY = 0;
                var stringers = [];
                
                while (y % z !== 0) {
                    y = y - 28;
                }
                
                if (x >= y) {
                    nbY = Math.floor(x / y);
                    if (x / y !== nbY && x - y * nbY < 2940) {
                        nbY = nbY - 1;
                    }
                    
                    if (nbY > 0) stringers.pushObject({l: y, nb: nbY});
                    
                    y = (x - y * nbY) / 2;
                    
                    if (y > 0) {
                        nbY = 0;
                        
                        if (z === 1) {
                            if (y % 28 !== 0) {
                                stringers.pushObject({l: y + 14, nb: 1});
                                y = y - 14;
                                nbY = -1;
                            }

                            stringers.pushObject({l: y, nb: nbY + 2});
                        } else {
                            var y1 = y * 2; // Remaining length to cover at this point
                            
                            if (y % 28 !== 0) {
                                y = y + 14;
                            }
                            
                            while(y % z !== 0) {
                                y = y + 28;
                            }
                            
                            var existingStringer = stringers.findBy('l', y);
                            
                            if (y === y1 / 2) {
                                if (existingStringer) {
                                    existingStringer.nb = existingStringer.nb + 2;
                                } else {
                                    stringers.pushObject({l: y, nb: 2});
                                }
                            } else {
                                if (existingStringer) {
                                    existingStringer.nb = existingStringer.nb + 1;
                                } else {
                                    stringers.pushObject({l: y, nb: 1});
                                }
                                stringers.pushObject({l: y1 - y, nb: 1});
                            }
                        }
                    }
                } else {
                    stringers.pushObject({l: x, nb: 1});
                }
                
                Ember.run.next(ctrl, function(stringers) {
                    var self = this;
                    
                    function generateOrderPiece(orderPiece, stringer) {
                        var self = this;
                        orderPiece.get('options').then(function(orderPieceOptions) {
                            self.set('parentController.firstColController.orderPieceOption_' + orderPieceOptions.findBy('optionType.id', 1 + '').get('clientId') + '_value', stringer.l);
                        });

                        self.set('pieceOrder_' + orderPiece.get('clientId') + '_value', stringer.nb);
                    }
                    
                    stringers.forEach(function(stringer) {
                        stringer.nb = stringer.nb * 2;
                        var didSet = false;
                        
                        this.get('parentController.orderPieces').then(function(orderPieces) {
                            return Ember.RSVP.Promise.all(orderPieces.map(function(orderPiece) {
                                if (orderPiece.get('piece.pieceType.id') === 1 + '') {
                                    return orderPiece.get('options').then(function(options) {
                                        if (options.any(function(option) {
                                            return option.get('optionType.id') === 1 + '' && option.get('optionValue') + '' === stringer.l + '';
                                        })) {
                                            if (!didSet) {
                                                generateOrderPiece.call(self, orderPiece, stringer);
                                                didSet = true;
                                            }
                                            
                                            return Ember.RSVP.Promise.reject();
                                        } else {
                                            return Ember.RSVP.Promise.resolve();
                                        }
                                    });
                                } else {
                                    return Ember.RSVP.Promise.resolve();
                                }
                            })).then(function() {
                                var orderPiece = self.get('parentController').initOrderPiece(1 + '');
                                Ember.run.next(self, generateOrderPiece, orderPiece, stringer);
                            });
                        });
                    }, this);
                }, stringers);
            }
        }
    },
    CONVTYPE_3: {
    }
};