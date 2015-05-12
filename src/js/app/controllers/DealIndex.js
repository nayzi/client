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
    needs: ["popInDeal"],
    queryField: null,
    actions: {
        showOrder: function(a) {
            console.log("dealindex : showorder :" + a);
            this.transitionToRoute("deal.updateOrder", a, 3)
        },
        redirect: function(a, b) {
            this.transitionToRoute(a, b)
        },
        delete: function(a) {
            this.get("store").find("order", a).then(function(a) {
                !0 == confirm("Veuillez confirmer la suppression du bon de commande OTP :" + a.get("otp")) && (a.deleteRecord(), a.save())
            })
        },
        edit: function(a) {
            this.transitionToRoute("deal.edit",
                this.get("model").id)
        },
        reference: function(a, b, c, d, e, f, h) {
            return "hoho"
        },
        exporter: function(a) {
            var diz = this;
            this.get("store").find("order", a).then(function(b) {
                console.log("voila notre ordre ");
                return Ember.RSVP.Promise.all([b, b.get("deal"), b.get("conveyors").then(function(a) {
                    return Ember.RSVP.Promise.all(a.map(function(a) {
                        return Ember.RSVP.Promise.all([a, a.get("pieceOrders").then(function(a) {
                            return Ember.RSVP.Promise.all(a.map(function(a) {
                                return Ember.RSVP.Promise.all([a, a.get("orderPiece").then(function(a) {
                                    return Ember.RSVP.Promise.all([a,
                                        a.get("piece"), a.get("options").then(function(a) {
                                            return Ember.RSVP.Promise.all(a.map(function(a) {
                                                return Ember.RSVP.Promise.all([a, a.get("optionType").then(function(a) {
                                                    return a
                                                }), a.get("option").then(function(a) {
                                                    return a
                                                })])
                                            }))
                                        })
                                    ])
                                })])
                            }));

                        }), a.get("options").then(function(a) {
                            return Ember.RSVP.Promise.all(a.map(function(a) {
                                return Ember.RSVP.Promise.all([a, a.get("optionType").then(function(a) {
                                    return a
                                })])
                            }))
                        })])
                    }))
                }), b.get("climat")]).then(function(b) {
                    console.log("affaiiiiiiiiiiiiiire");
                    console.log(b[2]);

                    for (var d = b[0], e = "", f = 0; f < b[2].length; f++)
                        for (var h = 0; h < b[2][f][1].length; h++) {
                            var lll = [];
                            console.log('convoyeuuuuuur');
                            lll = b[2][f][1].sort(function(x, y) {

                                var res = 0;
                                if ((parseInt(x[1][1]._data.pieceType.id) == 1) && (parseInt(y[1][1]._data.pieceType.id) == 1)) {
                                    console.log('1 & 1 ' + x[1][2][0][0]._data.optionValue + "  " + y[1][2][0][0]._data.optionValue);
                                    res = x[1][2][0][0]._data.optionValue - y[1][2][0][0]._data.optionValue;
                                    if (res == 0) res = x[1][2][1][2]._data.value < y[1][2][1][2]._data.value ? -1 : 1;
                                    console.log('comparaison1 ' + x[1][1]._data.pieceType.id + ' ' + y[1][1]._data.pieceType.id + '   ' + res);
                                } else if (parseInt(x[1][1]._data.pieceType.id) == 0) {
                                    if (parseInt(y[1][1]._data.pieceType.id) == 0) {
                                        res = parseInt(x[1][1].id) - parseInt(y[1][1].id)
                                    } else {
                                        if (parseInt(y[1][1]._data.pieceType.id) == 1) {
                                            res = 1
                                        } else res = -1
                                    }
                                    console.log('comparaison2 ' + x[1][1]._data.pieceType.id + ' ' + y[1][1]._data.pieceType.id + '   ' + res);
                                } else if (parseInt(y[1][1]._data.pieceType.id) == 0) {

                                    if (parseInt(x[1][1]._data.pieceType.id) == 1) {
                                        res = -1
                                    } else res = 1;
                                    console.log('comparaison3 ' + x[1][1]._data.pieceType.id + ' ' + y[1][1]._data.pieceType.id + '   ' + res);

                                } else if (parseInt(x[1][1]._data.pieceType.id) == parseInt(y[1][1]._data.pieceType.id)) {
                                    res = parseInt(x[1][1].id) - parseInt(y[1][1].id)
                                    console.log('comparaison4 ' + x[1][1].id + '  & ' + y[1][1].id + '  :' + x[1][1]._data.pieceType.id + ' ' + y[1][1]._data.pieceType.id + '   ' + res);
                                } else {
                                    res = parseInt(x[1][1]._data.pieceType.id) - parseInt(y[1][1]._data.pieceType.id);
                                    console.log('comparaison5 ' + x[1][1]._data.pieceType.id + ' ' + y[1][1]._data.pieceType.id + '   ' + res);
                                }

                                return res;
                            });
                            console.log(b[2][f][1]);
                            console.log('apres');
                            console.log(lll);

                            console.log("ligne " + f);
                            var k;
                            k = b[2][f][1][h][1][2];
                            for (var g = b[2][f][1][h][1][1].get("erpRef"), s = b[2][f][0], p = b[2][f][2], t = b[1], n = b[3], q = 0; q < k.length; q++) {
                                var r = k[q][1].get("replace"),
                                    l = k[q][0].get("optionValue"),
                                    u = "";
                                if ("L4" == r && null != l && null != l.length) {
                                    for (var v = 0; v < 4 - l.length; v++) u += "0";
                                    l = u + l
                                }
                                "P" == r && (g = g.replace("${P}", k[q][2].get("value")));
                                g = g.replace("${" + r + "}", l); - 1 < g.indexOf("B") && ("Basse" == k[q][2].get("label") ||
                                    "Haute" == k[q][2].get("label")) && (g = g.replace("B", "Haute" == k[q][2].get("label") ? 2 : 1))
                            }
                            g = g.replace("${EG4}", s.get("eg"));
                            k = "RAL" == s.get("ral") ? t.get("ral") : s.get("ral");
                            g = g.replace("${RALU}", "RAL" == s.get("ralUnderConveyor") ? t.get("ralUnderConveyor") : s.get("ralUnderConveyor"));
                            g = g.replace("${RAL}", k);
                            if ("${Z}-${xxxx}-${yyy}-${zzz}-${vv-o}" == g || "${Y}-${xxxx}-${yyy}-${zzz}-${vv-o}" == g)
                                for (g = g.replace("${Z}", "Z"), g = g.replace("${Y}", "Y"), g = g.replace("${zzz}", 1E3 > s.get("eg") ? "0" + s.get("eg") : s.get("eg")),
                                    m = 0; m < p.length; m++) "26" == p[m][1].get("id") && (g = g.replace("${xxxx}", 1E3 > p[m][0].get("optionValue") ? "0" + p[m][0].get("optionValue") : p[m][0].get("optionValue"))), "19" == p[m][1].get("id") && (g = g.replace("${yyy}", p[m][0].get("optionValue"))), "26" == p[m][1].get("id") && (g = g.replace("${xxxx}", 1E3 > p[m][0].get("optionValue") ? "0" + p[m][0].get("optionValue") : p[m][0].get("optionValue"))), "7" == p[m][1].get("id") && (k = "", null == n.get("abbreviation") ? (k = parseInt(p[m][0].get("optionValue")), k = 15 < k ? 55 : 0 < k ? 15 : "-") : k = n.get("abbreviation"),
                                    g = g.replace("${vv-o}", k));
                            for (l = 0; l < p.length; l++) "7" == p[l][1].get("id") && (null == n.get("abbreviation") ? (k = parseInt(p[l][0].get("optionValue")), k = 15 < k ? 55 : 0 < k ? 15 : "-") : k = n.get("abbreviation"), g = g.replace("${V}", k)), g = g.replace("${" + p[l][1].get("replace") + "}", p[l][0].get("optionValue"));
                            console.log("reference ligne " + g);
                            k = g;
                            console.log("I" + b[1].get("number") + " " + d.get("otp") + " " + b[2][f][0].get("zone") + " " + b[2][f][0].get("ref") + "  ||| " + 10 * (f + 1) + " ||| " + k + "  |||| " + b[2][f][1][h][0].get("nbPieces"));
                            var nombre = b[2][f][1][h][0].get("nbPieces");
                            diz.get('store').unloadRecord(b[2][f][1][h][0]);
                            if (b[2][f][1][h][1][1].id == 28) nombre = (nombre / 2000).toFixed(2);
                            e +=
                                '"I' + b[1]._data.number + "" + d.get("otp") + "" + b[2][f][0].get("zone") + "" + b[2][f][0].get("ref") + '";"' + 10 * (h + 1) + '";"' + k + '";"' + nombre + '"\n'
                        }
                    console.log('expppppppp');
                    // diz.get('store').unloadAll('pieceOrder');
                    // diz.get('store').unloadAll('orderPiece');
                    csvData = "data:application/csv," + encodeURIComponent('"Code Article Pere";"Num Ligne Nom";"Code Article Composant";"Quantite Composant"\n' + e);
                    a = document.createElement("a");
                    a.download = "Affaire|" + b[1]._data.number + "-OTP|" + d.get("otp") + ".csv";
                    a.href = csvData;
                    a.click();

                })
            });
        },
        woooow: function(a) {
            console.log("l3eeeeeeeeeeeeeeeeeeeez");
            a = event.path[0].innerText;
            "plan" == a && (a = "plan");
            "Dessinateur" == a && (a = "drawerName");
            "Derni\u00e8re \u00e9dition le" == a && (a = "lastEditedAt");
            "Edit\u00e9 par" == a && (a = "createdBy");
            "Verrouill\u00e9 par" == a && (a = "lastEditedBy");
            this.get("sortProperties").toString().toLowerCase() == a.toLowerCase() && this.set("sortAscending", !this.get("sortAscending"));
            this.set("sortProperties", a)
        }
    },
    sortProperties: "OTP",
    sortAscending: !1,
    numRows: function() {
        return void 0 !== this.get("filtered") ? this.get("filtered").get("length") : 0
    }.property("filtered"),
    filtered: function() {
        console.log("fhsdkf");
        console.log(this.get("selection"));
        console.log("fiiiilter");
        console.log(this.get("sortProperties"));
        var a = [];
        if (this.get("queryField") && 1 < this.get("queryField").length) var b = this.get("queryField").split(" "),
            a = this.get("content.orders").filter(function(a, d) {
                var e = !0;
                $.each(b, function(b, d) {
                    var k = RegExp(d, "i");
                    if (!(k.test(a.get("otp")) || k.test(a.get("conveyorType.abbreviation").toLowerCase()) || k.test(a.get("drawerName") ? a.get("drawerName").toLowerCase() : "") ||
                            k.test(a.get("plan") ? a.get("plan").toLowerCase() : ""))) return e = !1
                });
                return e
            }).sortBy(this.get("sortProperties"));
        else a = this.get("content.orders").sortBy(this.get("sortProperties"));
        console.log("soooort");
        console.log(a);
        return this.get("sortAscending") ? a : a.reverse()
    }.property("content.orders.isLoaded", "content.orders.@each", "queryField", "numRows", "sortProperties", "sortAscending"),
    columns: Ember.computed(function() {
        var a, b, c, d, e, f, h, k;
        a = Ember.Table.ColumnDefinition.create({
            headerCellName: "OTP",
            textAlign: "text-align-center",
            isResizable: 1,
            contentPath: "otp",
            defaultColumnWidth: 20
        });
        b = Ember.Table.ColumnDefinition.create({
            headerCellName: "Type",
            textAlign: "text-align-center",
            isResizable: 1,
            contentPath: "conveyorType.abbreviation",
            defaultColumnWidth: 50
        });
        c = Ember.Table.ColumnDefinition.create({
            headerCellName: "Plan",
            textAlign: "text-align-center",
            isResizable: 1,
            contentPath: "plan"
        });
        d = Ember.Table.ColumnDefinition.create({
            headerCellName: "Dessinateur",
            textAlign: "text-align-center",
            isResizable: 1,
            contentPath: "drawerName",
            minWidth: 90
        });
        e = Ember.Table.ColumnDefinition.create({
            headerCellName: "Derni\u00e8re \u00e9dition le",
            textAlign: "text-align-center",
            isResizable: 1,
            defaultColumnWidth: 125,
            maxWidth: 125,
            getCellContent: function(a) {
                a = moment(a.get("lastEditedAt")).format("llll");
                if (a = moment(0).format("llll")) a = "non modifi\u00e9";
                return a
            }
        });
        f = Ember.Table.ColumnDefinition.create({
            headerCellName: "Edit\u00e9 par",
            textAlign: "text-align-center",
            isResizable: 1,
            contentPath: "lastEditedBy"
        });
        k = Ember.Table.ColumnDefinition.create({
            headerCellName: "Verrouill\u00e9 par",
            textAlign: "text-align-center",
            isResizable: 1,
            contentPath: "lockedBy"
        });
        h = Ember.Table.ColumnDefinition.create({
            headerCellName: "Actions",
            textAlign: "text-align-center",
            isResizable: 1,
            tableCellViewClass: "App.TableActionCell",
            defaultColumnWidth: 190,
            maxWidth: 190,
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
                                this.get("controller.parentView.controller").send("showOrder",
                                    a.get("id"))
                            }
                        })
                    }), Ember.Object.create({
                        rights: "all",
                        button: JQ.ButtonView.extend({
                            icons: {
                                primary: "ui-icon-pencil"
                            },
                            label: "Editer",
                            text: !1,
                            click: function() {
                                this.get("controller.parentView.controller").send("redirect", "order.edit", a.get("id"))
                            },
                            disabled: !0
                        })
                    }), Ember.Object.create({
                        rights: "all",
                        button: JQ.ButtonView.extend({
                            icons: {
                                primary: "ui-icon-print"
                            },
                            label: "Imprimer",
                            text: !1,
                            click: function() {
                                this.get("controller.parentView.controller").send("redirect", "order.print", a.get("id"))
                            },
                            disabled: !0
                        })
                    }), Ember.Object.create({
                        rights: "all",
                        button: JQ.ButtonView.extend({
                            icons: {
                                primary: "ui-icon-extlink"
                            },
                            label: "Exporter",
                            text: !1,
                            click: function() {
                                this.get("controller.parentView.controller").send("exporter", a.get("id"))
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
                                this.get("controller.parentView.controller").send("delete", a.get("id"))
                            },
                            disabled: !1
                        })
                    })]
                }
            }
        });
        return [a, b, c, d, e, f, k, h]
    })
});