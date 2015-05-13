/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module Contrôleurs
 * @submodule Contrôleurs abstraits
 */

/**
 *
 *
 * @class DealFormController
 * @namespace AbstractControllers
 * @extends Ember.ObjectController
 * @uses Ember.Validations.Mixin.Validator
 */
App.AbstractControllers.DealFormController = Ember.ObjectController.extend(Ember.Validations.Mixin.Validator, {
    needs: ["popInDealU"],
    toDelete: [],
    avertir: function(message) {
        $(".dialog-update-order")[0].textContent = message;
        $(".dialog-update-order").dialog("open", {
            delay: 1000
        });
    },
    actions: {
        edit: function() {
            alert("haw")
        },

        cancel: function() {
            console.log("DF cancel");

            this.reset();
            this.transitionToRoute("deal.index")
        },
        addConveyor: function() {
            console.log("DF addConveyoir");


            this.get("tableController").send("addConveyor");
        },
        updateConveyor: function(a) {
            console.log("DF updateConveyor");
            this.get("tableController").send("updateConveyor", a)
        },
        removeConveyor: function() {
            console.log("remove conv");
            this.get("tableController").send("removeConveyor")
        },
        successfulSaving: function() {
            console.log("Saving Succes"); //console.log(this);
            //this.get("target.router").refresh();
            var diz = this;
            console.log(this);
            console.log(this.get('tableController'));
            console.log(this.get("controller.validationResults"));
            this.avertir('Bien enregistré');
            this.transitionToRoute("deal.updateOrder", this.get('id'), 3);

        },
        failSaving: function() {
            console.log("DF fail");
            console.log("Saving failed");
            console.log(this);
            console.log(this.get('tableController'));
            this.avertir('Bien enregistré');

        }
    },
    init: function() {
        console.log('loooooz');
        console.log(this.get('otp'));
    },
    formValid: false,
    tableController: null,
    isEditing: !0,
    tableColBaseController: Ember.computed(function() {
        var a;
        switch (parseInt(this.get("conveyorType.id"), 10)) {
            case 3:
                a = PASC.BdcTable.Ext.RCDController;
                console.log("DF case 3 " + parseInt(this.get("conveyorType.id")));
                break;
            case 4:
                a = PASC.BdcTable.Ext.TBController;
                console.log("DF case 4 " + parseInt(this.get("conveyorType.id")));
                break;
            default:
                console.log("DF default"), a = Ember.ObjectController.extend(PASC.BdcTable.ColControllerMixin)
        }
        return a
    }),
    table: function() {
        console.log("DF table");
        console.log(this);
        Ember.run.next(this, this.validate, "table");
        console.log('hahahvlals' + this.get("tableController.isTableValid"));
        return this.get("tableController.isTableValid")
    }.observes("tableController.isTableValid"),

    submitForm: function() {
        var isValide = false;
        console.log('todeleeeete');
        console.log(this.get('toDelete'));
        var erreurs = [];
        var erreursPieces = false;
        var erreursRed = false;
        console.log('yawyaw');
        console.log(this);
        var regRed = new RegExp('ce3131');
        var inc = 0;
        this.get('tableController.childControllers').forEach(function(x) {
            inc++;
            console.log('reeeeed');
            console.log(x);
            console.log(x.get('content'));
            console.log(x.get('content.style_12'));
            if (regRed.test(x.get('content.style_12'))) erreurs.pushObject({
                type: 'Erreur au niveau des platines du convoyeur ' + x.get('content.ref'),
                message: ''
            });
            if (regRed.test(x.get('content.style_10'))) erreurs.pushObject({
                type: 'Erreur au niveau des eclissages du convoyeur ' + x.get('content.ref'),
                message: ''
            });
            if (regRed.test(x.get('content.style_1'))) erreurs.pushObject({
                type: 'Erreur au niveau des longerons du convoyeur ' + x.get('content.ref'),
                message: ''
            });


        });
        console.log('first');
        this.get('validationResults').forEach(function(x) {
            console.log(x);
            if (x.get('errorMessage') != null) erreurs.pushObject({
                type: x.get('name'),
                message: x.get('errorMessage')
            })
        });
        console.log('second');
        this.get('tableController.firstColController.validationResults').forEach(function(x) {
            console.log(x);
            if (x.get('errorMessage') != null) erreurs.pushObject({
                type: x.get('name'),
                message: x.get('errorMessage')
            })
        });
        console.log('third');
        this.get('tableController.childControllers').forEach(function(x) {
            x.get('validationResults').forEach(function(x) {
                console.log(x);
                if (x.get('errorMessage') != null) erreurs.pushObject({
                    type: x.get('name'),
                    message: x.get('errorMessage')
                })
            });
        })
        console.log('les erreus');
        var regex = new RegExp('pieceOrder_');


        erreurs.forEach(function(x) {
            console.log(x);
            if (x.type == 'ref') x.type = "la réference";
            if (x.type == 'zone') x.type = "la zone";
            if (x.type == 'ral') x.type = "la RAL manute";
            if (x.type == 'ralUnderConveyor') x.type = "la RAL sous manute";
            if (x.type == 'conveyorOption_2_value') {
                x.type = "la longueur du convoyeur";
                x.message = 'Doit étre multiple de 28'
            }
            if (x.type == 'ref') x.type = "la réference";
            if (regex.test(x.type)) {
                erreursPieces = true;
                erreurs.removeObject(x)
            }

        });
        if (erreursPieces) erreurs.pushObject({
            type: 'Veuillez vérifier les nombres de pieces saisis',
            message: ' '
        });
        var lesErreurs = '';
        erreurs.forEach(function(x) {
            lesErreurs += x.type + ' ' + x.message + '\n';
        });
        if (erreurs.length > 0) {
            alert(lesErreurs);
            return Ember.RSVP.Promise.reject();
        } else {

            console.log('updaaaaaaate');
            console.log(this.get("model"))
            var a = this,
                b = this.get("model"),
                c = [],
                d = [],
                e = [],
                f = [],
                h = [],
                k = [];
            return Ember.RSVP.Promise.all([b.get("options").then(function(a) {
                d = a.get("content");
                return Ember.RSVP.Promise.resolve()
            }), b.get("orderPieces").then(function(a) {
                console.log("submitform  orderpieces");
                console.log(a);
                c = a.get("content");
                return Ember.RSVP.Promise.all(a.map(function(a) {
                    return a.get("options").then(function(a) {
                        e.pushObjects(a.get("content"));
                        return Ember.RSVP.Promise.resolve()
                    })
                }))
            }), b.get("conveyors").then(function(a) {
                h = a.get("content");
                return Ember.RSVP.Promise.all(a.map(function(a) {
                    console.log("submitform : conveyor");
                    console.log(a);
                    console.log(a.get("ref"));
                    return Ember.RSVP.Promise.all([a.get("options").then(function(a) {
                        console.log('optiooooooooonsnsnsns');
                        console.log(a.get('content'));
                        a.get("content").map(function(x) {
                            console.log('loooooooop');
                            console.log(x.get('isValid'));
                            console.log(x.get('optionType.id'));
                            if ((x.id != null) && (x.get('optionType.id') == 7 || x.get('optionType.id') == 2)) {
                                x.deleteRecord();
                                x.save()
                            }
                        })
                        k.pushObjects(a.get("content"));
                        return Ember.RSVP.Promise.resolve()
                    }), a.get("pieceOrders").then(function(a) {
                        console.log("liste de piecesO");
                        a.map(function(a) {
                            console.log("pieceOrder pour le conveyor :" + a.id + " nombre dep :" + a.get("nbPieces"));
                            console.log(a);
                            if (a.get("nbPieces") != 0) {
                                f.pushObject(a);
                            }
                            if (a.get("nbPieces") == 0 && a.id != null) {
                                f.pushObject(a);
                            }


                        });
                        console.log('llslslslsls');
                        console.log(f);

                        console.log(f);
                        return Ember.RSVP.Promise.resolve()
                    })])
                }))
            })]).then(function() {
                console.log("DF SubmitForm");
                console.log("fffff");
                console.log(f);
                console.log("model");
                console.log(b);
                var resform = a.save(b, c, e, d, f, h, k)
                console.log("resssussusus submit");
                console.log(resform);
                return resform
            })
        }
    },
    save: function(a, b, c, d, e, f, h) {
        console.log("saving of newOrderPieces");
        console.log(e);
        var rrr = a.save().then(function() {
            var res = Ember.RSVP.Promise.all(b.map(function(a) {
                console.log('saaaaave de orderPiece' + a.get('isDirty'));
                console.log(a);
                console.log('resultaaat');
                var r = a.save();
                console.log(r);
                return r
            }).concat(d.map(function(a) {
                console.log('saaaaave de order option' + a.get('isDirty'));
                console.log(a);
                console.log('resultaaat');
                var r = a.save();
                console.log(r);
                return r
            })).concat(f.map(function(a) {
                console.log('saaaaave de conveyors' + a.get('isDirty'));
                console.log(a);
                console.log('resultaaat');
                var r = a.save();
                console.log(r);
                return r
            }))).then(function() {
                return Ember.RSVP.Promise.all(c.map(function(a) {
                    console.log('saaaaave de orderPiece OPtions' + a.get('isDirty'));
                    console.log(a);
                    console.log('resultaaat');
                    var r = a.save();
                    console.log(r);
                    return r
                }).concat(e.map(function(a) {
                    var r = '';
                    console.log('saaaaave de pieceOrder ' + a.get('isDirty'));
                    console.log(a);
                    if (a.get('nbPieces') + '' == 0) {
                        console.log('hna wahd 0');
                        a.deleteRecord();
                        r = a.save()
                    } else {
                        console.log('resultaaat');
                        r = a.save();
                        console.log(r);
                    }
                    return r
                })).concat(h.map(function(a) {
                    console.log('saaaaave de conv options ' + a.get('isDirty'));
                    console.log(h);
                    console.log('resultaaat');
                    var r = a.save();
                    console.log(r);
                    return r
                })))
            }, function(s) {
                console.log('la raison 2');
                console.log(s);
            });
            console.log('reeeees1');
            console.log(res);
            return res;
        }, function(s) {
            console.log('la raison 1');
            console.log(s);
        });
        console.log('todldldld');
        console.log(this.get('toDelete'));
        this.get('toDelete').forEach(function(x) {
            if (x.id != null) {
                if (0) {
                    x.get('pieceOrders').map(function(c) {
                        console.log('supp des pieces orders');
                        c.deleteRecord();
                        c.save();
                    });
                    x.get('conveyorOptions').map(function(c) {
                        console.log('supp de convop');
                        c.deleteRecord();
                        c.save()
                    });
                }
                console.log('suppp de ' + x.get('constructor.typeKey'));
                console.log(x);
                x.deleteRecord();
                x.save();
            }
        });
        console.log('thshshs');
        console.log(this);
        console.log('reeeees2');
        console.log(rrr);
        return rrr;
    },
    initOrderOptions: function() {
        var a = [];
        console.log("orderoptions : ");
        console.log(this.get("conveyorType.conveyorTypeOptions"));
        this.get("conveyorType.conveyorTypeOptions").forEach(function(b) {
            if (b.get("isOrderOption")) {
                var c = a.findBy("content.id", b.get("option.optionType.id"));
                Ember.isEmpty(c) ? (c = "orderOption_" + b.get("option.optionType.id"), a.pushObject(Ember.Object.create({
                    index: a.length,
                    name: c,
                    content: b.get("option.optionType.content"),
                    options: b.get("option.isCustomizable") ?
                        b.get("option.content") : [b.get("option.content")],
                    isArray: !b.get("option.isCustomizable"),
                    defaultValue: b.get("option.isDefault") ? b.get("option.id") : null
                })), this.addValidation(c + (b.get("option.isCustomizable") ? "_value" : ""), ValidationsLibrary.get(this.get("conveyorType.id"), c), !b.get("option.isCustomizable"))) : (b.get("option.isDefault") && c.set("defaultValue", b.get("option.id")), c.set("options", c.get("options").concat(b.get("option.content"))))
            }
        }, this);
        console.log("DF : initOrderOptions");
        console.log(a);
        this.addOptionObersers(a)
    },
    addOptionObersers: Ember.K,
    optionObservers: Ember.computed(function() {
        return Ember.A()
    }),
    removeOptionOberservers: function() {
        console.log("DF removeOptionOberservers");
        console.log(this.get("optionObservers"));
        this.get("optionObservers").forEach(function(a) {
            this.removeOberserver(a)
        }, this)
    }
});