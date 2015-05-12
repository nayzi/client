/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Routes
 */

/**
 * Route pour la création d'un bon de commande
 * @class DealUpdateOrderRoute
 * @namespace App
 * @extends Ember.Route
 * @uses Ember.SimpleAuth.AuthenticatedRouteMixin
 */
App.DealUpdateOrderRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    actions: {
        willTransition: function(transition) {

            console.log("willTransition DealUOrderRoute");

            if (!confirm("Voulez vous quitter la page en cours et perdre les nouvelles saisies?"))
                transition.abort();
            console.log('reffeefefe');




        },
    },


    beforeModel: function(a) {

        console.log("beforeModel DealUpdateOrderRoute");
        console.log(this);
        console.log(a.state.handlerInfos[3].params.otp);
        var diz = this;

        console.log(a);
        var b = parseInt(a.params["deal.updateOrder"].conv_type);
        if (3 !== b) this.transitionTo("deal.index");
        else {
            var otp = a.state.handlerInfos[3].params.otp;
            a = this.store.find("climat");
            var c = this.store.find("optionType"),
                b = this.store.find("conveyorType", b),
                d = this.store.find("pieceType");
            var order = this.store.find("order", otp);
            console.log('loooootp');
            console.log(order);
            this.set("ClimatValues", a);
            this.set("convTypeObject", b);
            this.set("OptTypes", c);
            this.set("PieceTypes", d);
            return Ember.RSVP.Promise.all([a, c, d, b.then(function(a) {
                    return Ember.RSVP.Promise.all([a.get("conveyorTypeOptions").then(function(a) {
                        var b = [];
                        a.forEach(function(a) {
                            b.push(a.get("_data.option.id"))
                        });
                        return a.get("store").find("option", {
                            ids: b.uniq()
                        }).then(function(b) {
                            var c = [];
                            a.forEach(function(a) {
                                c.push(a.get("option"))
                            });
                            b.forEach(function(a) {
                                c.push(a.get("optionType"))
                            });
                            return Ember.RSVP.Promise.all(c)
                        })
                    }), a.get("pieceAvailabilities").then(function(a) {
                        var b = [];
                        a.forEach(function(a) {
                            b.push(a.get("_data.piece.id"))
                        });
                        return a.get("store").find("piece", {
                            ids: b
                        }).then(function(b) {
                            return Ember.RSVP.Promise.all(a.map(function(a) {
                                return a.get("piece").then(function(a) {
                                    return Ember.RSVP.Promise.all([a.get("options").then(function(a) {
                                            return Ember.RSVP.Promise.all(a.map(function(a) {
                                                return a.get("optionType")
                                            }))
                                        }),
                                        a.get("pieceType"), a.get("climats")
                                    ])
                                })
                            }))
                        })
                    })])
                }),
                this.store.find("order", otp).then(function(o) {
                    return Ember.RSVP.Promise.all(o.get('conveyors').map(function(c) {
                        c.get('pieceOrders').then(function(po) {
                            return Ember.RSVP.Promise.all(po.map(function(poo) {
                                return Ember.RSVP.Promise.all([poo.get('orderPiece').then(function(op) {
                                    return op
                                })]);
                                return poo
                            }))
                        });
                        return c
                    }))
                })
            ])
        }
    },
    model: function(a, b) {
        console.log("model DealUpdateOrderRoute");
        console.log(a);
        console.log(b);
        console.log(this.get("store"));
        return this.get("store").find("order", a.otp)
    },
    afterModel: function(a) {
        console.log("afterModel DealUpdateOrderRoute");
        return this.get("convTypeObject").then(function(b) {
            a.set("conveyorType", b)
        })
    },
    setupController: function(a, b) {
        console.log("setupController DealUpdateOrderRoute");
        console.log(a);
        console.log(b);
        this.container.lookup('view:toplevel').rerender();

        this._super(a, b);
        b.set("deal", this.modelFor("deal"));
        a.set("ClimatValues",
            this.get("ClimatValues"));
        a.set("PieceTypes", this.get("PieceTypes"));
        a.set("Pieces", this.get("Pieces"));
        a.set("OptionTypes", this.get("OptTypes"));
        //a.set("Order", this.get("model"));
        a.set("pieceOrders", this.get("pieceOrders"));
        a.initLateProperties();
        //     if(b.get('conveyors')!=undefined)
        //  b.get('conveyors').then(function(cnvs){cnvs.map(function(cnv){console.log('getting conveyors');console.log(cnv);
        //       //   Ember.run.next(a, a.send, "updateConveyor",cnv)
        // })});

    },
    renderTemplate: function(a, b) {
        console.log("renderTemplate DealUpdateOrderRoute");
        this.render("dealUpdate");
        this.render("headerDealCreate", {
            into: "dealUpdate",
            outlet: "header"
        });
        this.render("dealUpdateOrder", {
            into: "dealUpdate",
            outlet: "content"
        })
    }
});