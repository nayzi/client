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
        showOrder: function(orderId) {
            console.log("dealindex : showorder :" + orderId);
            this.transitionToRoute("deal.createOrder")
        },
        redirect: function(route, id) {
            this.transitionToRoute(route, id);
        },
        delete: function(id) {
            
            this.get('store').find('order', id).then(function(z) {
                var r = confirm("Veuillez confirmer la suppression du bon de commande OTP :"+z.get('otp'));
            if (r == true) {
                z.deleteRecord();
                z.save()
            }
                
            });
        },
        edit: function(a) {
            this.transitionToRoute("deal.edit", this.get('model').id)
        },
        reference: function(a, b, c, d, e, deal, climat) { //p.orderPiece.options  p.orderPiece.piece.erpRef c c.options model
            return "hoho"

            for (var f = 0; f < a.length; f++) {

                var g = a[f][1].get('replace'),
                    k = a[f][0].get('optionValue'),
                    h = "";
                if ("L4" == g && null != k && null != k.length) {
                    for (var t = 0; t < 4 - k.length; t++) h += "0";
                    k = h + k
                }
                "P" == g && (b = b.replace("${P}", a[f][2].get('value')));
                b = b.replace("${" + g + "}", k); - 1 < b.indexOf("B") && ("Basse" == a[f][2].get('label') || "Haute" == a[f][2].get('label')) &&
                    (b = b.replace("B", "Haute" == a[f][2].get('label') ? 2 : 1))
            }

            b = b.replace("${EG4}", c.get('eg'));
            a = "RAL" == c.get('ral') ? deal.get('ral') : c.get('ral');
            b = b.replace("${RALU}", "RAL" == c.get('ralUnderConveyor') ? deal.get('ralUnderConveyor') : c.get('ralUnderConveyor'));
            b = b.replace("${RAL}", a);

            if ("${Z}-${xxxx}-${yyy}-${zzz}-${vv-o}" == b || "${Y}-${xxxx}-${yyy}-${zzz}-${vv-o}" == b)
                for (b = b.replace("${Z}", "Z"), b = b.replace("${Y}", "Y"), b = b.replace("${zzz}",
                        1E3 > c.get('eg') ? "0" + c.get('eg') : c.get('eg')), i = 0; i < d.length; i++) "26" == d[i][1].get('id') && (b = b.replace("${xxxx}", 1E3 > d[i][0].get('optionValue') ? "0" + d[i][0].get('optionValue') : d[i][0].get('optionValue'))), "19" == d[i][1].get('id') && (b = b.replace("${yyy}", d[i][0].get('optionValue'))), "26" == d[i][1].get('id') && (b = b.replace("${xxxx}", 1E3 > d[i][0].get('optionValue') ? "0" + d[i][0].get('optionValue') : d[i][0].get('optionValue'))),
                    "7" == d[i][1].get('id') && (a = "", null == climat.get('abbreviation') ? (a = parseInt(d[i][0].get('optionValue')), a = 15 < a ? 55 : 0 < a ? 15 : "-") : a = climat.get('abbreviation'), b = b.replace("${vv-o}", a));

            for (i = 0; i < d.length; i++) "7" == d[i][1].get('id') && (null == climat.get('abbreviation') ? (a = parseInt(d[i][0].get('optionValue')),
                a = 15 < a ? 55 : 0 < a ? 15 : "-") : a = climat.get('abbreviation'), b = b.replace("${V}", a)), b = b.replace("${" + d[i][1].get('replace') + "}", d[i][0].get('optionValue'));
            console.log('reference ligne ' + b);
            return b;
        },
        exporter: function(a) {
            function reference(a, b, c, d, e, deal, climat) {




                for (var f = 0; f < a.length; f++) {

                    var g = a[f][1].get('replace'),
                        k = a[f][0].get('optionValue'),
                        h = "";
                    if ("L4" == g && null != k && null != k.length) {
                        for (var t = 0; t < 4 - k.length; t++) h += "0";
                        k = h + k
                    }
                    "P" == g && (b = b.replace("${P}", a[f][2].get('value')));
                    b = b.replace("${" + g + "}", k); - 1 < b.indexOf("B") && ("Basse" == a[f][2].get('label') || "Haute" == a[f][2].get('label')) &&
                        (b = b.replace("B", "Haute" == a[f][2].get('label') ? 2 : 1))
                }

                b = b.replace("${EG4}", c.get('eg'));
                a = "RAL" == c.get('ral') ? deal.get('ral') : c.get('ral');
                b = b.replace("${RALU}", "RAL" == c.get('ralUnderConveyor') ? deal.get('ralUnderConveyor') : c.get('ralUnderConveyor'));
                b = b.replace("${RAL}", a);

                if ("${Z}-${xxxx}-${yyy}-${zzz}-${vv-o}" == b || "${Y}-${xxxx}-${yyy}-${zzz}-${vv-o}" == b)
                    for (b = b.replace("${Z}", "Z"), b = b.replace("${Y}", "Y"), b = b.replace("${zzz}",
                            1E3 > c.get('eg') ? "0" + c.get('eg') : c.get('eg')), m = 0; m < d.length; m++) "26" == d[m][1].get('id') && (b = b.replace("${xxxx}", 1E3 > d[m][0].get('optionValue') ? "0" + d[m][0].get('optionValue') : d[m][0].get('optionValue'))), "19" == d[m][1].get('id') && (b = b.replace("${yyy}", d[m][0].get('optionValue'))), "26" == d[m][1].get('id') && (b = b.replace("${xxxx}", 1E3 > d[m][0].get('optionValue') ? "0" + d[m][0].get('optionValue') : d[m][0].get('optionValue'))),
                        "7" == d[m][1].get('id') && (a = "", null == climat.get('abbreviation') ? (a = parseInt(d[m][0].get('optionValue')), a = 15 < a ? 55 : 0 < a ? 15 : "-") : a = climat.get('abbreviation'), b = b.replace("${vv-o}", a));

                for (var k = 0; k < d.length; k++) "7" == d[k][1].get('id') && (null == climat.get('abbreviation') ? (a = parseInt(d[k][0].get('optionValue')),
                    a = 15 < a ? 55 : 0 < a ? 15 : "-") : a = climat.get('abbreviation'), b = b.replace("${V}", a)), b = b.replace("${" + d[k][1].get('replace') + "}", d[k][0].get('optionValue'));
                console.log('reference ligne ' + b);
                return b;
            }
            var diz = this;

            this.get("store").find('order', a).then(function(o) {
                console.log('voila notre ordre ');



                return Ember.RSVP.Promise.all([o, o.get('deal'), o.get('conveyors').then(function(cs) {
                        return Ember.RSVP.Promise.all(cs.map(function(c) {
                            return Ember.RSVP.Promise.all([c, c.get('pieceOrders').then(function(po) {

                                return Ember.RSVP.Promise.all(po.map(function(poo) {
                                    return Ember.RSVP.Promise.all([poo, poo.get('orderPiece').then(function(op) {
                                        return Ember.RSVP.Promise.all([op, op.get('piece'), op.get('options').then(function(opt) {
                                            return Ember.RSVP.Promise.all(opt.map(function(optt) {
                                                return Ember.RSVP.Promise.all([optt, optt.get('optionType').then(function(opttp) {
                                                    return opttp
                                                }), optt.get('option').then(function(opttp) {
                                                    return opttp
                                                })])
                                            }))
                                        })])
                                    })])
                                }))
                            }), c.get('options').then(function(co) {
                                return Ember.RSVP.Promise.all(co.map(function(coo) {
                                    return Ember.RSVP.Promise.all([coo, coo.get('optionType').then(function(opttp) {
                                        return opttp
                                    })])
                                }))
                            })])
                        }))
                    }), o.get('climat')


                ]).then(function(result) {
                    console.log('affaiiiiiiiiiiiiiire');
                    console.log(result[1]);
                    var order = result[0];

                    var table = ""

                    for (var i = 0; i < result[2].length; i++) { //iteration sur les convoyeurs

                        for (var j = 0; j < result[2][i][1].length; j++) {

                            console.log("ligne " + i);

                            var refer = reference(result[2][i][1][j][1][2], result[2][i][1][j][1][1].get('erpRef'), result[2][i][0], result[2][i][2], order, result[1], result[3]);

                            console.log("I" + result[1].get('number') + " " + order.get('otp') + " " + result[2][i][0].get('zone') + " " + result[2][i][0].get('ref') + "  ||| " + ((i + 1) * 10) + " ||| " + refer + "  |||| " + result[2][i][1][j][0].get('nbPieces'));

                            table += '"' + "I" + result[1]._data.number + "" + order.get('otp') + "" + result[2][i][0].get('zone') + "" + result[2][i][0].get('ref') + '";"' + ((j + 1) * 10) + '";"' + refer + '";"' + result[2][i][1][j][0].get('nbPieces') + '"\n'

                        }

                    }

                    csvData = "data:application/csv," + encodeURIComponent('"Code Article Pere";"Num Ligne Nom";"Code Article Composant";"Quantite Composant"\n' + table);


                    a = document.createElement("a");
                    a.download = "Affaire|" + result[1]._data.number + "-OTP|" + order.get('otp') + ".csv";
                    a.href = csvData;
                    a.click()
                });
            })





            // this.transitionToRoute("order.Exporter", a)

        },
        woooow: function(a) {
            console.log('l3eeeeeeeeeeeeeeeeeeeez');

            var sortProp = event.path[0].innerText;

            if (sortProp == "Dessinateur") sortProp = "drawerName";
            if (sortProp == "Derni\u00e8re \u00e9dition le") sortProp = "lastEditedAt";
            if (sortProp == "Edit\u00e9 par") sortProp = "createdBy";
            if (sortProp == "Verrouill\u00e9 par") sortProp = "lastEditedBy";

            if (this.get("sortProperties").toString().toLowerCase() == sortProp.toLowerCase()) this.set('sortAscending', !this.get('sortAscending'));
            this.set("sortProperties", sortProp.toLowerCase());
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
                    if (!(g.test(a.get("otp")) || g.test(a.get("conveyorType.abbreviation").toLowerCase()) || g.test(a.get("drawerName") ? a.get("drawerName").toLowerCase() : "") || g.test(a.get("plan") ? a.get("plan").toLowerCase() : ""))) return e = !1
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
                if (d = moment(0).format('llll')) d = "non modifié";
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
