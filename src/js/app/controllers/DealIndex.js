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
           this.transitionToRoute("deal.createOrder")
        },
        redirect: function(route, id) {
            this.transitionToRoute(route, id);
        },
        delete: function(id) {
            this.get('store').find('order',id).then(function(z){z.deleteRecord();z.save()});
        },
        edit: function(a) {
            this.transitionToRoute("deal.edit", this.get('model').id)
        },
        exporter: function(a) {
            this.transitionToRoute("order.Exporter",a)

        },
        woooow : function(a){console.log('l3eeeeeeeeeeeeeeeeeeeez');

        var sortProp = event.path[0].innerText;
      
        if(sortProp=="Dessinateur") sortProp="drawerName";
        if(sortProp=="Derni\u00e8re \u00e9dition le") sortProp="lastEditedAt";
        if(sortProp=="Edit\u00e9 par") sortProp="createdBy";
        if(sortProp=="Verrouill\u00e9 par") sortProp="lastEditedBy";

            if(this.get("sortProperties").toString().toLowerCase()==sortProp.toLowerCase()) this.set('sortAscending',!this.get('sortAscending'));
            this.set("sortProperties",sortProp.toLowerCase());
            }       
    },
    sortProperties: 'OTP',
    sortAscending: false,
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
        console.log('fhsdkf');
        console.log(this.get('selection'));
        var ths = this;
        console.log('fiiiilter');
        console.log(this.get("sortProperties"));
        var a = [];
        if (this.get("queryField") && 1 < this.get("queryField").length) var b = this.get("queryField").split(" "),
            a = this.get("content.orders").filter(function(a, d) {
                var e = !0;
                $.each(b, function(b, d) {
                    var g = RegExp(d, "i");
                    if (!(g.test(a.get("otp")) || g.test(a.get("conveyorType.abbreviation").toLowerCase()) || g.test(a.get("drawerName")?a.get("drawerName").toLowerCase():"") || g.test(a.get("plan") ? a.get("plan").toLowerCase() : ""))) return e = !1
                });
                return e
            }).sortBy(this.get("sortProperties"));
        else a = this.get("content.orders").sortBy(this.get("sortProperties"));
        console.log('soooort');
        console.log(a);
        return this.get("sortAscending") ? a : a.reverse()
    }.property("content.orders.isLoaded", "content.orders.@each", "queryField", "numRows", "sortProperties", "sortAscending"),
 
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
                                    this.get("controller.parentView.controller").send("showOrder", id);
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
                                disabled: false
                            })
                        })
                    ]
                };
            }
        });
        return [numColumn, typeConvColumn, planColumn, drawerColumn, lastEditedAtColumn, lastEditedByColumn, lockedColumn, actionColumn];
    })
});