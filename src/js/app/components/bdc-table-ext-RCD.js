PASC.BdcTable.Ext = PASC.BdcTable.Ext || Ember.Namespace.create();

/**
 * Contrôleur pour les colonnes du contenu du tableau
 * @class RCDController
 * @namespace Ext
 * @extends Ember.ObjectController
 * @uses PASC.BdcTable.ColControllerMixin
 */
PASC.BdcTable.Ext.RCDController = Ember.ObjectController.extend(PASC.BdcTable.ColControllerMixin, {
    actions: {
        updateCategory: function(pieceTypeId) {console.log("RCD updateCategory");console.log("pieceTypeId");console.log(parseInt(pieceTypeId, 10));
            switch(parseInt(pieceTypeId, 10)) {
                case 1:
                    this.checkStringers();
                    break;
                    
                case 5:
                    this.checkControlBoard();
                    break;
                    
                case 12:
                    this.checkControlBoard();
                    break;
            }
        },
        calculate: function(pieceTypeId) {
            console.log("RCD calculate");console.log("pieceTypeId");console.log(parseInt(pieceTypeId, 10));
            var self = this;
            this.validate('conveyorOption_2_value').then(function() {
                self.calculateDecomposition();
            });
        }
    },
    conveyorOption_19: Ember.computed(function() {
         console.log("RCD conveyorOption_19");
        return {label: 0};
    }),
    ConveyorOption_26_valueValues: function() {
        var data = [];
     
        if (this.get('conveyorOption_19.label') !== 0) {
            for (var i = 2; i < 16; ++i) {
                data.pushObject(Ember.Object.create({
                    id: i * parseInt(this.get('conveyorOption_19.label'), 10)
                }));
            }
        }
 console.log("RCD ConveyorOption_26_valueValues");console.log("data");console.log(data);
        return data;
    }.property('conveyorOption_19'),
    hasAlreadyCalculated: function(pieceTypeId) {
        return this.get('pieceOrders').any(function(pieceOrder) {
            return pieceOrder.get('orderPiece.piece.pieceType.id') === 1 + '' && pieceOrder.get('nbPieces') > 0;
        });
    },
    getTextForDialogWarning: function(pieceTypeId) {
        return "Le convoyeur contient déjà une décomposition, êtes-vous sûr de vouloir refaire la décomposition ?<br />" +
            "Cela aura pour effet de remettre à zéro les longerons, rouleaux complémentaires et courroies.";
    },
    checkStringers: function() {
        var text = "";
        var nbStringers = 0;
        var totalLength = 0;
        var self = this;
        
        this.get('parentController.orderPieces').then(function(orderPieces) {
            Ember.RSVP.Promise.all(orderPieces.map(function(orderPiece) {
                if (orderPiece.get('piece.pieceType.id') + '' === 1 + '') {
                    nbStringers = nbStringers + parseInt(self.get('pieceOrder_' + orderPiece.get('clientId') + '_value'), 10);
                    
                    return orderPiece.get('options').then(function(options) {
                        options.forEach(function(option) {
                            if (option.get('optionType.id') === 1 + '') {
                                totalLength = totalLength + parseInt(option.get('optionValue'), 10) * parseInt(self.get('pieceOrder_' + orderPiece.get('clientId') + '_value'), 10);
                            }
                        });
                        
                        return Ember.RSVP.Promise.resolve();
                    });
                }
            })).then(function() {
                if (parseInt(self.get('conveyorOption_2_value'), 10) !== totalLength / 2) {
                    text = "Longueur N.V.";
                } else if (nbStringers % 2 !== 0) {
                    text = "Non pair";
                }
        
                self.set('categoryText_1', text);
            });
        });
 console.log("RCD checkStringers");console.log("text");console.log(text);console.log("nbStringers");console.log(nbStringers);console.log("totalLength");console.log(totalLength);console.log("self");console.log(self);
    },
    checkControlBoard: function() {
        var nbRange = Math.floor(parseInt(this.get('conveyorOption_2_value'), 10) / parseInt(this.get('conveyorOption_26_value'), 10));
        var nbComp = 0;
        var nbControlBoard = 0;
        var self = this;
        
        this.get('parentController.orderPieces').then(function(orderPieces) {
            Ember.RSVP.Promise.all(orderPieces.map(function(orderPiece) {
                if (orderPiece.get('piece.pieceType.id') + '' === 5 + '') {
                    nbComp = nbComp + parseInt(self.get('pieceOrder_' + orderPiece.get('clientId') + '_value'), 10);
                } else if (orderPiece.get('piece.pieceType.id') + '' === 12 + '') {
                    nbControlBoard = nbControlBoard + parseInt(self.get('pieceOrder_' + orderPiece.get('clientId') + '_value'), 10);
                }
                
                return Ember.RSVP.Promise.resolve();
            })).then(function() {
                if (nbControlBoard !== nbRange + nbComp) {
                    self.set('categoryText_12', 'Besoin ' + (nbRange + nbComp));
                } else {
                    self.set('categoryText_12', nbRange + nbComp);
                }
            });
        });
       console.log("RCD checkControlBoard");console.log("nbRange");console.log(nbRange);console.log("nbComp");console.log(nbComp);console.log("nbControlBoard");console.log(nbControlBoard);console.log("self");console.log(self);
  
    },
    calculateDecomposition: function() {
        console.log("RCD calculateDecomposition");console.log("this");console.log(this);
        if (!this.get('hasError')) {
            if (this.hasAlreadyCalculated('1')) {
                var self = this;

                this.get('parentController.orderPieces').then(function(orderPieces) {
                    orderPieces.forEach(function(orderPiece) {
                        if (orderPiece.get('piece.pieceType.id') + '' === 1 + '' || orderPiece.get('piece.pieceType.id') + '' === 4 + '' || orderPiece.get('piece.pieceType.id') + '' === 8 + '') {
                            self.set('pieceOrder_' + orderPiece.get('clientId') + '_value', 0);
                           console.log("RCD calculateDecomposition piecetype.id"+orderPiece.get('piece.pieceType.id'));
                           console.log("RCD calculateDecomposition : set "+'pieceOrder_' + orderPiece.get('clientId') + '_value = 0'); 
                        }
                    });
                    console.log("RCD calculateDecomposition :initializeStringers");
                    console.log('params');
                    console.log(self.generateStringerList());
                    self.initializeStringers(self.generateStringerList());
                    self.initializeComplementaryPieces();
                });
            } else {
                this.initializeStringers(this.generateStringerList());
                this.initializeComplementaryPieces();
            }
        }

    },
    generateStringerList: function() {console.log('RCD generateStringerList');
        var x = parseInt(this.get('conveyorOption_2_value'), 10);
        console.log('x :'+parseInt(this.get('conveyorOption_2_value'), 10))
        var y = 2940;
        var z = this.get('conveyorOption_26_value') ? parseInt(this.get('conveyorOption_26_value'), 10) : 1;
        console.log('RCD :z :'+(this.get('conveyorOption_26_value') ? parseInt(this.get('conveyorOption_26_value'), 10) : 1));
        var nbY = 0;
        var stringers = [];

        while (y % z !== 0 && y > 0) {
            y = y - 28;
        }
        console.log('x :'+x+" y :"+y);
        if (x >= y) {console.log('RCD if x > y nby ='+Math.floor(x / y));
            nbY = Math.floor(x / y);
            if (x / y !== nbY && x - y * nbY < 2940) {
                nbY = nbY - 1;
            }

            if (nbY > 0)
                stringers.pushObject({l: y, nb: nbY});

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

                    while (y % z !== 0 && y < 2940) {
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
        } else {console.log("RCD else x,y l: "+x+"nb: "+nb);
            stringers.pushObject({l: x, nb: 1});
        }
        console.log("rcd generateStringerList : stringers=");
        console.log(stringers);
        return stringers;
    },
    initializeStringers: function(stringers) {
        var self = this;
        console.log('RCD initializeStringers this:');
        console.log(this);
        stringers.forEach(function(stringer) {console.log('RCD initializeStringers foreach:');console.log(stringer);
            stringer.nb = stringer.nb * 2;
            console.log('stringer*=2');
            var didSet = false;

            this.get('parentController.orderPieces').then(function(orderPieces) {
                return Ember.RSVP.Promise.all(orderPieces.map(function(orderPiece) {
                    if (orderPiece.get('piece.pieceType.id') === 1 + '') {console.log('RCD initializeStringers'+orderPiece.get('piece.pieceType.id'));
                        return orderPiece.get('options').then(function(options) {
                            if (options.any(function(option) {
                                return option.get('optionType.id') === 1 + '' && option.get('optionValue') + '' === stringer.l + '';
                            })) {
                                if (!didSet) {console.log('RCD initializeStringers generateOrderPiece self: ');console.log(self);console.log("orderPiece");console.log(orderPiece);console.log("stringer");console.log(stringer);
                                    self.generateOrderPiece.call(self, orderPiece, stringer);
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
                })).then(function() {console.log('RCD initializeStringers then self: ');console.log("self");console.log(self);
                    var orderPiece = self.get('parentController').initOrderPiece(1 + '');
                    console.log('RCD orderPiece');console.log(orderPiece);
                    console.log('Ember.run.next :');
                    console.log('self');
                    console.log(self);
                    console.log('orderPiece');
                    console.log(orderPiece);
                    console.log('stringer');
                    console.log(stringer);
                    var orderPieceX = self.get('parentController').initOrderPiece(0 + '');
                        console.log('0000000000');console.log("orderPiece 4");console.log(orderPieceX);
                        Ember.run.next(self, self.generateOrderPiece, orderPieceX, {Ab: 'Plages Z' ,nb: 33});
                    Ember.run.next(self, self.generateOrderPiece, orderPiece, stringer);
                });
            });
        }, this);
    },
    initializeComplementaryPieces: function() {console.log('RCD initializeComplementaryPieces');
        var nbRange = Math.floor(parseInt(this.get('conveyorOption_2_value'), 10) / parseInt(this.get('conveyorOption_26_value'), 10));
        var nbComp = Math.ceil((parseInt(this.get('conveyorOption_2_value'), 10) - nbRange * parseInt(this.get('conveyorOption_26_value'), 10)) / parseInt(this.get('conveyorOption_19.label'), 10));
        var nbStrap56 = 0;
        var nbStrap84 = 0;
        var nbStrap112 = 0;
        var didSetRoller = false;
        var didSetControlBoard = false;
        var self = this;
        console.log('nbRange');console.log(nbRange);
        console.log('nbComp');console.log(nbComp);
        this.set('categoryText_12', nbRange);
        console.log('conveyorOption_19.label');console.log(parseInt(this.get('conveyorOption_19.label'), 10));
        console.log('conveyorOption_26.label');console.log(parseInt(this.get('conveyorOption_26.label'), 10));
        console.log('conveyorOption_2_value');console.log(parseInt(this.get('conveyorOption_2_value'), 10));
        
        
        
        if (parseInt(this.get('conveyorOption_19.label'), 10) === 56) {console.log('egale a 56');
            if (nbComp > 0) {
                --nbComp;
            }
            nbStrap56 = nbComp;
        } else if (parseInt(this.get('conveyorOption_19.label'), 10) === 84) {console.log('egale a 84');
            nbStrap84 = nbComp;
            if (parseInt(this.get('conveyorOption_2_value'), 10) % 84 === 28) {
                nbStrap84 = nbStrap84 - 2;
                nbStrap56 = 2;
            } else if (parseInt(this.get('conveyorOption_2_value'), 10) % 84 === 56) {
                nbStrap84 = nbStrap84 - 1;
                nbStrap56 = 1;
            }
        } else if (parseInt(this.get('conveyorOption_19.label'), 10) === 112) {console.log('egale a 112');
            nbStrap112 = nbComp;
            if (parseInt(this.get('conveyorOption_2_value'), 10) % 84 === 56) {
                nbStrap112 = nbStrap112 - 1;
                nbStrap84 = 1;
            } else if (parseInt(this.get('conveyorOption_2_value'), 10) % 84 === 56) {
                nbStrap112 = nbStrap112 - 1;
                nbStrap56 = 1;
            }
        }
console.log("nbComp :"+nbComp+"nbStrap56"+nbStrap56+"nbStrap84"+nbStrap84+"nbStrap112"+nbStrap112);
        if (nbComp > 0) {
            this.get('parentController.orderPieces').then(function(orderPieces) {console.log('orderPieces');console.log(orderPieces);
                return Ember.RSVP.Promise.all(orderPieces.map(function(orderPiece) {console.log('piece.pieceType.id');console.log(orderPiece.get('piece.pieceType.id'));
                    if (orderPiece.get('piece.pieceType.id') === 4 + '') {
                        if (!didSetRoller) {
                            self.generateOrderPiece.call(self, orderPiece, {nb: nbComp});
                            didSetRoller = true;
                        }
                    } else if (orderPiece.get('piece.pieceType.id') === 8 + '') {
                        return orderPiece.get('options').then(function(options) {
                            if (nbStrap56 > 0 && options.any(function(option) {
                                return option.get('optionType.id') === 19 + '' && option.get('option.label') + '' === 56 + '';
                            })) {
                                self.generateOrderPiece.call(self, orderPiece, {nb: nbStrap56, strapLength: 56});
                                nbStrap56 = 0;

                                return Ember.RSVP.Promise.resolve();
                            }

                            if (nbStrap84 > 0 && options.any(function(option) {
                                return option.get('optionType.id') === 19 + '' && option.get('option.label') + '' === 84 + '';
                            })) {
                                self.generateOrderPiece.call(self, orderPiece, {nb: nbStrap84, strapLength: 84});
                                nbStrap84 = 0;

                                return Ember.RSVP.Promise.resolve();
                            }

                            if (nbStrap112 > 0 && options.any(function(option) {
                                return option.get('optionType.id') === 19 + '' && option.get('option.label') + '' === 112 + '';
                            })) {
                                self.generateOrderPiece.call(self, orderPiece, {nb: nbStrap112, strapLength: 112});
                                nbStrap112 = 0;

                                return Ember.RSVP.Promise.resolve();
                            }
                            if (options.any(function(option) {
                                return option.get('optionType.id') === 12 + '';
                            }) && !didSetControlBoard) {
                                self.generateOrderPiece.call(self, orderPiece, {nb: nbRange});
                                didSetControlBoard = true;

                                return Ember.RSVP.Promise.resolve();
                            }
                        });
                    }

                    return Ember.RSVP.Promise.resolve();
                })).finally(function() {
                    
                    if (!didSetRoller) {console.log('didSetRoller :'+didSetRoller);
                        var orderPiece = self.get('parentController').initOrderPiece(4 + '');
                        console.log('Ember.run.next');console.log("orderPiece 4");console.log(orderPiece);console.log('nb :'+nbComp);
                        Ember.run.next(self, self.generateOrderPiece, orderPiece, {nb: nbComp});
                    }
                    if (!didSetControlBoard) {console.log('didSetControlBoard :'+didSetControlBoard);
                        var orderPiece1 = self.get('parentController').initOrderPiece(12 + '');
                        console.log('Ember.run.next');console.log("orderPiece1 12");console.log(orderPiece1);console.log('nbrange :'+nbRange);
                        Ember.run.next(self, self.generateOrderPiece, orderPiece1, {nb: nbRange});
                        Ember.run.next(self, self.checkControlBoard);
                    }
                    if (nbStrap56 > 0) {console.log('nbStrap56 :'+nbStrap56);
                        var orderPiece56 = self.get('parentController').initOrderPiece(8 + '');
                        console.log('Ember.run.next');console.log("orderPiece56 8");console.log(orderPiece56);console.log('nbStrap56 :'+nbStrap56+' strapLength :'+56);
                        Ember.run.next(self, self.generateOrderPiece, orderPiece56, {nb: nbStrap56, strapLength: 56});
                    }
                    if (nbStrap84 > 0) {
                        var orderPiece84 = self.get('parentController').initOrderPiece(8 + '');
                        console.log('Ember.run.next');console.log("orderPiece84 8");console.log(orderPiece84);console.log('nbStrap84 :'+nbStrap84+' strapLength :'+84);
                        Ember.run.next(self, self.generateOrderPiece, orderPiece84, {nb: nbStrap84, strapLength: 84});
                    }
                    if (nbStrap112 > 0) {
                        var orderPiece112 = self.get('parentController').initOrderPiece(8 + '');
                        Ember.run.next(self, self.generateOrderPiece, orderPiece112, {nb: nbStrap112, strapLength: 112});
                    }
                });

            });
        }
    },
    generateOrderPiece: function(orderPiece, piece) {console.log('RCD generateOrderPiece');console.log('orderPiece :');console.log(orderPiece);
        console.log('piece :');console.log(piece);

    var self = this;

        if (piece.l) {
            orderPiece.get('options').then(function(orderPieceOptions) {console.log('orderPieceOptions.findBy');console.log(orderPieceOptions.findBy('optionType.id', 1 + '').get('clientId'));
                self.set('parentController.firstColController.orderPieceOption_' + orderPieceOptions.findBy('optionType.id', 1 + '').get('clientId') + '_value', piece.l);
            });
        } else if (piece.strapLength) {
            orderPiece.get('piece').then(function(pieceRef) {
                pieceRef.get('options').then(function(options) {
                    var option = options.findBy('label', piece.strapLength + '');

                    orderPiece.get('options').then(function(orderPieceOptions) {
                        self.set('parentController.firstColController.orderPieceOption_' + orderPieceOptions.findBy('optionType.id', 19 + '').get('clientId'), option);
                    });
                });
            });
        }
        else if (piece.Ab) {
            orderPiece.get('piece').then(function(pieceRef) {
                pieceRef.get('options').then(function(options) {
                    var option = options.findBy('label', piece.Ab + '');

                    orderPiece.get('options').then(function(orderPieceOptions) {
                        self.set('parentController.firstColController.orderPieceOption_' + orderPieceOptions.findBy('optionType.id', 28 + '').get('clientId'), option);
                    });
                });
            });
        }

        this.set('pieceOrder_' + orderPiece.get('clientId') + '_value', piece.nb);
    }
});