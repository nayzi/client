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
        updateCategory: function(pieceTypeId) {
            console.log("RCD updateCategory");
            console.log("pieceTypeId");
            console.log(parseInt(pieceTypeId, 10));
            if(pieceTypeId+''=='1') this.checkStringers();
            else this.checkControlBoard(pieceTypeId);
        },
        calculate: function(pieceTypeId) {

            console.log("RCD calculate");
            console.log(this.get('store'));
            console.log("pieceTypeId");
            console.log(parseInt(pieceTypeId, 10));
            var b = this;
            this.validate("conveyorOption_2_value").then(function() {
                b.calculateDecomposition();
                
            });
            b.get("parentController").cleanUpOrderPiece("1");
            b.set("categoryText_10", "");
            b.set("style_10", "");
            b.set("categoryText_13", "");
            b.set("style_13", "");
            b.set("categoryText_14", "");
            b.set("style_14", "");
            b.set("categoryText_12", "");
            b.set("style_12", "");
            b.set("categoryText_1", "");
            b.set("style_1", "")
        },
        initialiserPieceOrder: function(typeId){
        var id = parseInt(this.get('parentController').getPieceList(typeId)[0].get('id'));
        console.log('identifiant :'+id);
        this.createOrderPiece(typeId,id,{nb:0});
        this.createOrderPiece(typeId,id+1,{nb:0});
    }
    },
    conveyorOption_19: Ember.computed(function() {
        console.log("RCD conveyorOption_19");
        return {
            label: 0
        };
    }),
    ConveyorOption_26_valueValues: function() {
        var a = [];
        if (0 !== this.get("conveyorOption_19.label"))
            for (var b = 2; 16 > b; ++b) a.pushObject(Ember.Object.create({
                id: b * parseInt(this.get("conveyorOption_19.label"), 10)
            }));
        console.log("RCD ConveyorOption_26_valueValues");
        console.log("data");
        console.log(this.get('content').id);
        var diz = this;
        if (this.get('content').id == null) diz.set("conveyorOption_26_value", a[0].id);
        diz.get('options').map(function(o) {
            if (o.get('optionType.id') == 26) {
                console.log("hahahsshnfqs");
                console.log(o.get('optionValue'));
                diz.set("conveyorOption_26_value", parseInt(o.get('optionValue')));
            }
        })

        return a
    }.property("conveyorOption_19"),
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
        var a = "",
            b = 0,
            c = 0,
            d = this;
        var div = 2;
        var l = [];

        this.get("parentController.orderPieces").then(function(e) {
            Ember.RSVP.Promise.all(e.map(function(a) {
                console.log('checkStringers po' + d.get("pieceOrder_" + a.get("clientId") + "_value"));

                if (!l.contains(a.get("clientId"))) {
                    if ("1" === a.get("piece.pieceType.id") +
                        "") {
                        a.get("options").then(function(b) {
                            b.forEach(function(b) {
                                if ("1" === b.get("optionType.id")) {
                                    var l = parseInt(b.get("optionValue"), 10) * parseInt(d.get("pieceOrder_" + a.get("clientId") + "_value"), 10);
                                    console.log('caaaaaaaalc :' + a.get("clientId") + '  ' + b.get("optionValue") + ' ' + d.get("pieceOrder_" + a.get("clientId") + "_value"));
                                    c += l > 0 ? l : 0;
                                }
                            });
                            return Ember.RSVP.Promise.resolve()
                        });
                        l.pushObject(a.get("clientId"));
                        var l2 = parseInt(d.get("pieceOrder_" + a.get("clientId") + "_value"), 10);
                        return b += l2 > 0 ? l2 : 0;
                    }
                }
            })).then(function() {
                parseInt(d.get("conveyorOption_2_value"), 10) !== c / div ? a = "Longueur N.V." : 0 !== b % 2 && (a = "Non pair");
                d.set("categoryText_1", a);
                "" != a ? d.set("style_1", "color:white;background: #ce3131") : d.set("style_1",
                    "");
                console.log("RCD checkStringers");
                console.log("text");
                console.log(a);
                console.log("nbStringers");
                console.log(b);
                console.log("totalLength");
                console.log(c);
                console.log("self " + div);
                console.log(d.get('content').id)
            })
        });

    },
    checkControlBoard: function(a) {
        console.log('checkControlBoard  ' + a);
        var b = Math.floor(parseInt(this.get("conveyorOption_2_value"), 10) / parseInt(this.get("conveyorOption_26_value"), 10)),
            c = 0,
            d = 0,
            d1 = 0,
            e = this;
        var dd = [];
        var dd1 = [];
        var cc = [];
        if ([4, 12, 5, 14].contains(parseInt(a))) {
            if (console.log("checkControlBoard"), console.log(b), this.get("parentController.orderPieces").then(function(a) {
                    Ember.RSVP.Promise.all(a.map(function(a) {
                        if ("5" === a.get("piece.pieceType.id") + "") {
                            if (!cc.contains(a.get('clientId'))) {
                                c += parseInt(e.get("pieceOrder_" + a.get("clientId") + "_value"), 10);
                                cc.pushObject(a.get('clientId'))
                            }
                        } else if ("12" === a.get("piece.pieceType.id") + "") {
                            console.log('haaanta ');
                            console.log(a.get('clientId'));
                            if (!dd.contains(a.get('clientId'))) {
                                d += parseInt(e.get("pieceOrder_" + a.get("clientId") + "_value"), 10);
                                dd.pushObject(a.get('clientId'));
                            }
                        } else if ("14" === a.get("piece.pieceType.id") + "") {
                            console.log('haaanta ');
                            console.log(a.get('clientId'));
                            if (!dd1.contains(a.get('clientId'))) {
                                d1 += parseInt(e.get("pieceOrder_" + a.get("clientId") + "_value"), 10);
                                dd1.pushObject(a.get('clientId'));
                            }
                        }

                        return Ember.RSVP.Promise.resolve()
                    })).then(function() {
                        console.log("ddddddddddddd");
                        console.log(d);
                        console.log("b");
                        console.log(b);
                        console.log("c");
                        console.log(c);
                        console.log('resultattt : ' + (b + c - d));
                        0 != b + c - d ? (0 < b + c - d && (e.set("categoryText_12", "Manque " + (b + c - d)), e.set("style_12", "color:white;background: #ce3131")), 0 > b + c - d && (e.set("categoryText_12",
                            d - b - c + " de plus"), e.set("style_12", "color:white;background: #ce3131"))) : (e.set("categoryText_12", ""), e.set("style_12", ""));
                        0 != b + c - d1 ? (0 < b + c - d1 && (e.set("categoryText_14", "Manque " + (b + c - d1)), e.set("style_14", "color:white;background: #D7DF01")), 0 > b + c - d1 && (e.set("categoryText_14",
                            d1 - b - c + " de plus"), e.set("style_14", "color:white;background: #D7DF01"))) : (e.set("categoryText_14", ""), e.set("style_14", ""))
                    })
                }), this.get("conveyorOption_27.value") == this.get("conveyorOption_11.value")) {
                console.log("yyyyyy");
                console.log(this.get("conveyorOption_27"));
                var f = 0,
                    k = 0,
                    h = 0;
                console.log(this.get("conveyorOption_27"));
                this.get("pieceOrders").forEach(function(a) {
                    console.log("jjjjjjjjj");
                    console.log(a.get("conveyor.id"));
                    12 == a.get("orderPiece.piece.pieceType.id") && (f += parseInt(a.get("nbPieces")));
                    14 == a.get("orderPiece.piece.pieceType.id") && (k += parseInt(a.get("nbPieces")));
                    13 == a.get("orderPiece.piece.pieceType.id") && (h += parseInt(a.get("nbPieces")))
                });
                f == h ? (this.set("categoryText_13", ""), this.set("style_13", "")) : f > h ? (this.set("categoryText_13", "Manque " + (f - h)), this.set("style_13", "color:white;background: #D7DF01")) : f < h && (this.set("categoryText_13", h - f + " de plus"), this.set("style_13", "color:white;background: #D7DF01"));
                
            }
        } else "13" == a + "" ? this.get("parentController.orderPieces").then(function(a) {
                console.log('hana13');
                var l1 = [];
                var l2 = [];
                Ember.RSVP.Promise.all(a.map(function(a) {
                    var plus = 0;
                    "12" === a.get("piece.pieceType.id") +
                        "" ? (!l1.contains(a.get("clientId"))) && (l1.pushObject(a.get("clientId")), c += parseInt(e.get("pieceOrder_" + a.get("clientId") + "_value"), 10), console.log('hnaaaalll  ' + a.get("clientId") + '   ' + e.get("pieceOrder_" + a.get("clientId") + "_value"))) : "13" === a.get("piece.pieceType.id") + "" && (!l2.contains(a.get("clientId"))) && (l2.pushObject(a.get("clientId")), plus = e.get("pieceOrder_" + a.get("clientId") + "_value"), d += (plus == undefined) ? 0 : parseInt(plus, 10), console.log('hadakifach'), console.log(plus));
                    return Ember.RSVP.Promise.resolve()
                })).then(function() {
                    console.log('hana1313');
                    console.log(c + '    ' + d);
                    e.get("conveyorOption_27.value") != e.get("conveyorOption_11.value") && (c = 0);
                    0 != c - d ? (0 < c - d && (e.set("categoryText_13", "Manque " + (c - d)), e.set("style_13", "color:white;background: #D7DF01")), 0 > c - d && (e.set("categoryText_13", d - c + " de plus"), e.set("style_13", "color:white;background: #D7DF01"))) :
                        (e.set("categoryText_13", ""), e.set("style_13", ""))
                })
            }) : "10" == a + "" ? this.get("parentController.orderPieces").then(function(a) {
                console.log('ha7na fl10');
                console.log(a);
                Ember.RSVP.Promise.all(a.map(function(a) {
                    "1" === a.get("piece.pieceType.id") + "" ? (!cc.contains(a.get('clientId'))) && (parseInt(e.get("pieceOrder_" + a.get("clientId") + "_value"), 10) > 0) && (cc.pushObject(a.get("clientId")), c += parseInt(e.get("pieceOrder_" + a.get("clientId") + "_value"), 10)) : "10" === a.get("piece.pieceType.id") + "" && (!dd.contains(a.get('clientId'))) && (dd.pushObject(a.get('clientId')), d += parseInt(e.get("pieceOrder_" + a.get("clientId") + "_value"), 10));
                    return Ember.RSVP.Promise.resolve()
                })).then(function() {
                    console.log('res c ' + c + ' d ' + d + ' : ' + ((c / 2) - d));
                    0 != c / 2 - d ? (0 < c / 2 - d && (e.set("categoryText_10", "Manque " + (c / 2 - d)), e.set("style_10",
                        "color:white;background: #ce3131")), 0 > c / 2 - d && (e.set("categoryText_10", d - c / 2 + " de plus"), e.set("style_10", "color:white;background: #ce3131"))) : (e.set("categoryText_10", ""), e.set("style_10", ""))
                })
            }) :
            "14" == a + "" && this.get("parentController.orderPieces").then(function(a) {
                console.log('hana13');
                var l1 = [];
                var l2 = [];
                Ember.RSVP.Promise.all(a.map(function(a) {
                    var plus = 0;
                    "12" === a.get("piece.pieceType.id") +
                        "" ? (!l1.contains(a.get("clientId"))) && (l1.pushObject(a.get("clientId")), c += parseInt(e.get("pieceOrder_" + a.get("clientId") + "_value"), 10), console.log('hnaaaalll  ' + a.get("clientId") + '   ' + e.get("pieceOrder_" + a.get("clientId") + "_value"))) : "14" === a.get("piece.pieceType.id") + "" && (!l2.contains(a.get("clientId"))) && (l2.pushObject(a.get("clientId")), plus = e.get("pieceOrder_" + a.get("clientId") + "_value"), d += (plus == undefined) ? 0 : parseInt(plus, 10), console.log('hadakifach'), console.log(plus));
                    return Ember.RSVP.Promise.resolve()
                })).then(function() {
                    console.log('hana1313');
                    console.log(c + '    ' + d);
                    e.get("conveyorOption_27.value") != e.get("conveyorOption_11.value") && (c = 0);
                    0 != c - d ? (0 < c - d && (e.set("categoryText_14", "Manque " + (c - d)), e.set("style_14", "color:white;background: #D7DF01")), 0 > c - d && (e.set("categoryText_14", d - c + " de plus"), e.set("style_14", "color:white;background: #D7DF01"))) :
                        (e.set("categoryText_14", ""), e.set("style_14", ""))
                })
            })
    },
    calculateDecomposition: function() {
        console.log("RCD calculateDecomposition");
        console.log("this");
        console.log(this);
        var a = this;
        this.get("hasError") || (this.hasAlreadyCalculated("1") ? this.get("parentController.orderPieces").then(function(b) {
            b.forEach(function(b) {
                console.log("fffffff");
                console.log(b.get("piece.pieceType.id"));
                console.log("deleeeeete");
                a.set("pieceOrder_" + b.get("clientId") + "_value", 0)
            });
            console.log("RCD calculateDecomposition :initializeStringers");
            console.log("params");
            console.log(a.generateStringerList());
            a.initializeStringers(a.generateStringerList());
            a.initializeComplementaryPieces()
        }) : (this.initializeStringers(this.generateStringerList()), this.initializeComplementaryPieces()))
    },
    generateStringerList: function() {
        console.log('RCD generateStringerList');
        var x = parseInt(this.get('conveyorOption_2_value'), 10);
        console.log('x :' + parseInt(this.get('conveyorOption_2_value'), 10))
        var y = 2940;
        var z = this.get('conveyorOption_26_value') ? parseInt(this.get('conveyorOption_26_value'), 10) : 1;
        console.log('RCD :z :' + (this.get('conveyorOption_26_value') ? parseInt(this.get('conveyorOption_26_value'), 10) : 1));
        var nbY = 0;
        var stringers = [];

        while (y % z !== 0 && y > 0) {
            y = y - 28;
        }
        console.log('x :' + x + " y :" + y);
        if (x >= y) {
            console.log('RCD if x > y nby =' + Math.floor(x / y));
            nbY = Math.floor(x / y);
            if (x / y !== nbY && x - y * nbY < 2940) {
                nbY = nbY - 1;
            }

            if (nbY > 0)
                stringers.pushObject({
                    l: y,
                    nb: nbY
                });

            y = (x - y * nbY) / 2;

            if (y > 0) {
                nbY = 0;

                if (z === 1) {
                    if (y % 28 !== 0) {
                        stringers.pushObject({
                            l: y + 14,
                            nb: 1
                        });
                        y = y - 14;
                        nbY = -1;
                    }

                    stringers.pushObject({
                        l: y,
                        nb: nbY + 2
                    });
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
                            stringers.pushObject({
                                l: y,
                                nb: 2
                            });
                        }
                    } else {
                        if (existingStringer) {
                            existingStringer.nb = existingStringer.nb + 1;
                        } else {
                            stringers.pushObject({
                                l: y,
                                nb: 1
                            });
                        }
                        stringers.pushObject({
                            l: y1 - y,
                            nb: 1
                        });
                    }
                }
            }
        } else {
            
            stringers.pushObject({
                l: x,
                nb: 1
            });
        }
        console.log("rcd generateStringerList : stringers=");
        console.log(stringers);
        return stringers;
    },
        createOrderPiece: function(typeId, pieceId, nombre,init) {
        var b = this;
        var bool = 0;
        if(init==undefined) init = 0;
        console.log("createOrderPiece :");
        this.get("store").all('orderPiece').map(function(c){console.log('createOrderPiece store');console.log(c)})
       
        //console.log(this.get("parentController.store").all('orderPieces'));
        var dodo;
        var resultat = this.get("parentController.store").all('pieceOrder').map(function(d) {console.log('createOrderPiece map');
                        console.log('cmmmmmmp de '+(init||(b.get('content.position')==d.get('conveyor.position'))));
                        console.log("resultat array"); console.log(resultat);
               if ((init||(b.get('content.position')==d.get('conveyor.position')))&& (typeId + "" === d.get("orderPiece.piece.pieceType.id") + "") && (d.get('orderPiece.piece.id') + "" == pieceId + "")) { 
                    console.log('nombreeeY :' + nombre) ;console.log('trouveeeeeeeee '+d.get('conveyor.position')); dodo=d; return 1}
                     else  return 0
            })

            console.log('resultaaaaaat');
            console.log(dodo);
            console.log(resultat);
            console.log(!resultat.contains(1))
            if(!resultat.contains(1)) {
                console.log('non trouveeeeeeeee'+typeId);
                console.log("RCD initializeStringers then self: ");
                console.log("self");
                console.log(b);
                var n;
                if(pieceId+''==0+'') n = b.get("parentController").initOrderPiece(typeId + "");
                else n = b.get("parentController").initOrderPiece(typeId + "", 0, pieceId);
                console.log("RCD orderPiece");
                console.log(n);
                console.log("Ember.run.next :");
                console.log("self");
                console.log(b);
                console.log("orderPiece");
                console.log(n);

                console.log("0000000000");
                console.log('nombreeeY2 :' + nombre);
                Ember.run.next(b, b.generateOrderPiece, n, nombre)
            }
            else {console.log('eeeeeeeeeeeeeeelse');console.log(dodo.get('orderPiece.piece.pieceType.id'));b.generateOrderPiece.call(b, dodo.get('orderPiece'), nombre);}
        

    },
    initializeStringers: function(a) {

        var b = this;
        console.log("RCD initializeStringers this:");
        console.log(this);
        console.log("stringers");
        console.log(a);
        var c = 0,
            d = 0,
            e = parseInt(this.get("conveyorOption_26_value"),
                10),
            f = parseInt(this.get("conveyorOption_19.label"), 10);
        console.log("PR :"+f+"PP :"+e);
        console.log(f);
        console.log("PP");
        console.log(e);
        fin = a.toArray();
        console.log("la liste");
        console.log(fin);
        L_RCD_T = 0;
        var nbY = 0;
        var nbZ = 0;
        for (var h = f = 0; h < fin.length; h++) console.log("fin[e]"), console.log(fin[h]), L_RCD = fin[h].l * fin[h].nb, L_RCD_T += L_RCD, Q_Y = 0 == e ? 0 : Math.floor(L_RCD / e), f = 1500 > fin[h].l ? 1 : 2, console.log("l :" + fin[h].l + "Z :" + f + "n :" + fin[h].nb + " math :" + Math.floor(f * fin[h].nb / 2) + "  avant :" + Math.floor(L_RCD / e)), Q_Y -= Math.floor(f * fin[h].nb), 0 > Q_Y && (Q_Y = 0), L_RCD < e ? nbY = nbZ =
            0 : L_RCD >= e && (console.log('Q_Y'), console.log(Q_Y), console.log('Q_Z'), console.log(d), nbY += Q_Y, nbZ += Math.floor(f * fin[h].nb), console.log('Q_Y_T = ' + nbY), console.log('Q_Z_T = ' + nbZ));

        console.log("nbY");
        console.log(nbY);
        console.log("nbZ");
        console.log(nbZ);

        this.createOrderPiece('0', '29', {
            nb: nbZ
        });
        this.createOrderPiece('0', '30', {
            nb: nbY
        });
        console.log('passage1');
        var ths = this;
        ths.aaaa = 0;
        var nbreL=0;
        a.forEach(function(a) {
            console.log("RCD initializeStringers foreach:");
            console.log(a);
            nbreL+=a.nb;
            a.nb *= 2;
            console.log("stringer*\x3d2");
            var c = !1;
            console.log('liste veide? :');
            console.log(this.get("store").all('pieceOrder').mapBy('orderPiece.content').length);
            console.log(this.get("store").all('pieceOrder').mapBy('orderPiece.content'));
            var compt = 0;
            var create = {
                a: 0
            };
            //  ths.get("store").all('pieceOrder').mapBy('orderPiece.content').forEach(function(d) {if(d!=null) {compt++;console.log('comp orderpi '); console.log(d);}});

            console.log('compteur  : ' + compt);
            //if(compt==0) create =1;
            var ret = 1;
            var bol =1;
            var z =ths.get("store").all('pieceOrder').mapBy('orderPiece.content').map(function(d) {
                    
                    console.log('le tour de :');
                    console.log(a);
                    if ((d != null) && ("1" === d.get("piece.pieceType.id"))) {
                        console.log('le tour de2 :'+bol);
                        console.log(a);
                        
                        var zz = d.get("options").then(function(e) {
                            
                            console.log('le tour de3 :');
                            console.log(e);
                            if (bol&&e.any(function(b) {
                                    j = (("1" ===
                                        b.get("optionType.id")) && (b.get("optionValue") + "" === a.l + ""));
                                    console.log('1==' + b.get("optionType.id") + ' &&' + ' ' + b.get("optionValue") + 'et :' + a.l);
                                    console.log('comparaison : ' + j);
                                    return (("1" ===
                                        b.get("optionType.id")) && (b.get("optionValue") + "" === a.l + ""));
                                })) {
                                console.log('le tour de4 :' + a.l);
                                bol=0;
                                ths.generateOrderPiece.call(ths, d, a);
                                return 1;
                                
                            }
                            console.log('returning 0');
                            return 0;
                        })
                        console.log('return  f zz:');
                        console.log(zz);
                        return zz;

                    } return 0;
                    
                }

            );
console.log('return  f z:' );
console.log(z);

Em.RSVP.Promise.all(z).then(function(results){console.log('promiseall'+!results.contains(1));console.log(results);if (!results.contains(1)) {
                //var orderp = ths.get("parentController").initOrderPiece("1");
                console.log('orderpiece creeeeeeeeee');
                //Ember.run.next(ths, ths.generateOrderPiece, orderp, a);
                ths.createOrderPiece(1, 0, a)
            }});




        }, this)
            ths.createOrderPiece(10, 15, {nb:nbreL});

            ths.createOrderPiece(17, 28, {nb:2*parseInt(this.get("conveyorOption_2_value"), 10)});
            console.log('conveyor options');var total=[];
           console.log(ths.get("store").all('conveyorOption').forEach(function(co){if(co.get('optionType.id')==11||co.get('optionType.id')==27)total.pushObject(co.get('option.value'))}));
           console.log('taillllllle '+total.uniq().length)
    },
    Conv: function() {
        console.log("zzzzzzzzzzzzzzzz " + this.get("conveyorOption_27.value") + '   ' + this.get("conveyorOption_11.value"));
        console.log(this.get('content').id);
        this.set("categoryText_13", "");
        this.set("style_13", "");
        this.set("categoryText_14", "");
        this.set("style_14", "");
        var diz = this;
        var a = 0;
        if (void 0 == this.get("conveyorOption_27.value")) {
            console.log("iniiiiiiiitialisation");
            console.log(this.get('pieceOrders'));

        } else {
            if (this.get("conveyorOption_27.value") == this.get("conveyorOption_11.value")) {
                console.log("yyyyyy");

                console.log("hdshsdhshsdh");
                this.get("pieceOrders").forEach(function(b) {
                    12 == b.get("orderPiece.piece.pieceType.id") && (a += parseInt(b.get("nbPieces")))
                });




            }
            this.addObserver("conveyorOption_" + 2 + "_value", function(a, b, c, d) {
                console.log('ozueyrzaeur');
                console.log(a);
                console.log(b);
                console.log(c);
                console.log(d);
                this.checkStringers()
            });
            var po13 = this.get("pieceOrders").findBy('orderPiece.piece.pieceType.id', '13');
            console.log('xcvsdfgeruytjh');
            console.log(po13);
            if (po13 != undefined) {
                if (po13.id == null) {
                    po13.get('orderPiece').then(function(op) {
                        diz.set("pieceOrder_" + op.get('clientId') + "_value", a)
                    })
                } else {
                    console.log('iuzerzeuor :' + (this.get("conveyorOption_27.value") == this.get("conveyorOption_11.value")) + '    ' + a);
                    console.log(po13._data.orderPiece.get('clientId'));
                    this.set("pieceOrder_" + po13._data.orderPiece.get('clientId') + "_value", a);;
                    console.log(po13);
                    po13.set('nbPieces', a)
                }
            }
            if (po13 == undefined) {
                if (a != 0) diz.createOrderPiece(13, 24, {
                    nb: a
                })
            }
        }

    }.observes("conveyorOption_11", "conveyorOption_27"),  
    initializeComplementaryPieces: function() {
        console.log("RCD initializeComplementaryPieces");
        var a = Math.floor(parseInt(this.get("conveyorOption_2_value"), 10) / parseInt(this.get("conveyorOption_26_value"), 10)),
            b = Math.ceil((parseInt(this.get("conveyorOption_2_value"),
                10) - a * parseInt(this.get("conveyorOption_26_value"), 10)) / parseInt(this.get("conveyorOption_19.label"), 10)),
            c = 0,
            d = 0,
            e = 0,
            f = !1,
            h = !1,
            g = this;


        console.log("nbRange");
        console.log(a);
        console.log("nbComp");
        console.log(b);
        this.set("categoryText_12", '');
        this.set("categoryText_14", '');
        console.log("conveyorOption_19.label");
        console.log(parseInt(this.get("conveyorOption_19.label"), 10));
        console.log("conveyorOption_26.label");
        console.log(parseInt(this.get("conveyorOption_26.label"), 10));
        console.log("conveyorOption_2_value");
        console.log(parseInt(this.get("conveyorOption_2_value"),
            10));
        56 === parseInt(this.get("conveyorOption_19.label"), 10) ? (console.log("egale a 56"), 0 < b && --b, c = b) : 84 === parseInt(this.get("conveyorOption_19.label"), 10) ? (console.log("egale a 84"), d = b, 28 === parseInt(this.get("conveyorOption_2_value"), 10) % 84 ? (d -= 2, c = 2) : 56 === parseInt(this.get("conveyorOption_2_value"), 10) % 84 && (d -= 1, c = 1)) : 112 === parseInt(this.get("conveyorOption_19.label"), 10) && (console.log("egale a 112"), e = b, 56 === parseInt(this.get("conveyorOption_2_value"), 10) % 84 ? (e -= 1, d = 1) : 56 === parseInt(this.get("conveyorOption_2_value"),
            10) % 84 && (e -= 1, c = 1));
        console.log("nbComp :" + b + "nbStrap56" + c + "nbStrap84" + d + "nbStrap112" + e);
        0 < b && this.get("parentController.orderPieces").then(function(n) {
            console.log("orderPieces");
            console.log(n);
            return Ember.RSVP.Promise.all(n.map(function(k) {
                console.log("piece.pieceType.id");
                console.log(k.get("piece.pieceType.id"));
                if ("4" === k.get("piece.pieceType.id")) f || (g.generateOrderPiece.call(g, k, {
                    nb: b
                }), f = !0);
                else if ("8" === k.get("piece.pieceType.id")) return k.get("options").then(function(b) {
                    if (0 < c && b.any(function(a) {
                            return "19" ===
                                a.get("optionType.id") && "56" === a.get("option.label") + ""
                        })) return g.generateOrderPiece.call(g, k, {
                        nb: c,
                        strapLength: 56
                    }), c = 0, Ember.RSVP.Promise.resolve();
                    if (0 < d && b.any(function(a) {
                            return "19" === a.get("optionType.id") && "84" === a.get("option.label") + ""
                        })) return g.generateOrderPiece.call(g, k, {
                        nb: d,
                        strapLength: 84
                    }), d = 0, Ember.RSVP.Promise.resolve();
                    if (0 < e && b.any(function(a) {
                            return "19" === a.get("optionType.id") && "112" === a.get("option.label") + ""
                        })) return g.generateOrderPiece.call(g, k, {
                            nb: e,
                            strapLength: 112
                        }), e =
                        0, Ember.RSVP.Promise.resolve();;
                    return /*g.generateOrderPiece.call(g, k, {
                        nb: a / 2
                    }),*/ h = !0, Ember.RSVP.Promise.resolve()
                });
                return Ember.RSVP.Promise.resolve()
            })).finally(function() {

                if (!f) {
                    console.log("didSetRoller :" + f);
                    var k = g.get("parentController").initOrderPiece("4");
                    console.log("Ember.run.next");
                    console.log("orderPiece 4");
                    console.log(k);
                    console.log("nb :" + b);
                    Ember.run.next(g, g.generateOrderPiece, k, {
                        nb: b
                    })
                }

                0 < c && (console.log("nbStrap56 :" + c), k = g.get("parentController").initOrderPiece("8"), console.log("Ember.run.next"), console.log("orderPiece56 8"), console.log(k), console.log("nbStrap56 :" + c + " strapLength :56"), Ember.run.next(g, g.generateOrderPiece, k, {
                    nb: c,
                    strapLength: 56
                }));
                0 < d && (k = g.get("parentController").initOrderPiece("8"), console.log("Ember.run.next"), console.log("orderPiece84 8"), console.log(k), console.log("nbStrap84 :" + d + " strapLength :84"), Ember.run.next(g, g.generateOrderPiece, k, {
                    nb: d,
                    strapLength: 84
                }));
                0 < e && (k = g.get("parentController").initOrderPiece("8"), Ember.run.next(g, g.generateOrderPiece, k, {
                    nb: e,
                    strapLength: 112
                }));

            });

        });
        this.createOrderPiece(12, 22, {
            nb: a
        });
        this.createOrderPiece(14, 26, {
            nb: a
        });
        this.createOrderPiece(17, 27, {
            nb: a
        });
        if(this.get("conveyorOption_27.value")==this.get("conveyorOption_11.value")){console.log('hhhhhhhhhh');
                
                this.createOrderPiece(13,24,{nb:a});
             }
             else if(this.get("conveyorOption_27.value")!=undefined&&undefined!=this.get("conveyorOption_11.value")){console.log(this.get("conveyorOption_27.value")+'    '+this.get("conveyorOption_11.value"));console.log("convelse");this.createOrderPiece(13,24,{nb:0});}
      

    },//jsjsjs
       generateOrderPiece: function(orderPiece, piece) {
        console.log('RCD generateOrderPiece');
        console.log('orderPiece :');
        console.log(orderPiece);
        console.log('piece :');
        console.log(piece);

        var self = this;

        if (piece.l) {
            orderPiece.get('options').then(function(orderPieceOptions) {
/*                console.log('orderPieceOptions.findBy');
                console.log(orderPieceOptions.findBy('optionType.id', 1 + '').get('clientId'));*/
                self.set('parentController.firstColController.orderPieceOption_' + orderPieceOptions.findBy('optionType.id', 1 + '').get('clientId') + '_value', piece.l);
            });
        } 
        
        
      
        else {if (piece.strapLength) {
            orderPiece.get('piece').then(function(pieceRef) {
                pieceRef.get('options').then(function(options) {
                    var option = options.findBy('label', piece.strapLength + '');

                    orderPiece.get('options').then(function(orderPieceOptions) {
                        self.set('parentController.firstColController.orderPieceOption_' + orderPieceOptions.findBy('optionType.id', 19 + '').get('clientId'), option);
                    });
                });
            });
        }


        

    } this.set('pieceOrder_' + orderPiece.get('clientId') + '_value', piece.nb);}
});
