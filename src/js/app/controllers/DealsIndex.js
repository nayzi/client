/* 
 * @license PASC Client - Fives Cinetic
 * Available via the MIT or new BSD license.
 */

App.DealsIndexController = Ember.ArrayController.extend({
    queryField: null,
    needs: ["popInDeals"],
    actions: {
        redirect: function(a, b) {
            this.transitionToRoute(a, b)
        },

        delete: function(a) {
            console.log("suprosososos" + a);
            this.get("store").find("deal", a).then(function(a) {
                return Ember.RSVP.Promise.all([a.get("orders").then(function(a) {
                    return a.map(function(a) {
                        console.log("suppression de lordre");
                        console.log(a);
                        a.deleteRecord();
                        a.save();
                        return Ember.RSVP.Promise.resolve()
                    })
                })]).then(function(c) {
                    a.deleteRecord();
                    a.save()
                })
            })
        },
        create: function() {
            this.transitionToRoute("deals.createDeal")
        },
        woooow: function(a) {
            console.log("l3eeeeeeeeeeeeeeeeeeeez");
            a = event.path[0].innerText;
            "Client" == a && (a = "clientName");
            "N\u00b0" == a && (a = "number");
            "Affaire" == a && (a = "dealName");
            this.get("sortProperties").toString().toLowerCase() == a.toLowerCase() && this.set("sortAscending", !this.get("sortAscending"));
            this.set("sortProperties", a)
        }
    },
    numRows: function() {
        return this.get("filtered") ? this.get("filtered").get("length") : 0
    }.property("filtered"),
    sortProperties: "number",
    sortAscending: !0,
    filtered: function() {
        var a = [];
        if (this.get("queryField") && 1 < this.get("queryField").length) var b = this.get("queryField").split(" "),
            a = this.get("content").filter(function(a) {
                return b.every(function(b) {
                    b = RegExp(b, "i");
                    return b.test(a.get("number")) || b.test(a.get("clientName").toLowerCase()) || b.test(a.get("dealName").toLowerCase())
                })
            }).sortBy(this.get("sortProperties"));
        else a = this.get("content").sortBy(this.get("sortProperties"));
        return this.get("sortAscending") ?
            a : a.reverse()
    }.property("content.@each", "queryField", "numRows", "sortProperties", "sortAscending"),
    columns: Ember.computed(function() {
        var a, b, c, d, e, f, h;
        a = Ember.Table.ColumnDefinition.create({
            headerCellName: "N\u00b0",
            textAlign: "text-align-center",
            isResizable: 1,
            contentPath: "number",
            defaultColumnWidth: 10,
            minWidth: 10
        });
        b = Ember.Table.ColumnDefinition.create({
            headerCellName: "Client",
            textAlign: "text-align-center",
            isResizable: 1,
            contentPath: "clientName"
        });
        c = Ember.Table.ColumnDefinition.create({
            headerCellName: "Affaire",
            textAlign: "text-align-center",
            isResizable: 1,
            contentPath: "dealName"
        });
        d = Ember.Table.ColumnDefinition.create({
            headerCellName: "EG",
            textAlign: "text-align-center",
            isResizable: 1,
            contentPath: "eg",
            defaultColumnWidth: 40,
            minWidth: 40
        });
        e = Ember.Table.ColumnDefinition.create({
            headerCellName: "RAL manut",
            textAlign: "text-align-center",
            isResizable: 1,
            contentPath: "ral",
            defaultColumnWidth: 80,
            minWidth: 80
        });
        f = Ember.Table.ColumnDefinition.create({
            headerCellName: "RAL sous manut",
            textAlign: "text-align-center",
            isResizable: 1,
            contentPath: "ralUnderConveyor",
            defaultColumnWidth: 115,
            minWidth: 115
        });
        h = Ember.Table.ColumnDefinition.create({
            headerCellName: "Actions",
            textAlign: "text-align-center",
            isResizable: 1,
            tableCellViewClass: "App.TableActionCell",
            defaultColumnWidth: 115,
            minWidth: 115,
            getCellContent: function(a) {
                return {
                    id: a.get("id"),
                    buttonList: [Ember.Object.create({
                        rights: "all",
                        button: JQ.ButtonView.extend({
                            icons: {
                                primary: "ui-icon-document"
                            },
                            label: "Consulter",
                            text: !1,
                            click: function() {
                                this.get("controller.parentView.controller").send("redirect",
                                    "deal", a.get("id"))
                            }
                        })
                    }), Ember.Object.create({
                        rights: [1, 2],
                        button: JQ.ButtonView.extend({
                            icons: {
                                primary: "ui-icon-pencil"
                            },
                            label: "Editer",
                            text: !1,
                            click: function() {
                                this.get("controller.parentView.controller").send("redirect", "deal.edit", a.get("id"))
                            }
                        })
                    }), Ember.Object.create({
                        rights: [1, 2],
                        button: JQ.ButtonView.extend({
                            icons: {
                                primary: "ui-icon-trash"
                            },
                            label: "Supprimer",
                            text: !1,
                            click: function() {
                                console.log('hnaaaaaalallalala');
                                console.log(a.get('id'));
                                console.log(this);
                                console.log(this.get('parent'));
                                $(".dialog-delete-deal").data('id', a.get('id')).dialog("open")
                            },
                            disabled: !1
                        })
                    })]
                }
            }
        });
        return [a, b, c, d, e, f, h]
    })
});