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
 * @class DealIndexController
 * @namespace App
 * @extends Ember.ObjectController
 */
App.DealIndexController = Ember.ObjectController.extend({
    needs: ['popInDeal'],
    queryField: null,
    actions: {
        showOrder: function(orderId) {console.log("dealindex : showorder :"+orderId);
            this.transitionToRoute('order/' + orderId);
        },
        redirect: function(route, id) {
            this.transitionToRoute(route, id);
        },
        delete: function(id) {
            console.log('Delete order with id: ' + id);
        },
        edit: function(a) {
            this.transitionToRoute('deal.edit',a);
        },
        exporter: function(a) {
            this.transitionToRoute("order.Exporter",a)

        }
    },
    sortProperties: ['OTP'],
    sortAscending: true,
    /**
     * Nombre d'élément dans la liste à afficher
     * @property numRows
     * @type {Integer}
     */
    numRows: function() {
        if (this.get('filtered') !== undefined)
            return this.get('filtered').get('length');
        else
            return 0;
    }.property('filtered'),
    /**
     * Liste d'élément à afficher
     * @property filtered
     * @type {App.Order[]}
     */
    filtered: function() {
        var data = [];
        
        if (this.get('queryField') && this.get('queryField').length > 1) {
            var queryParams = this.get('queryField').split(' ');
            data = this.get('content.orders').filter(function(item, index) {
                var display = true;
                $.each(queryParams, function(i, param) {
                    var pattern = new RegExp(param, 'i');
                    if (!(
                        pattern.test(item.get('OTP'))
                        || pattern.test(item.get('conveyorType.abbreviation').toLowerCase())
                        || pattern.test(item.get('plan') ? item.get('plan').toLowerCase() : '')
                        )) {
                        display = false;
                        return false;
                    }
                });
                return display;
            }).sortBy(this.get('sortProperties'));
        } else {
            data = this.get('content.orders').sortBy(this.get('sortProperties'));
        }
        
        return (this.get('sortAscending') ? data : data.reverse());
    }.property('content.orders.isLoaded', 'content.orders.@each', 'queryField', 'numRows', 'sortProperties', 'sortAscending'),
    /**
     * Liste des colonnes
     * @property columns
     * @type {Ember.Table.ColumnDefinition[]}
     */
    columns: Ember.computed(function() {
        var numColumn, typeConvColumn, planColumn, drawerColumn, lastEditedAtColumn, lastEditedByColumn, actionColumn, lockedColumn;
        numColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'OTP',
            textAlign: 'text-align-center',
            isResizable: false,
            contentPath: 'otp',
            defaultColumnWidth: 40
        });
        typeConvColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'Type',
            textAlign: 'text-align-center',
            isResizable: false,
            contentPath: 'conveyorType.abbreviation',
            defaultColumnWidth: 50
        });
        planColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'Plan',
            textAlign: 'text-align-center',
            isResizable: false,
            contentPath: 'plan'
        });
        drawerColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'Dessinateur',
            textAlign: 'text-align-center',
            isResizable: false,
            contentPath: 'drawerName',
            minWidth: 90
        });
        lastEditedAtColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'Dernière édition le',
            textAlign: 'text-align-center',
            isResizable: false,
            defaultColumnWidth: 125,
            maxWidth: 125,
            getCellContent: function(row) {
                var d = moment(row.get('lastEditedAt')).format('llll');
                if (d=moment(0).format('llll')) d = "non modifié";
                return d;
            }
        });
        lastEditedByColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'Edité par',
            textAlign: 'text-align-center',
            isResizable: false,
            contentPath: 'lastEditedBy'
        });
        lockedColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'Verrouillé par',
            textAlign: 'text-align-center',
            isResizable: false,
            contentPath: 'lockedBy'
        });
        actionColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'Actions',
            textAlign: 'text-align-center',
            isResizable: false,
            tableCellViewClass: 'App.TableActionCell',
            defaultColumnWidth: 190,
            maxWidth: 190,
            getCellContent: function(row) {
                return {
                    id: row.get('id'),
                    buttonList: [
                        Ember.Object.create({
                            rights: 'all',
                            button: JQ.ButtonView.extend({
                                icons: {
                                    primary: 'ui-icon-document'
                                },
                                label: "Consulter",
                                text: false,
                                click: function() {
                                    
                                    this.get('controller.parentView.controller').send('redirect','order', row.get('id'));
                                }
                            })
                        }), Ember.Object.create({
                            rights: 'all',
                            button: JQ.ButtonView.extend({
                                icons: {
                                    primary: 'ui-icon-pencil'
                                },
                                label: "Editer",
                                text: false,
                                click: function() {
                                    this.get('controller.parentView.controller').send('redirect', 'order.edit', row.get('id'));
                                },
                                disabled: true
                            })
                        }), Ember.Object.create({
                            rights: 'all',
                            button: JQ.ButtonView.extend({
                                icons: {
                                    primary: 'ui-icon-print'
                                },
                                label: "Imprimer",
                                text: false,
                                click: function() {
                                    this.get('controller.parentView.controller').send('redirect', 'order.print', row.get('id'));
                                },
                                disabled: true
                            })
                        }), Ember.Object.create({
                            rights: 'all',
                            button: JQ.ButtonView.extend({
                                icons: {
                                    primary: 'ui-icon-extlink'
                                },
                                label: "Exporter",
                                text: false,
                                click: function() {
                                    this.get('controller.parentView.controller').send('exporter', row.get('id'));
                                }
                            })
                        }), Ember.Object.create({
                            rights: [1, 2],
                            button: JQ.ButtonView.extend({
                                icons: {
                                    primary: 'ui-icon-trash'
                                },
                                label: "Supprimer",
                                text: false,
                                click: function() {
                                    this.get('controller.parentView.controller').send('delete', row.get('id'));
                                },
                                disabled: true
                            })
                        })
                    ]
                };
            }
        });
        return [numColumn, typeConvColumn, planColumn, drawerColumn, lastEditedAtColumn, lastEditedByColumn, lockedColumn, actionColumn];
    })
});