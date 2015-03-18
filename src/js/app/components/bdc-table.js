/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

!function() {
    PASC = Ember.Namespace.create();
    /**
     * Plugin pour effectuer la mise en forme tableau d'un bon de commande
     */
    PASC.BdcTable = PASC.BdcTable || Ember.Namespace.create({
        VERSION: '0.0.1-beta1'
    });
}(), function() {
    PASC.BdcTable.StyleBindingsMixin = Ember.Mixin.create({
        concatenatedProperties: ['styleBindings'],
        attributeBindings: ['style'],
        unitType: 'px',
        createStyleString: function(styleName, property) {
            var value;
            value = this.get(property);
            if (value === void 0) {
                return;
            }
            if (Ember.typeOf(value) === 'number') {
                value = value + this.get('unitType');
            }
            return "" + styleName + ":" + value + ";";
        },
        applyStyleBindings: function() {
            var lookup, properties, styleBindings, styleComputed, styles,
                _this = this;
            styleBindings = this.styleBindings;
            if (!styleBindings) {
                return;
            }
            lookup = {};
            styleBindings.forEach(function(binding) {
                var property, style, tmp;
                tmp = binding.split(':');
                property = tmp[0];
                style = tmp[1];
                lookup[style || property] = property;
            });
            styles = Ember.keys(lookup);
            properties = styles.map(function(style) {
                return lookup[style];
            });
            styleComputed = Ember.computed(function() {
                var styleString, styleTokens;
                styleTokens = styles.map(function(style) {
                    return _this.createStyleString(style, lookup[style]);
                });
                styleString = styleTokens.join('');
                if (styleString.length !== 0) {
                    return styleString;
                }
            });
            styleComputed.property.apply(styleComputed, properties);
            return Ember.defineProperty(this, 'style', styleComputed);
        },
        init: function() {
            this.applyStyleBindings();
            return this._super();
        }
    });
}(), function() {
    /**
     * Propriété de base pour les différentes vues du tableau
     * @class ViewMixin
     * @namespace BdcTable
     * @uses Ember.Mixin
     * @uses BdcTable.StyleBindingsMixin
     */
    PASC.BdcTable.ViewMixin = Ember.Mixin.create(PASC.BdcTable.StyleBindingsMixin, {
        inDom: false,
        didInsertElement: function() {
            this.set('inDom', true);
            return this._super();
        },
        willDestroyElement: function() {
            this.set('inDom', false);
            return this._super();
        }
    });

    /**
     * Définition de base pour les "columnController"
     * @class ColumnControllerMixin
     * @namespace BdcTable
     * @uses Ember.Mixin
     */
    PASC.BdcTable.ColumnControllerMixin = Ember.Mixin.create({
        target: Ember.computed.alias('parentController'),
        store: Ember.computed.alias('parentController.store'),
        actions: {
            columnClicked: function() {
                if (this.get('model')) {console.log("bdc t: columnClicked");console.log("model");console.log(this.get('model'));console.log("parentC");console.log(this.get('parentController'));
                    this.get('parentController').send('selectColumn', this.get('model'));
                } else {
                    this.get('parentController').send('selectColumn');
                }
            }
        },
        isSelected: false,
        isEditing: Ember.computed.alias('parentController.isEditing')
    });

    /**
     * Définition de base pour les "cell"
     * @class CellMixin
     * @namespace BdcTable
     * @uses Ember.Mixin
     * @uses BdcTable.ViewMixin
     */
    PASC.BdcTable.CellMixin = Ember.Mixin.create(PASC.BdcTable.ViewMixin, {
        content: Ember.computed.alias('parentView.content'),
        classNames: ['bdc-table-cell']
    });

    /**
     * Définition de base pour les "column"
     * @class ColumnMixin
     * @namespace BdcTable
     * @uses Ember.Mixin
     * @uses BdcTable.ViewMixin
     */
    PASC.BdcTable.ColumnMixin = Ember.Mixin.create(PASC.BdcTable.ViewMixin, {
        classNames: ['bdc-table-column'],
        classNameBindings: ['controller.isSelected:selected'],
        styleBindings: ['width'],
        width: Ember.computed.alias('controller.width'),
        isSelected: Ember.computed.alias('controller.isSelected'),
        click: function() {
            this.get('controller').send('columnClicked');
        }
    });

    /**
     * Définition de base pour les "wrapper"
     * @class WrapperMixin
     * @namespace BdcTable
     * @uses Ember.Mixin
     * @uses BdcTable.ViewMixin
     */
    PASC.BdcTable.WrapperMixin = Ember.Mixin.create(PASC.BdcTable.ViewMixin, {
        classNames: ['bdc-table-container']
    });

    /**
     * Définition de base pour les champs de saisie
     * @class ValidatableMixin
     * @namespace BdcTable
     * @uses Ember.Mixin
     * @uses Ember.Validations.Mixin.ValidatableInput
     */
    PASC.BdcTable.ValidatableMixin = Ember.Mixin.create(Ember.Validations.Mixin.ValidatableInput, {
        action: null,
        updateValidationLayout: function(messageIsHidden) {
            var elt = this.$();

            if (messageIsHidden) {
                if (Ember.isEmpty(this.get('parentView.controller.' + this.get('nameInController'))))
                    this.set('prevValue', null);
                elt.qtip('hide').qtip('disable');
            } else {
                elt.qtip('enable').qtip(
                    'option',
                    'content.text',
                    this.get('parentView.controller.validationResults').findBy('name', this.get('nameInController')).get('errorMessage').replace(/FIELD_ID/g, elt.attr('id'))
                    );
                if (this.get('hasError')) {
                    elt.qtip('option', 'hide.event', 'blur').qtip('option', 'show.event', 'focus').qtip('show');
                } else {
                    elt.qtip('option', 'show.event', 'mouseenter focus').qtip('option', 'hide.event', 'blur mouseleave');
                }
            }
        }
    });

}(), function() {
    /**
     * 
     * @class TextField
     * @namespace BdcTable
     * @uses Ember.Validations.Mixin.ValidatableInput
     * @extends Ember.TextField
     */
    PASC.BdcTable.TextField = Ember.TextField.extend(PASC.BdcTable.ValidatableMixin, {
        /**
         * Indique si une recherche d'action après validation doit être faite
         * @property searchForLateAction
         * @type {Boolean}
         * @default false
         */
        searchForLateAction: false,
        init: function() {
            this._super();

            if (this.get('parentView.controller.' + this.get('name') + '_value') !== undefined) {
                this.set('nameInController', this.get('name') + '_value');
            }
            this.set('value', this.get('parentView.controller.' + this.get('nameInController')));
            console.log('bdc t init:');console.log("value = :"+this.get('parentView.controller.' + this.get('nameInController')))
            if (this.get('searchForLateAction')) {
                this.set('afterValidation', function() {
                    this.get('parentView.controller').send('updateCategory', this.get('parentView.parentView.pieceType.id'));
                });
            }
        },
        keyUp: function(e) {
            this.get('parentView.controller').set(this.get('nameInController'), this.get('value'));

            if (!Ember.isBlank(this.get('maxlength')) && !Ember.isEmpty(this.get('value')) && this.get('maxlength') === this.get('value').length) {
                this.validate();
                return;
            }

            if (Ember.isBlank(this.get('maxlength')) && !Ember.isEmpty(this.get('value'))) {
                Ember.run.cancel(this.get('isWaiting'));

                this.set('isWaiting', Ember.run.later(this, function() {
                    if (!this.get('isDestroyed'))
                        this.validate();
                }, 750));
                return this._super(e);
            }

            return this._super(e);
        },
        didInsertElement: function() {
            this.addObserver('parentView.controller.' + this.get('nameInController'), function(sender, key) {
                sender.set('value', sender.get(key));
            });

            this._super();
        },
        willDestroyElement: function() {
            this.removeObserver('parentView.controller.' + this.get('nameInController'));

            this._super();
        }
    });

    /**
     * 
     * @class Select
     * @namespace BdcTable
     * @uses Ember.Validations.Mixin.ValidatableInput
     * @extends Ember.Select
     */
    PASC.BdcTable.Select = Ember.Select.extend(PASC.BdcTable.ValidatableMixin, {
        init: function() {
            this._super();

            this.set('selection', this.get('controller.' + this.get('name')));
        },
        change: function() {
            this.get('controller').set(this.get('name'), this.get('selection'));

            Ember.run.next(this, this.validate);
        },
        didInsertElement: function() {
            this.addObserver('controller.' + this.get('name'), function(sender, key) {
                sender.set('selection', sender.get(key));
            });

            this._super();
        },
        willDestroyElement: function() {
            this.removeObserver('controller.' + this.get('name'));

            this._super();
        }
    });
}(), function() {
    /**
     * Contrôleur pour les colonnes du contenu du tableau
     * @class ColControllerMixin
     * @namespace BdcTable
     * @uses Ember.Mixin
     * @uses Ember.Validations.Mixin.Validator
     * @uses PASC.BdcTable.ColumnControllerMixin
     */
    PASC.BdcTable.ColControllerMixin = Ember.Mixin.create(Ember.Validations.Mixin.Validator, PASC.BdcTable.ColumnControllerMixin, {
        actions: {
            moveLeft: function() {
                this.get('parentController.contentController').send('moveLeft', this.get('model'));
            },
            moveRight: function() {
                this.get('parentController.contentController').send('moveRight', this.get('model'));
            },
            removeConveyor: function() {
                this.get('parentController').send('removeConveyor', this.get('model'));
            },
            updateCategory: function(pieceTypeId) {
            },
            calculate: function(pieceTypeId) {
            }
        },
        submitForm: function() {
            this.get('parentController.parentController').send('submitForm');
               
            return Ember.RSVP.Promise.resolve();
        },
        headerData: Ember.computed(function() {
            return Ember.A();
        }),
        rowData: Ember.computed.alias('parentController.headerRowData'),
        width: Ember.computed.alias('parentController.colWidth'),
        EgValues: Ember.computed.alias('parentController.EgValues'),
        atZero: Ember.computed(function() {
            return parseInt(this.get('position'), 10) === 0;
        }).property('position'),
        atEnd: Ember.computed(function() {
            return parseInt(this.get('position'), 10) === (this.get('parentController.childControllers.length') - 1);
        }).property('position', 'parentController.childControllers.length'),
        hasAlreadyCalculated: function(pieceTypeId) {
            return false;
        },
        getTextForDialogWarning: function(pieceTypeId) {
            return "";
        },
        init: function() {
            this._super();

            this.addValidation('ref', ValidationsLibrary.get(this.get('id'), 'ref'));
            this.addValidation('eg', ValidationsLibrary.get(this.get('id'), 'eg'), true);
            this.addValidation('zone', ValidationsLibrary.get(this.get('id'), 'zone'), true);
            this.addValidation('ral', ValidationsLibrary.get(this.get('id'), 'ral'), true);
            this.addValidation('ralUnderConveyor', ValidationsLibrary.get(this.get('id'), 'ralUnderConveyor'), true);

            this.initHeaderData();

            Ember.run.next(this, this.copyPreviousOptions);
        },
        willDestroy: function() {
            this.get('parentController.childObservers').forEach(function(observer) {
                this.removeObserver(observer);
            }, this);
        },
        initHeaderData: function() {
            var headerData = [
                Ember.Object.create({
                    kind: 'position'
                }),
                Ember.Object.create({
                    name: 'ref',
                    kind: 'conveyorProperties'
                })
            ];

            var parentHeaderData = this.get('parentController.headerData');

            for (var i = 2; i < parentHeaderData.length; ++i) {
                headerData.pushObject(parentHeaderData.objectAt(i));
            }

            this.set('headerData', headerData);
        },
        copyPreviousOptions: function() {
            if (parseInt(this.get('position'), 10) > 0) {
                var previousCtrl = this.get('parentController.childControllers').findBy('position', this.get('position') - 1);
                var self = this;

                this.get('options').then(function(options) {
                    options.forEach(function(option) {
                        self.set('conveyorOption_' + option.get('optionType.id'), previousCtrl.get('conveyorOption_' + option.get('optionType.id')));
                        if (previousCtrl.get('conveyorOption_' + option.get('optionType.id') + '_value') !== undefined) {
                            self.set('conveyorOption_' + option.get('optionType.id') + '_value', previousCtrl.get('conveyorOption_' + option.get('optionType.id') + '_value'));
                        }
                    });
                });
            }
        },
        getPieceOrder: function(orderPiece, pieceTypeId) {
            var orderPieceId = orderPiece.get('clientId');
            var newPieceOrder = this.get('pieceOrders').findBy('orderPiece.clientId', orderPieceId + '');

            if (Ember.isEmpty(newPieceOrder)) {

                newPieceOrder = this.get('store').createRecord('pieceOrder', {
                    conveyor: this.get('model'),
                    orderPiece: orderPiece
                });

                this.get('pieceOrders').then(function(pieces) {
                    pieces.addObject(newPieceOrder);
                });

            }

            if (this.get('pieceOrder_' + orderPieceId + '_value') === undefined) {
                this.addValidation('pieceOrder_' + orderPieceId + '_value', ValidationsLibrary.get(this.get('parentController.conveyorType.id'), 'pieceType_' + pieceTypeId));

                this.set('pieceOrder_' + orderPieceId + '_value', newPieceOrder.get('nbPieces'));

                this.addObserver('pieceOrder_' + orderPieceId + '_value', function(sender, key) {
                    newPieceOrder.set('nbPieces', sender.get(key));
                });

                if (!this.get('parentController.childObservers').contains('pieceOrder_' + orderPieceId + '_value')) {
                    this.get('parentController.childObservers').pushObject('pieceOrder_' + orderPieceId + '_value');
                }
            }

            return newPieceOrder;
        },
        getConveyorOption: function(optionTypeId) {
            var newConvOption = this.get('options').findBy('optionType.id', optionTypeId + '');

            var opts = this.get('parentController.conveyorType.conveyorTypeOptions').map(function(cOpt) {
                if (cOpt.get('isConveyorOption') && cOpt.get('option.optionType.id') + '' === optionTypeId + '') {
                    return cOpt.get('option.content');
                }
            }).compact();

            var defaultVal = opts.findBy('isDefault', true);

            var ret = Ember.Object.create({
                name: 'conveyorOption_' + optionTypeId,
                options: opts.length > 0 && opts.objectAt(0).get('isCustomizable') ? opts.objectAt(0) : opts,
                isArray: !(opts.length > 0 && opts.objectAt(0).get('isCustomizable')),
                isOptType26: optionTypeId === 26 + ''
            });

            if (Ember.isEmpty(newConvOption)) {

                newConvOption = this.get('store').createRecord('conveyorOption', {
                    optionType: this.get('parentController.parentController.OptionTypes').findBy('id', optionTypeId + ''),
                    option: defaultVal ? defaultVal : null,
                    optionValue: defaultVal ? defaultVal.get('value') : ''
                });

                this.get('options').then(function(options) {
                    options.addObject(newConvOption);
                });
            }

            if (this.get('conveyorOption_' + optionTypeId) === undefined || (optionTypeId + '' === 19 + '' && this.get('conveyorOption_' + optionTypeId + '.label') + '' === 0 + '')) {
                this.set('conveyorOption_' + optionTypeId, defaultVal);

                this.addObserver('conveyorOption_' + optionTypeId, function(sender, key) {
                    newConvOption.set('option', sender.get(key));
                });

                if (ret.get('isArray')) {
                    this.addValidation('conveyorOption_' + optionTypeId, ValidationsLibrary.get(this.get('parentController.conveyorType.id'), 'conveyorOption_' + optionTypeId), true);

                    if (!this.get('parentController.childObservers').contains('conveyorOption_' + optionTypeId)) {
                        this.get('parentController.childObservers').pushObject('conveyorOption_' + optionTypeId);
                    }
                } else {
                    this.set('conveyorOption_' + optionTypeId + '_value', optionTypeId === 26 + '' ? parseInt(this.get('conveyorOption_19.label'), 10) * 2 : defaultVal.get('value'));
                    this.addValidation('conveyorOption_' + optionTypeId + '_value', ValidationsLibrary.get(this.get('parentController.conveyorType.id'), 'conveyorOption_' + optionTypeId));

                    this.addObserver('conveyorOption_' + optionTypeId + '_value', function(sender, key) {
                        newConvOption.set('optionValue', sender.get(key));
                    });

                    if (!this.get('parentController.childObservers').contains('conveyorOption_' + optionTypeId)) {
                        this.get('parentController.childObservers').pushObjects(['conveyorOption_' + optionTypeId, 'conveyorOption_' + optionTypeId + '_value']);
                    }
                }
            }

            return ret;
        }
    });

    /**
     * Contrôleur pour la première colonne
     * @class FirstColController
     * @namespace BdcTable
     * @uses PASC.BdcTable.ColumnController
     */
    PASC.BdcTable.FirstColController = Ember.Controller.extend(Ember.Validations.Mixin.Validator, PASC.BdcTable.ColumnControllerMixin, {
        width: Ember.computed.alias('parentController.headerColWidth'),
        submitForm: function() {
            this.get('parentController.parentController').send('submitForm');

            return Ember.RSVP.Promise.resolve();
        }
    });
}(), function() {
    PASC.BdcTable.ContentController = Ember.ArrayController.extend({
        actions: {
            addConveyor: function() {
                this.initConveyor();
            },
            moveLeft: function(conveyor) {
                this.updateConveyorPosition(conveyor, this.get('sortAscending') ? -1 : 1);
            },
            moveRight: function(conveyor) {
                this.updateConveyorPosition(conveyor, this.get('sortAscending') ? 1 : -1);
            }
        },
        updateConveyorPosition: function(conveyor, delta) {
            var otherConveyor = this.get('content').findBy('position', conveyor.get('position') + delta);

            this.get('parentController').send('selectColumn', conveyor);

            conveyor.incrementProperty('position', delta);
            otherConveyor.decrementProperty('position', delta);
        },
        content: Ember.computed.alias('parentController.conveyors'),
        sortProperties: ['position'],
        sortAscending: Ember.computed.alias('parentController.sortAscending'),
        target: Ember.computed.alias('parentController'),
        store: Ember.computed.alias('parentController.store'),
        initConveyor: function() {
            var previousConv = this.get('content.length') > 0 ? this.get('parentController.childControllers').objectAt(this.get('content.length') - 1) : undefined;

            var newConv = this.get('store').createRecord('conveyor', {
                order: this.get('parentController.model'),
                eg: previousConv ? previousConv.get('eg') : this.get('parentController.deal.eg'),
                zone: previousConv ? previousConv.get('zone') : undefined,
                position: this.get('content.length')
            });

            this.addObject(newConv);
        }
    });
}(), function() {
    /**
     * Contrôleur de la vue principale
     * @class TableController
     * @namespace BdcTable
     * @extends Ember.ObjectController
     * @uses PASC.BdcTable.ControllerMixin
     */
    PASC.BdcTable.TableController = Ember.ObjectController.extend({
        actions: {
            addConveyor: function() {
                this.get('contentController').send('addConveyor');
            },
            removeConveyor: function(conveyor) {
                this.deleteConveyor(conveyor);
            },
            addLine: function(pieceTypeId) {console.log('addline');console.log('pieceTypeId');
                this.initOrderPiece(pieceTypeId);
            },
            removeLine: function(pieceTypeId) {
                this.cleanUpOrderPiece(pieceTypeId);
            },
            selectColumn: function(conv) {
                if (conv) {
                    if (Ember.isEmpty(this.get('selectedColumn')) || conv.get('clientId') !== this.get('selectedColumn').get('clientId')) {
                        this.getChildController(conv).set('isSelected', true);

                        this.unselectColumns();

                        this.set('selectedColumn', conv);
                    }
                } else {
                    this.unselectColumns();
                }
            },
            conveyorsDidChange: function() {
                Ember.run.next(this, function() {
                    this.set('needToResize', true);
                });
            }
        },
        isEditing: Ember.computed.alias('parentController.isEditing'),
        clearChildControllers: function() {
            this.set('selectedColumn', null);
            this.get('childControllers').forEach(function(ctrl) {
                ctrl.destroy();
            });

            this.set('childControllers', Ember.A());
            this.clearOtherProperties();
        },
        clearOtherProperties: function() {
            this.get('firstColController').destroy();
            this.get('contentController').destroy();

            this.set('firstColController', null);
            this.set('contentController', null);
        },
        deleteConveyor: function(conveyor) {
            this.get('conveyors').then(function(conveyors) {
                conveyors.removeObject(conveyor);
            });

            var ctrl = this.get('childControllers').findBy('model.clientId', conveyor.get('clientId'));
            this.set('selectedColumn', null);
            this.get('childControllers').removeObject(ctrl);
            ctrl.destroy();

            this.get('childControllers').forEach(function(ctrl) {
                if (parseInt(ctrl.get('position'), 10) > parseInt(conveyor.get('position'), 10)) {
                    ctrl.decrementProperty('position');
                }
            });

            Ember.RSVP.Promise.all([conveyor.get('pieceOrders').then(function(pieceOrders) {
                    pieceOrders.forEach(function(pieceOrder) {
                        pieceOrder.deleteRecord();
                    });
                }), conveyor.get('options').then(function(options) {
                    options.forEach(function(option) {
                        option.deleteRecord();
                    });
                })]).then(function() {
                conveyor.deleteRecord();
            });
        },
        EgValues: Ember.computed(function() {
            var data = [];
            // Create a list of possible EG
            for (var i = 6; i < 13; ++i) {
                data.push({id: 50 * i + 30});
            }

            return data;
        }).property(),
        cleanUpOrderPiece: function(pieceTypeId) {
            var self = this;
            var orderPieceToRemove;
            var rowData = this.get('headerRowData').find(function(row) {
                return row.get('kind') === 'pieceType' && row.get('pieceType.id') === pieceTypeId;
            });

            orderPieceToRemove = rowData.get('pieces').filter(function(piece) {
                return this.get('childControllers').every(function(ctrl) {
                    return (ctrl.get('pieceOrder_' + piece.get('clientId') + '_value') + '' === 0 + '')||ctrl.get('pieceOrder_' + piece.get('clientId') + '_value') + '' === '' + '' ;
                });
            }, this);

            this.get('orderPieces').then(function(orderPieces) {
                orderPieces.removeObjects(orderPieceToRemove);
            });
            rowData.get('pieces').removeObjects(orderPieceToRemove);

            Ember.RSVP.Promise.all(this.get('childControllers').map(function(ctrl) {
                return ctrl.get('pieceOrders').then(function(pieceOrders) {
                    return Ember.RSVP.Promise.all(orderPieceToRemove.map(function(orderPiece) {
                        return Ember.RSVP.Promise.all(pieceOrders.map(function(pieceOrder) {
                            return pieceOrder.get('orderPiece').then(function(orderP) {
                                if (orderP.get('clientId') === orderPiece.get('clientId')) {
                                    pieceOrders.removeObject(pieceOrder);
                                    pieceOrder.deleteRecord();
                                }
                            });
                        }));
                    }));
                });
            })).then(function() {
                orderPieceToRemove.forEach(function(orderPiece) {
                    orderPiece.get('options').then(function(options) {
                        options.map(function(option) {
                            option.deleteRecord();
                        });
                        orderPiece.deleteRecord();
                    });
                });
                Ember.run.next(self, self.send, 'conveyorsDidChange');
            });
        },
        needToResize: false,
        childControllers: Ember.computed(function() {
            return Ember.A();
        }),
        childObservers: Ember.computed(function() {
            return Ember.A();
        }),
        firstColController: null,
        sortAscending: false,
        getPieceList: function(pieceTypeId) {
            if (Ember.isEmpty(this.get('conveyorType.pieceAvailabilities'))) {
                return [];
            }

            return this.get('conveyorType.pieceAvailabilities').filter(function(pieceAvailability) {
                return pieceAvailability.get('piece.pieceType.id') === pieceTypeId + '' &&
                    pieceAvailability.get('piece.climats').isAny('id', this.get('climat.id')) &&
                    pieceAvailability.get('isActive');
            }, this).map(function(pieceAvailability) {
                return pieceAvailability.get('piece.content');
            });
        },
        isTableValid: Ember.computed(function() {
            var val = this.get('childControllers.length') > 0 && this.get('childControllers').isEvery('isFormValid', true) && this.get('firstColController.isFormValid');

            return val;
        }).property('childControllers.length', 'childControllers.@each.isFormValid', 'firstColController.isFormValid'),
        getPieceOptionsList: function(piece, orderPiece) {
            var optTypes = [];

            if (Ember.isEmpty(piece) || Ember.isEmpty(orderPiece)) {
                return optTypes;
            }

            piece.get('options').forEach(function(opt) {
                var existingOpt = this.findBy('optionTypeId', opt.get('optionType.id'));

                if (existingOpt) {
                    existingOpt.get('options').pushObject(opt);
                    if (opt.get('isDefault')) {
                        existingOpt.set('defaultVal', opt);
                    }
                } else {
                    var optType = Ember.Object.create({
                        optionTypeId: opt.get('optionType.id'),
                        optionType: opt.get('optionType.content'),
                        options: opt.get('isCustomizable') ? opt : [opt],
                        isArray: !opt.get('isCustomizable'),
                        defaultVal: opt.get('isDefault') ? opt : null
                    });

                    this.pushObject(optType);
                }
            }, optTypes);

            optTypes.forEach(function(optType) {console.log('optType');console.log(optType);
                var newOrderPieceOption = this.get('store').createRecord('orderPieceOption', {
                    orderPiece: orderPiece,
                    optionType: optType.get('optionType'),
                    option: optType.get('defaultVal'),
                    optionValue: optType.get('defaultVal') ? optType.get('defaultVal.value') : null
                });

                optType.set('pieceOption', newOrderPieceOption);
                optType.set('name', 'orderPieceOption_' + newOrderPieceOption.get('clientId'));
            }, this);

            orderPiece.get('options').then(function(options) {
                options.pushObjects(optTypes.map(function(optType) {
                    return optType.get('pieceOption');
                }));
            });

            return optTypes;
        },
        getChildController: function(conv) {
            if (conv) {
                if (!this.get('childControllers').findBy('model.clientId', conv.get('clientId'))) {
                    this.get('childControllers').pushObject(this.get('parentController.tableColBaseController').create({
                        parentController: this,
                        content: conv
                    }));
                }

                return this.get('childControllers').findBy('model.clientId', conv.get('clientId'));
            } else {
                if (!this.get('firstColController')) {
                    this.set('firstColController', PASC.BdcTable.FirstColController.create({
                        parentController: this
                    }));
                }

                return this.get('firstColController');
            }
        },
        unselectColumns: function() {
            if (!Ember.isEmpty(this.get('selectedColumn'))) {
                this.getChildController(this.get('selectedColumn')).set('isSelected', false);
            }
            this.set('selectedColumn', null);
        },
        scrollTop: 0,
        scrollLeft: 0,
        selectedColumn: null,
        target: Ember.computed.alias('parentController.target'),
        store: Ember.computed.alias('parentController.store'),
        content: Ember.computed.alias('parentController.model'),
        contentController: null,
        headerRowData: [],
        headerData: [],
        rowHeight: 33,
        colWidth: 150,
        headerColWidth: 200,
        init: function() {
            var ret = this._super();

            this.set('parentController.tableController', this);

            this.set('contentController', PASC.BdcTable.ContentController.create({
                parentController: this
            }));

            this.initHeaderData();
            this.initHeaderRowData();

            return ret;
        },
        initOrderPiece: function(pieceTypeId, existingOrderPiece,piece) {
            var newOrderPiece;
                        if(arguments.length ==1){ newOrderPiece = this.get("store").createRecord("orderPiece", {order:this.get('model')
                
            })} 
            else {if(arguments.length ==2) newOrderPiece = existingOrderPiece, this.set("orderPiece_" + newOrderPiece.get("id"), existingOrderPiece.get("piece"));
            else if(arguments.length ==3) {newOrderPiece = this.get("store").createRecord("orderPiece", {order:this.get('model')
                
            });
                this.set("orderPiece_" + newOrderPiece.get("clientId"), this.getPiece(piece))

            }

    }
            
            this.addObserver('orderPiece_' + newOrderPiece.get('id'), function(sender, key) {
                newOrderPiece.set('piece', sender.get(key));
            });
            console.log('nouveaux orderpiece cree');
            console.log(newOrderPiece);
            this.get('orderPieces').then(function(orderPieces) {
                orderPieces.pushObject(newOrderPiece);
            });

            var rowData = this.get('headerRowData').find(function(row) {
                return row.get('kind') === 'pieceType' && row.get('pieceType.id') === pieceTypeId;
            });

            rowData.get('pieces').pushObject(newOrderPiece);

            Ember.run.next(this, this.send, 'conveyorsDidChange');
            console.log('initorderpiece:');
            console.log(newOrderPiece);
            return newOrderPiece;
        },
        initHeaderData: function() {
            var headerData = [
                Ember.Object.create({
                    label: '',
                    kind: 'conveyorProperties'
                }),
                Ember.Object.create({
                    label: 'Repère',
                    kind: 'conveyorProperties'
                })
            ];

            if (this.get('conveyorType.conveyorTypeOptions').isAny('option.optionType.id', 2 + '')) {
                headerData.pushObject(Ember.Object.create({
                    label: 'Longueur (en mm)',
                    kind: 'conveyorTypeOption',
                    id: "2"
                }));
            } else if (this.get('conveyorType.conveyorTypeOptions').isAny('option.optionType.id', 3 + '')) {
                headerData.pushObject(Ember.Object.create({
                    label: 'Emprise au sol (en m)',
                    kind: 'conveyorTypeOption',
                    id: "3"
                }));
            }

            this.set('headerData', headerData);
        },getPiece:function(pieceId){
var p = this.get("conveyorType.pieceAvailabilities").get('content').toArray();
            var piece = p.findBy('piece.id',pieceId+'')._data.piece;
            console.log(piece);
            return piece},
        initHeaderRowData: function() {
            var headerRowData = [
                Ember.Object.create({
                    kind: 'conveyorProperties'
                })
            ];

            var optTypes = [];

            this.get('conveyorType.conveyorTypeOptions').forEach(function(opt) {console.log('opt :');console.log(opt.get('option.optionType.label'));
                if (opt.get('isConveyorOption') && opt.get('option.optionType.id') !== 2 + '' && opt.get('option.optionType.id') !== 3 + '') {
                    if (!optTypes.findBy('id', opt.get('option.optionType.id'))) {
                        optTypes.pushObject(Ember.Object.create({
                            kind: 'conveyorTypeOption',
                            label: opt.get('option.optionType.label'),
                            id: opt.get('option.optionType.id')
                        }));
                    }
                }
            });

            headerRowData.pushObjects(optTypes);

            var orderPieces = [];

            this.get('conveyorType.pieceAvailabilities').forEach(function(pieceAvailability) {
                console.log('pieceAvailabilities :');console.log(pieceAvailability);
                if (!orderPieces.findBy('pieceType.id', pieceAvailability.get('piece.pieceType.id'))) {
                    orderPieces.pushObject(Ember.Object.create({
                        kind: 'pieceType',
                        pieceType: pieceAvailability.get('piece.pieceType.content'),
                        pieces: []
                    }));
                }
            });

            headerRowData.pushObjects(orderPieces);

            this.set('headerRowData', headerRowData);
            
            var self = this;
            this.get('orderPieces').then(function(orderPieces) {
                orderPieces.forEach(function(orderPiece) {console.log('orderPieces :');console.log(piece.pieceType.label);
                    self.initOrderPiece(orderPiece.get('piece.pieceType.id'), orderPiece);
                });
            });
        }
    });
}(), function() {
    /**
     * Encapsule la première colonne
     * @class WrapperView
     * @namespace BdcTable
     * @extends Ember.ContainerView
     * @uses BdcTable.WrapperMixin
     */
    PASC.BdcTable.WrapperView = Ember.ContainerView.extend(PASC.BdcTable.WrapperMixin);

    /**
     * Encapsule la liste des colonnes
     * @class CollectionWrapperView
     * @namespace BdcTable
     * @extends Ember.CollectionView
     * @uses BdcTable.WrapperMixin
     */
    PASC.BdcTable.CollectionWrapperView = Ember.CollectionView.extend(PASC.BdcTable.WrapperMixin, {
        content: Ember.computed.alias('controller.arrangedContent'),
        styleBindings: ['width'],
        width: Ember.computed(function() {
            return this.get('controller.parentController.colWidth') * this.get('content.length');
        }).property('content.length'),
        isHeader: false,
        init: function() {
            this.set('controller', this.get('controller.contentController'));

            return this._super();
        },
        createChildView: function(viewClass, attrs) {
            attrs.controller = this.get('controller.parentController').getChildController(attrs.content);
            attrs.item = attrs.content;

            if (this.get('isHeader')) {
                attrs.content = attrs.controller.get('headerData');
            } else {
                attrs.content = attrs.controller.get('rowData');
            }

            return this._super(viewClass, attrs);
        }
    });
}(), function() {
    /**
     * Définition d'une cellule pour la partie première colonne et un type de donnée "pièce"
     * @class CellHeaderRowView
     * @namespace BdcTable
     * @extends Ember.View
     * @uses BdcTable.CellMixin
     */
    PASC.BdcTable.CellHeaderRowView = Ember.View.extend(PASC.BdcTable.CellMixin, {
        classNames: ['bdc-table-cell-header-row'],
        pieceName: Ember.computed(function() {
            return 'orderPiece_' + this.get('content.clientId');
        }),
        pieceType: Ember.computed.alias('parentView.pieceType'),
        climatDidChange: function() {
            if (this.get('controller.parentController.isSubmitting')) {
                return;
            }

            var pieceList = this.get('controller.parentController').getPieceList(this.get('pieceType.id'), this.get('content'));

            if (!Ember.isEmpty(this.get('piece'))) {
                var self = this;
                this.get('piece.climats').then(function(climats) {
                    if (!climats.isAny('id', self.get('controller.parentController.climat.id'))) {
                        self.set('piece', pieceList.objectAt(0));
                    }
                });
            }

            this.set('pieceList', pieceList);
        }.observes('controller.parentController.climat'),
        pieceList: Ember.A(),
        piece: {},
        init: function() {
            this.set('piece', this.get('controller.parentController.' + this.get('pieceName')));
            this.climatDidChange();

            return this._super();
        },
        didInsertElement: function() {
            this.addObserver('controller.parentController.' + this.get('pieceName'), function(sender, key) {
                sender.set('piece', sender.get(key));
            });
        },
        willDestroyElement: function() {
            this.removeObserver('controller.parentController.' + this.get('pieceName'));
        },
        optTypeList: Ember.A(),
        pieceWillChange: Ember.beforeObserver('piece', function() {
            if (this.get('controller.parentController.isSubmitting')) {
                return;
            }

            this.get('optTypeList').forEach(function(item) {
                var name = item.get('name');
                this.removeObserver('controller.' + name);
                this.removeObserver('controller.' + name + '_value');
                delete this.get('controller')[name];
                delete this.get('controller')[name + '_value'];
                this.get('controller').removeValidation(name);
                this.get('controller').removeValidation(name + '_value');
                item.get('pieceOption').rollback();
            }, this);
        }),
        pieceObserver: function() {
            if (this.get('controller.parentController.isSubmitting')) {
                return;
            }

            this.get('controller.parentController').set(this.get('pieceName'), this.get('piece'));

            var thenablePiece = Ember.RSVP.Promise.cast(this.get('piece'));
            var self = this;

            thenablePiece.then(function(piece) {
                piece.get('options').then(function() {
                    self.pieceDidChange();
                });
            });
        }.observes('piece'),
        pieceDidChange: function() {
            var self = this;
            Ember.RSVP.Promise.cast(this.get('piece')).then(function(piece) {
                self.set('content.piece', piece);
            });

            var optList = this.get('controller.parentController').getPieceOptionsList(this.get('piece'), this.get('content'));

            optList.forEach(function(item) {
                var name = item.get('name');
                this.set('controller.' + name, item.get('defaultVal'));
                this.addObserver('controller.' + name, function(sender, key) {
                    sender.set(name, sender.get(key));
                    item.get('pieceOption').set('option', sender.get(key));
                });

                if (item.get('isArray')) {
                    this.get('controller').addValidation(name, ValidationsLibrary.get(
                        this.get('controller.parentController.conveyorType.id'),
                        'pieceOrderOption_' + item.get('optionType.id')
                        ));
                } else {
                    this.get('controller').addValidation(name + '_value', ValidationsLibrary.get(
                        this.get('controller.parentController.conveyorType.id'),
                        'pieceOrderOption_' + item.get('optionType.id')
                        ));

                    this.set('controller.' + name + '_value', item.get('defaultVal.value'));
                    this.addObserver('controller.' + name + '_value', function(sender, key) {
                        sender.set(name + '_value', sender.get(key));
                        item.get('pieceOption').set('optionValue', sender.get(key));
                    });
                }
            }, this);

            this.set('optTypeList', optList);
        },
        template: Ember.Handlebars.compile(
            "{{#if controller.isEditing}}" +
            "{{view Ember.Select name=view.pieceName content=view.pieceList optionLabelPath='content.label' optionValuePath='content.id' selection=view.piece}}" +
            "{{#if view.optTypeList.length}}" +
            "{{#each item in view.optTypeList}}" +
            "{{#if item.isArray}}" +
            "{{view PASC.BdcTable.Select name=item.name content=item.options optionLabelPath='content.label' optionValuePath='content.id'}}" +
            "{{else}}" +
            "{{view PASC.BdcTable.TextField name=item.name}}" +
            "{{/if}}" +
            "{{/each}}" +
            "{{/if}}{{else}}" +
            "{{view.piece.label}}" +
            "{{/if}}")
    });

    /**
     * Définition d'une cellule pour la partie première colonne et un type de donnée "option"
     * @class CellHeaderRowOptionView
     * @namespace BdcTable
     * @extends Ember.View
     * @uses BdcTable.CellMixin
     */
    PASC.BdcTable.CellHeaderRowOptionView = Ember.View.extend(PASC.BdcTable.CellMixin, {
        classNames: ['bdc-table-cell-header-row'],
        template: Ember.Handlebars.compile("{{view.content.label}}")
    });

    /**
     * Définition d'une cellule pour la partie première colonne et un type de donnée "propritété de convoyeur"
     * @class CellHeaderRowConvView
     * @namespace BdcTable
     * @extends Ember.View
     * @uses BdcTable.CellMixin
     */
    PASC.BdcTable.CellHeaderRowConvView = Ember.View.extend(PASC.BdcTable.CellMixin, {
        classNames: ['bdc-table-cell-content'],
        template: Ember.Handlebars.compile("{{view.content.label}}")
    });
}(), function() {
    /**
     * Définition d'une cellule pour la partie header et un type de donnée "position"
     * @class CellPositionView
     * @namespace BdcTable
     * @extends Ember.View
     * @uses BdcTable.CellMixin
     */
    PASC.BdcTable.CellPositionView = Ember.ContainerView.extend(PASC.BdcTable.CellMixin, {
        classNames: ['bdc-table-cell-position'],
        childViews: ['buttonLeft', 'buttonDelete', 'buttonConfirm', 'buttonCancel', 'buttonRight'],
        actions: {
            removeConveyor: function() {
                this.set('showConfirm', true);
                this.get('buttonDelete').set('isVisible', false);
                this.get('buttonConfirm').set('isVisible', true);
                this.get('buttonCancel').set('isVisible', true);
            },
            cancelRemove: function() {
                this.set('showConfirm', false);
                this.get('buttonDelete').set('isVisible', true);
                this.get('buttonConfirm').set('isVisible', false);
                this.get('buttonCancel').set('isVisible', false);
            },
            confirmRemove: function() {
                this.get('controller').send('removeConveyor');
            }
        },
        init: function() {
            if (!this.get('controller.isEditing')) {
                this.set('childViews', Ember.A());
            }
            
            return this._super();
        },
        showConfirm: false,
        buttonLeft: JQ.ButtonView.extend({
            icons: {
                primary: 'ui-icon-triangle-1-w'
            },
            label: "Déplacer vers la gauche",
            text: false,
            disabled: Ember.computed(function() {
                return this.get('controller.parentController.sortAscending') ? this.get('controller.atZero') : this.get('controller.atEnd');
            }).property('controller.parentController.sortAscending', 'controller.atEnd', 'controller.atZero'),
            click: function() {
                this.get('controller').send('moveLeft');
            }
        }),
        buttonRight: JQ.ButtonView.extend({
            icons: {
                primary: 'ui-icon-triangle-1-e'
            },
            label: "Déplacer vers la droite",
            text: false,
            disabled: Ember.computed(function() {
                return !this.get('controller.parentController.sortAscending') ? this.get('controller.atZero') : this.get('controller.atEnd');
            }).property('controller.parentController.sortAscending', 'controller.atEnd', 'controller.atZero'),
            click: function() {
                this.get('controller').send('moveRight');
            }
        }),
        buttonDelete: JQ.ButtonView.extend({
            icons: {
                primary: 'ui-icon-trash'
            },
            label: "Supprimer le convoyeur",
            text: false,
            click: function() {
                this.get('parentView').send('removeConveyor');
            }
        }),
        buttonConfirm: JQ.ButtonView.extend({
            icons: {
                primary: 'ui-icon-check'
            },
            label: "Confirmer",
            text: false,
            click: function() {
                this.get('parentView').send('confirmRemove');
            },
            isVisible: false
        }),
        buttonCancel: JQ.ButtonView.extend({
            icons: {
                primary: 'ui-icon-close'
            },
            label: "Annuler",
            text: false,
            click: function() {
                this.get('parentView').send('cancelRemove');
            },
            isVisible: false
        })

    });

    /**
     * Définition d'une cellule pour la partie contenu et un type de donnée "propriété de convoyeur"
     * @class CellConvView
     * @namespace BdcTable
     * @extends Ember.View
     * @uses BdcTable.CellMixin
     */
    PASC.BdcTable.CellConvView = Ember.View.extend(PASC.BdcTable.CellMixin, {
        classNames: ['bdc-table-cell-content'],
        init: function() {
            if (this.get('content.name') === 'eg') {
                this.set('eg', 'EgList_' + this.get('controller.clientId'));
            }

            return this._super();
        },
        propertyValue: function() {
            return this.get('controller.' + this.get('content.name'));
        },
        template: Ember.Handlebars.compile(
            "{{#if controller.isEditing}}" +
            "{{#if view.eg}}" +
            "{{view PASC.BdcTable.TextField list=view.eg name=view.content.name}}" +
            "<datalist {{bind-attr id=view.eg}}>" +
            "{{#each controller.parentController.EgValues}}<option {{bind-attr value=id}}>{{id}}</option>{{/each}}" +
            "</datalist>" +
            "{{else}}" +
            "{{view PASC.BdcTable.TextField name=view.content.name}}" +
            "{{/if}}{{else}}" +
            "{{view.propertyValue}}" +
            "{{/if}}"
            )
    });

    /**
     * Définition d'une cellule pour la partie contenu et un type de donnée "piece"
     * @class CellView
     * @namespace BdcTable
     * @extends Ember.View
     * @uses BdcTable.CellMixin
     */
    PASC.BdcTable.CellView = Ember.View.extend(PASC.BdcTable.CellMixin, {
        content: Ember.computed(function() {
            return this.get('controller').getPieceOrder(this.get('parentView.content'), this.get('parentView.pieceType.id'));
        }),
        classNames: ['bdc-table-cell-content'],
        pieceName: Ember.computed(function() {
            return 'pieceOrder_' + this.get('parentView.content.clientId');
        }),
        propertyValue: function() {
            return this.get('controller.' + this.get('pieceName') + '_value');
        },
        template: Ember.Handlebars.compile(
            "{{#if controller.isEditing}}" +
            "{{view PASC.BdcTable.TextField name=view.pieceName disabled=view.content.isComputed searchForLateAction=true}}" +
            "{{else}}{{view.propertyValue}}{{/if}}"
            )
    });

    /**
     * Définition d'une cellule pour la partie contenu et un type de donnée "option"
     * @class CellOptionView
     * @namespace BdcTable
     * @extends Ember.View
     * @uses BdcTable.CellMixin
     */
    PASC.BdcTable.CellOptionView = Ember.View.extend(PASC.BdcTable.CellMixin, {
        classNames: ['bdc-table-cell-content'],
        content: Ember.computed(function() {
            return this.get('controller').getConveyorOption(this.get('parentView.content.id'));
        }),
        needCalculateButton: Ember.computed(function() {
            return this.get('parentView.content.id') === 2 + '';
        }),
        template: Ember.Handlebars.compile("{{#if view.content.isArray}}" +
            "{{view PASC.BdcTable.Select name=view.content.name content=view.content.options optionLabelPath='content.label' optionValuePath='content.id'}}" +
            "{{else}}{{#if view.content.isOptType26}}" +
            "{{view App.Select name='conveyorOption_26_value' content=controller.ConveyorOption_26_valueValues optionLabelPath='content.id' optionValuePath='content.id' value=controller.conveyorOption_26_value}}" +
            "{{else}}" +
            "{{view PASC.BdcTable.TextField name=view.content.name}}" +
            "{{/if}}{{/if}}"
            )
    });
}(), function() {
    /**
     * Définition d'une ligne
     * @class RowView
     * @namespace BdcTable
     * @extends Ember.ContainerView
     * @uses BdcTable.ViewMixin
     */
    PASC.BdcTable.RowView = Ember.ContainerView.extend(PASC.BdcTable.ViewMixin, {
        classNames: ['bdc-table-row'],
        childViews: ['cell']
    });
}(), function() {
    /**
     * Définition abstraite d'un groupe de ligne
     * @class AbstractRowGroupConvView
     * @namespace BdcTable
     * @extends Ember.ContainerView
     * @uses BdcTable.ViewMixin
     */
    PASC.BdcTable.AbstractRowGroupConvView = Ember.CollectionView.extend(PASC.BdcTable.ViewMixin, {
        classNames: ['bdc-table-row-group']
    });

    /**
     * Définition abstraite d'un groupe de ligne
     * @class AbstractRowGroupView
     * @namespace BdcTable
     * @extends Ember.ContainerView
     * @uses BdcTable.ViewMixin
     */
    PASC.BdcTable.AbstractRowGroupView = Ember.ContainerView.extend(PASC.BdcTable.ViewMixin, {
        classNames: ['bdc-table-row-group'],
        childViews: ['titleView', 'contentView']
    });

    /**
     * Vue de la cellule titre d'un groupe de ligne affichant du contenu
     * @class HeaderRowTitleView
     * @namespace BdcTable
     * @extends Ember.ContainerView
     */
    PASC.BdcTable.HeaderRowTitleView = Ember.ContainerView.extend(PASC.BdcTable.CellMixin, {
        classNames: ['bdc-table-row-title'],
        content: Ember.computed.alias('parentView.content.pieceType'),
        childViews: ['title', 'removeButton', 'addButton'],
        title: Ember.View.extend({
            tagName: 'span',
            template: Ember.Handlebars.compile("{{view.parentView.content.label}}")
        }),
        addButton: JQ.ButtonView.extend({
            label: 'Ajouter',
            icons: {
                primary: 'ui-icon-plusthick'
            },
            text: false,
            click: function() {
                this.get('controller').send('addLine', this.get('parentView.content.id'));
            }
        }),
        removeButton: JQ.ButtonView.extend({
            label: 'Supprimer',
            icons: {
                primary: 'ui-icon-minusthick'
            },
            text: false,
            click: function() {
                this.get('controller').send('removeLine', this.get('parentView.content.id'));
            }
        })
    });

    /**
     * Vue de la cellule titre d'un groupe de ligne affichant du contenu
     * @class RowTitleView
     * @namespace BdcTable
     * @extends Ember.View
     */
    PASC.BdcTable.RowTitleView = Ember.View.extend(PASC.BdcTable.CellMixin, {
        classNames: ['bdc-table-row-title'],
        pieceTypeId: Ember.computed(function() {console.log('titre dun groupe de ligne');console.log(this.get('parentView.content.pieceType.id'));
            return this.get('parentView.content.pieceType.id');
        }),
        needCalculateButton: Ember.computed(function() {
            return this.get('pieceTypeId') + '' === 1 + '' || this.get('pieceTypeId') + '' === 2 + '';
        }),
        text: null,
        dialogText: Ember.computed(function() {
            return this.get('controller').getTextForDialogWarning(this.get('pieceTypeId'));
        }),
        init: function() {console.log('RowTitleView init');
            Ember.bind(this, 'text', 'controller.categoryText_' + this.get('pieceTypeId'));

            return this._super();
        },
        template: Ember.Handlebars.compile(
            "<span>{{view.text}}</span>" +
            "{{#if view.needCalculateButton}}" +
            "{{view view.calculateButton}}" +
            "{{#view view.dialog}}{{/view}}" +
            "{{/if}}"
            ),
        calculateButton: JQ.ButtonView.extend(PASC.BdcTable.StyleBindingsMixin, {
            icons: {
                primary: 'ui-icon-calculator'
            },
            label: "Calculer",
            text: false,
            click: function() {
                if (this.get('controller').hasAlreadyCalculated(this.get('parentView.pieceTypeId'))) {
                    var id;

                    this.get('parentView.childViews').forEach(function(v) {
                        if (v.get('modal') === true) {
                            id = v.get('element.id');
                        }
                    });

                    $('#' + id).dialog('open').html(this.get('parentView.dialogText'));
                } else {
                    this.get('controller').send('calculate', this.get('parentView.pieceTypeId'));
                }
            }
        }),
        dialog: JQ.DialogView.extend({
            classNames: ['dialog-calculate-decomposition'],
            resizable: false,
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "blind",
                duration: 500
            },
            autoOpen: false,
            modal: true,
            width: 400,
            title: 'Faire un calcul',
            init: function() {
                var self = this;
                this.set('buttons', [
                    {
                        text: 'Oui',
                        click: function() {
                            self.get('controller').send('calculate', self.get('parentView.pieceTypeId'));
                            $(this).dialog("close");
                        }
                    }, {
                        text: 'Non',
                        click: function() {
                            $(this).dialog("close");
                        }
                    }
                ]);

                return this._super();
            }
        })
    });

    /**
     * Définition du conteneur de la collection de pièce d'un certain type
     * @class RowCollectionView
     * @namespace BdcTable
     * @extends Ember.CollectionView
     * @uses BdcTable.ViewMixin
     */
    PASC.BdcTable.RowCollectionView = Ember.CollectionView.extend(PASC.BdcTable.ViewMixin, {
        classNames: ['bdc-table-row-collection'],
        content: Ember.computed.alias('parentView.content.pieces'),
        createChildView: function(viewClass, attrs) {
            attrs.pieceType = this.get('parentView.content.pieceType');
            console.log('conteneur');console.log(this.get('parentView.content.pieceType'));
            return this._super(viewClass, attrs);
        }
    });

    /**
     * Définition d'un groupe de ligne dans la partie contenu du tableau
     * @class RowGroupView
     * @namespace BdcTable
     * @extends BdcTable.AbstractRowGroupView
     */
    PASC.BdcTable.RowGroupView = PASC.BdcTable.AbstractRowGroupView.extend({
        titleView: PASC.BdcTable.RowTitleView,
        contentView: PASC.BdcTable.RowCollectionView.extend({
            itemViewClass: PASC.BdcTable.RowView.extend({
                cell: PASC.BdcTable.CellView
            })
        })
    });

    /**
     * Définition d'un groupe de ligne dans la première colonne
     * @class RowGroupHeaderRowView
     * @namespace BdcTable
     * @extends BdcTable.AbstractRowGroupView
     */
    PASC.BdcTable.RowGroupHeaderRowView = PASC.BdcTable.AbstractRowGroupView.extend({
        titleView: PASC.BdcTable.HeaderRowTitleView,
        contentView: PASC.BdcTable.RowCollectionView.extend({
            itemViewClass: PASC.BdcTable.RowView.extend({
                cell: PASC.BdcTable.CellHeaderRowView
            })
        })
    });

    /**
     * Définition d'un groupe de ligne pour les propriétés du convoyeur dans la première colonne
     * @class RowGroupHeaderRowView
     * @namespace BdcTable
     * @extends BdcTable.AbstractRowGroupView
     */
    PASC.BdcTable.RowGroupHeaderRowConvView = PASC.BdcTable.AbstractRowGroupConvView.extend({
        itemViewClass: PASC.BdcTable.RowView.extend({
            cell: PASC.BdcTable.CellHeaderRowConvView
        })
    });

    /**
     * Définition d'un groupe de ligne pour les propriétés du convoyeur dans la partie contenu du tableau
     * @class RowGroupHeaderRowView
     * @namespace BdcTable
     * @extends BdcTable.AbstractRowGroupView
     */
    PASC.BdcTable.RowGroupConvView = PASC.BdcTable.AbstractRowGroupConvView.extend({
        itemViewClass: PASC.BdcTable.RowView.extend({
            cell: PASC.BdcTable.CellConvView
        })
    });
}(), function() {

    /** Column */
    PASC.BdcTable.ColumnCornerLeftView = Ember.CollectionView.extend(PASC.BdcTable.ColumnMixin, {
        content: Ember.computed.alias('controller.parentController.headerData'),
        createChildView: function(viewClass, attrs) {
            if (attrs.content.kind === 'conveyorProperties') {
                viewClass = PASC.BdcTable.RowView.extend({
                    cell: PASC.BdcTable.CellHeaderRowConvView
                });
            } else { // conveyorTypeOption
                viewClass = PASC.BdcTable.RowView.extend({
                    cell: PASC.BdcTable.CellHeaderRowOptionView
                });
            }

            return this._super(viewClass, attrs);
        },
        init: function() {
            this.set('controller', this.get('controller').getChildController());

            return this._super();
        }
    });

    PASC.BdcTable.ColumnHeaderView = Ember.CollectionView.extend(PASC.BdcTable.ColumnMixin, {
        createChildView: function(viewClass, attrs) {
            if (attrs.content.kind === 'position') {
                viewClass = PASC.BdcTable.RowView.extend({
                    cell: PASC.BdcTable.CellPositionView
                });
            } else if (attrs.content.kind === 'conveyorProperties') {
                viewClass = PASC.BdcTable.RowView.extend({
                    cell: PASC.BdcTable.CellConvView
                });
            } else {
                viewClass = PASC.BdcTable.RowView.extend({
                    cell: PASC.BdcTable.CellOptionView
                });
            }

            return this._super(viewClass, attrs);
        },
        arrayDidChange: function() {
            this._super.apply(this, arguments);

            Ember.run.next(this, function() {
                if (!Ember.isEmpty(this.get('controller'))) {
                    this.get('controller').send('conveyorsDidChange');
                }
            });
        }
    });

    PASC.BdcTable.ColumnHeaderRowView = Ember.CollectionView.extend(PASC.BdcTable.ColumnMixin, {
        content: Ember.computed.alias('controller.parentController.headerRowData'),
        createChildView: function(viewClass, attrs) {console.log('createchildview1');console.log(attrs);
            if (attrs.content.kind === 'pieceType') {
                viewClass = PASC.BdcTable.RowGroupHeaderRowView;
            } else if (attrs.content.kind === 'conveyorTypeOption') {
                viewClass = PASC.BdcTable.RowView.extend({
                    cell: PASC.BdcTable.CellHeaderRowOptionView
                });
            } else {
                viewClass = PASC.BdcTable.RowGroupHeaderRowConvView;
                attrs.content = [
                    Ember.Object.create({label: 'Zone'}),
                    Ember.Object.create({label: 'Entre-guide'}),
                    Ember.Object.create({label: 'RAL manute'}),
                    Ember.Object.create({label: 'RAL sous manute'})
                ];
            }

            return this._super(viewClass, attrs);
        },
        init: function() {
            this.set('controller', this.get('controller').getChildController());

            return this._super();
        }
    });

    PASC.BdcTable.ColumnView = Ember.CollectionView.extend(PASC.BdcTable.ColumnMixin, {
        createChildView: function(viewClass, attrs) {
            if (attrs.content.kind === 'pieceType') {console.log('createchildview2');console.log(attrs.content.pieceType._data.label);
                viewClass = PASC.BdcTable.RowGroupView;
            } else if (attrs.content.kind === 'conveyorTypeOption') {
                viewClass = PASC.BdcTable.RowView.extend({
                    cell: PASC.BdcTable.CellOptionView
                });
            } else {
                viewClass = PASC.BdcTable.RowGroupConvView;
                attrs.content = [
                    Ember.Object.create({name: 'zone'}),
                    Ember.Object.create({name: 'eg'}),
                    Ember.Object.create({name: 'ral'}),
                    Ember.Object.create({name: 'ralUnderConveyor'})
                ];
            }

            return this._super(viewClass, attrs);
        }
    });
    /** End Column */
}(), function() {

    PASC.BdcTable.AntiscrollInnerView = Ember.ContainerView.extend(PASC.BdcTable.ViewMixin, {
        actions: {
            scroll: function() {
                this.set('controller.scrollTop', -this.$().scrollTop());
                this.set('controller.scrollLeft', -this.$().scrollLeft());

                $('body').scroll();
            }
        },
        classNames: ['antiscroll-inner'],
        content: Ember.computed.alias('parentView.content'),
        styleBindings: ['height'],
        height: Ember.computed.alias('parentView.height'),
        didInsertElement: function() {
            $('.antiscroll-wrap').antiscroll();
            this._super();
            var self = this;
            this.$().on('scroll', function() {
                self.send('scroll');
            });
        },
        willDestroyElement: function() {
            this._super();
            this.$().off('scroll');
        }
    });
}(), function() {

    PASC.BdcTable.CornerLeftView = Ember.ContainerView.extend(PASC.BdcTable.ViewMixin, {
        classNames: ['bdc-table-corner-left'],
        styleBindings: ['height', 'width'],
        width: Ember.computed.alias('parentView.headerColWidth'),
        height: 'auto',
        childViews: [PASC.BdcTable.ColumnCornerLeftView],
        resize: function() {
            if (this.get('controller.childControllers.length') > 0) {
                var self = this;
                this.$('.bdc-table-column').children().each(function(i, elt) {
                    $(elt).height($(self.$().parent().children('.bdc-table-header').find('.bdc-table-column').children()[i]).height());
                });
            }

            this.set('height', this.$('.bdc-table-column').outerHeight());
        }
    });
}(), function() {

    PASC.BdcTable.HeaderView = Ember.ContainerView.extend(PASC.BdcTable.ViewMixin, {
        classNames: ['bdc-table-header'],
        styleBindings: ['width', 'height', 'minHeight:min-height'],
        width: 'auto',
        height: 'auto',
        minHeight: 0,
        childViews: [
            PASC.BdcTable.CollectionWrapperView.extend({
                left: Ember.computed.alias('controller.parentController.scrollLeft'),
                styleBindings: ['left'],
                isHeader: true,
                itemViewClass: PASC.BdcTable.ColumnHeaderView
            })
        ],
        resize: function() {
            this.set('width', this.$().parent().outerWidth() - this.get('parentView.headerColWidth'));
            this.set('minHeight', this.$().parent().children('.bdc-table-corner-left').outerHeight());
            this.set('height', this.$('.bdc-table-column').outerHeight());
        }
    });
}(), function() {

    PASC.BdcTable.HeaderRowView = Ember.ContainerView.extend(PASC.BdcTable.ViewMixin, {
        classNames: ['bdc-table-header-row'],
        styleBindings: ['width', 'height'],
        width: Ember.computed.alias('parentView.headerColWidth'),
        childViews: [
            PASC.BdcTable.WrapperView.extend({
                styleBindings: ['top'],
                top: Ember.computed.alias('controller.scrollTop'),
                childViews: [PASC.BdcTable.ColumnHeaderRowView]
            })
        ],
        height: function() {
            return this.get('parentView.height') - this.get('parentView.cornerLeftView.height');
        }.property('parentView.height', 'parentView.cornerLeftView.height')
    });
}(), function() {

    PASC.BdcTable.ContentView = Ember.ContainerView.extend(PASC.BdcTable.ViewMixin, {
        classNames: ['bdc-table-content', 'antiscroll-wrap'],
        styleBindings: ['width', 'height'],
        width: 'auto',
        height: 'auto',
        childViews: [
            PASC.BdcTable.AntiscrollInnerView.extend({
                childViews: [
                    PASC.BdcTable.CollectionWrapperView.extend({
                        itemViewClass: PASC.BdcTable.ColumnView
                    })
                ]
            })
        ],
        resize: function() {
            this.set('width', this.$().parent().outerWidth() - this.get('parentView.headerColWidth'));
            this.set('height', this.get('parentView.height') - this.get('parentView.cornerLeftView.height'));

            $('.antiscroll-wrap').antiscroll().data('antiscroll').refresh();

            return;
        }
    });
}(), function() {
    /**
     * Vue principale permettant l'affichage du tableau
     * @class BdcTableView
     * @namespace BdcTable
     */
    PASC.BdcTable.BdcTableView = Ember.ContainerView.extend(PASC.BdcTable.ViewMixin, {
        classNames: ['bdc-table-table-container'],
        styleBindings: ['height'],
        height: 'auto',
        resize: function(fromColumn) {
            this.set('height', this.$().parent().outerHeight());

            if (fromColumn) {
                Ember.run.next(this, function() {
                    this.get('headerView').resize();
                    this.get('cornerLeftView').resize();
                    this.get('contentView').resize();
                });
            } else {
                Ember.run.next(this, function() {
                    this.get('childViews').forEach(function(view) {
                        if (typeof view.resize === 'function')
                            view.resize.call(view);
                    });
                });
            }
        },
        rowHeight: Ember.computed.alias('controller.rowHeight'),
        colWidth: Ember.computed.alias('controller.colWidth'),
        headerColWidth: Ember.computed.alias('controller.headerColWidth'),
        childViews: ['cornerLeftView', 'headerView', 'headerRowView', 'contentView'],
        cornerLeftView: PASC.BdcTable.CornerLeftView,
        headerView: PASC.BdcTable.HeaderView,
        headerRowView: PASC.BdcTable.HeaderRowView,
        contentView: PASC.BdcTable.ContentView,
        init: function() {
            this.set('controller', PASC.BdcTable.TableController.create({
                parentController: this.get('controller')
            }));

            return this._super();
        },
        didInsertElement: function() {
            var self = this;
            $(window).on('resize.' + this.get('parentView.element.id'), function() {
                self.resize();
            });
            
            $(window).on('beforeunload', function() {
                return 'Avez-vous bien enregistré les modifications ?';
            });

            this.addObserver('controller.needToResize', function(sender) {
                if (this.get('controller.needToResize')) {
                    sender.resize(true);
                    sender.set('controller.needToResize', false);
                }
            });

            this.resize();

            return this._super();
        },
        willDestroyElement: function() {
            $(window).off("resize." + this.get('parentView.element.id'));
            $(window).off('beforeunload');
            this.removeObserver('controller.needToResize');
            this.get('controller').clearChildControllers();
        }
    });
}(), "undefined" == typeof location || "localhost" !== location.hostname && "127.0.0.1" !== location.hostname;