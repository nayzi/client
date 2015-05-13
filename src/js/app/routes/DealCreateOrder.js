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
 * @class DealCreateOrderRoute
 * @namespace App
 * @extends Ember.Route
 * @uses Ember.SimpleAuth.AuthenticatedRouteMixin
 */
App.DealCreateOrderRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    actions: {
        willTransition: function(transition) {

            console.log("willTransition DealCreateOrderRoute");
            if ((transition.targetName != 'deal.updateOrder') && !confirm("Voulez vous quitter la page en cours et perdre les nouvelles saisies?"))
                transition.abort();
            else {

                var a = this.controller.get("model");
                console.log("willtransition");
                console.log(this.controller.get("model"));
                this.controller.removeOptionOberservers();

                return Ember.RSVP.Promise.all([a.get("conveyors").then(function(a) {
                    return Ember.RSVP.Promise.all([a.map(function(a) {
                        return Ember.RSVP.Promise.all([a.get("pieceOrders").then(function(a) {
                                a.forEach(function(a) {
                                    a.rollback()
                                })
                            }),
                            a.get("options").then(function(a) {
                                a.forEach(function(a) {
                                    a.rollback()
                                })
                            })
                        ]).then(function() {
                            a.rollback()
                        })
                    })])
                }), a.get("orderPieces").then(function(a) {
                    return Ember.RSVP.Promise.all(a.map(function(a) {
                        return a.get("options").then(function(a) {
                            a.forEach(function(a) {
                                a.rollback()
                            })
                        }).then(function() {
                            a.rollback()
                        })
                    }))
                }), a.get("options").then(function(a) {
                    a.forEach(function(a) {
                        a.rollback()
                    })
                })]).then(function() {
                    a.rollback()
                });
                this.store.unloadAll('climat');

            }




        }
    },
    beforeModel: function(a) {

        console.log("beforeModel DealCreateOrderRoute");
        var b = parseInt(a.params["deal.createOrder"].conv_type);
        
        if (3 == b) {
            a = this.store.find("climat");
            var c = this.store.find("optionType"),
                b = this.store.find("conveyorType", b),
                d = this.store.find("pieceType");
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
            })])
        }
        if (4 == b) {
            var FM = this.store.find("FournisseurMoteur"),
                FB = this.store.find("Fournisseurbande"),
                c = this.store.find("optionType"),
                b = this.store.find("conveyorType", b),
                d = this.store.find("pieceType");
                a = this.store.find("climat");
            this.set("FournisseurMoteur", FM);
            this.set("Fournisseurbande", FB);
            this.set("convTypeObject", b);
            this.set("OptTypes", c);
            this.set("PieceTypes", d);
            return Ember.RSVP.Promise.all([a,FM,FB, c, d, b.then(function(a) {
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
            })])
        }
        else this.transitionTo("deal.index");
    },
    model: function(a, b) {
        console.log('iniiiiit dealcreeee');
        console.log(this);
        console.log(this.get('controller'));
        console.log("model DealCreateOrderRoute");
        console.log(this.get("store"));
        return this.get("store").createRecord("order", {
            otp: a.otp
        })
    },
    afterModel: function(a) {
        console.log("afterModel DealCreateOrderRoute");
        return this.get("convTypeObject").then(function(b) {
            a.set("conveyorType", b)
        })
    },
    setupController: function(a, b) {

        this._super(a, b);
        b.set("deal", this.modelFor("deal"));
        a.set("ClimatValues",
            this.get("ClimatValues"));
        a.set("PieceTypes", this.get("PieceTypes"));
        a.set("Pieces", this.get("Pieces"));
        a.set("OptionTypes", this.get("OptTypes"));
        a.initLateProperties();

        Ember.run.next(a, a.send, "addConveyor")
    },
    renderTemplate: function(a, b) {
        console.log("renderTemplate DealCreateOrderRoute");
        this.render("dealCreate");
        this.render("headerDealCreate", {
            into: "dealCreate",
            outlet: "header"
        });
        this.render("dealCreateOrder", {
            into: "dealCreate",
            outlet: "content"
        })
    }
});