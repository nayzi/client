/* 
 * @license PASC Client - Fives Cinetic
 * Available via the MIT or new BSD license.
 */

App.DealsIndexController = Ember.ArrayController.extend({
    queryField: null,
    needs: ["popInDeals"],
    actions: {
        redirect: function(route, id) {
            this.transitionToRoute(route, id);
        },
        conf: function(a) {
            this.set('controllers.popInDeals.jojo',a);


        },
        delete: function(a) {
        console.log('suprosososos'+a);
            this.get("store").find("deal", a).then(function(a) {
                
                 return Ember.RSVP.Promise.all([    a.get('orders').then(function(os){return os.map(function(o){console.log('suppression de lordre');console.log(o);o.deleteRecord(); o.save();return Ember.RSVP.Promise.resolve()});})]).then(function(f){a.deleteRecord(); a.save()})

                //  a.deleteRecord(); a.save()
                
            })
        },
        create: function() {
            this.transitionToRoute('deals.createDeal');
        },
                woooow: function(a) {
            console.log('l3eeeeeeeeeeeeeeeeeeeez');

            var sortProp = event.path[0].innerText;

            if (sortProp == "Client") sortProp = "clientName";
            if (sortProp == "N°") sortProp = "number";
            if (sortProp == "Affaire") sortProp = "dealName";

            if (this.get("sortProperties").toString().toLowerCase() == sortProp.toLowerCase()) this.set('sortAscending', !this.get('sortAscending'));
            this.set("sortProperties", sortProp);
        }
    },
    numRows: function() {
        if (this.get('filtered'))
            return this.get('filtered').get('length');
        else
            return 0;
    }.property('filtered'),
    sortProperties: 'number',
    sortAscending: true,
    filtered: function() {
        var data = [];

        if (this.get('queryField') && this.get('queryField').length > 1) {
            var queryParams = this.get('queryField').split(' ');
            data = this.get('content').filter(function(item) {
                return queryParams.every(function(param) {
                    var pattern = new RegExp(param, 'i');
                    return (
                        pattern.test(item.get('number')) || pattern.test(item.get('clientName').toLowerCase()) || pattern.test(item.get('dealName').toLowerCase())
                    );
                });
            }).sortBy(this.get('sortProperties'));
        } else {
            data = this.get('content').sortBy(this.get('sortProperties'));
        }

        return (this.get('sortAscending') ? data : data.reverse());
    }.property('content.@each', 'queryField', 'numRows', 'sortProperties', 'sortAscending'),
    columns: Ember.computed(function() {
        var numColumn, clientColumn, dealColumn, EGColumn, RALColumn, RALUnderConveyorColumn, actionColumn;
        numColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'N°',
            textAlign: 'text-align-center',
            isResizable: 1,
            contentPath: 'number',
            defaultColumnWidth: 10,
            minWidth: 10
        });
        clientColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'Client',
            textAlign: 'text-align-center',
            isResizable: 1,
            contentPath: 'clientName'
        });
        dealColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'Affaire',
            textAlign: 'text-align-center',
            isResizable: 1,
            contentPath: 'dealName'
        });
        EGColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'EG',
            textAlign: 'text-align-center',
            isResizable: 1,
            contentPath: 'eg',
            defaultColumnWidth: 40,
            minWidth: 40
        });
        RALColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'RAL manut',
            textAlign: 'text-align-center',
            isResizable: 1,
            contentPath: 'ral',
            defaultColumnWidth: 80,
            minWidth: 80,
        });
        RALUnderConveyorColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'RAL sous manut',
            textAlign: 'text-align-center',
            isResizable: 1,
            contentPath: 'ralUnderConveyor',
            defaultColumnWidth: 115,
            minWidth: 115
        });
        actionColumn = Ember.Table.ColumnDefinition.create({
            headerCellName: 'Actions',
            textAlign: 'text-align-center',
            isResizable: 1,
            tableCellViewClass: 'App.TableActionCell',
            defaultColumnWidth: 115,
            minWidth: 115,
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
                                    this.get('controller.parentView.controller').send('redirect', 'deal', row.get('id'));
                                }
                            })
                        }), Ember.Object.create({
                            rights: [1, 2],
                            button: JQ.ButtonView.extend({
                                icons: {
                                    primary: 'ui-icon-pencil'
                                },
                                label: "Editer",
                                text: false,
                                click: function() {
                                    this.get('controller.parentView.controller').send('redirect', 'deal.edit', row.get('id'));
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
                                this.get("controller.parentView.controller").send("conf", a.get("id"))
                                $(".dialog-delete-deal").dialog("open")
                               
                            },
                                disabled: false
                            })
                        })
                    ]
                };
            }
        });
        return [numColumn, clientColumn, dealColumn, EGColumn, RALColumn, RALUnderConveyorColumn, actionColumn];
    })
});
