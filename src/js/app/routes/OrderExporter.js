App.OrderExporterRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {

     beforeModel: function(a) {
        console.log("beforeModel OrderRoute");
        a = this.store.find("climat");
        var b = this.store.find("optionType"),
            c = this.store.find("conveyorType", 3),
            d = this.store.find("pieceType");
        this.set("ClimatValues", a);
        this.set("convTypeObject", c);
        this.set("OptTypes", b);
        this.set("PieceTypes", d);
        return Ember.RSVP.Promise.all([a, b, d, c.then(function(a) {
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
    },
    model: function(a, b) {
        console.log("model OrderRoute");
        return this.get("store").find("order", this.modelFor('order').get('id')).then(function(a) {
            return a
        })
    },
    afterModel: function(a) {
        console.log("afterModel OrderRoute");
        return Ember.RSVP.Promise.all([a.get("conveyorType"), a.get("options"), a.get("orderPieces").then(function(a) {
            return Ember.RSVP.Promise.all(a.map(function(a) {
                return Ember.RSVP.Promise.all([a.get("options"), a.get("piece")])
            }))
        }), a.get("conveyors").then(function(a) {
            return Ember.RSVP.Promise.all(a.map(function(a) {
                return Ember.RSVP.Promise.all([a.get("pieceOrders").then(function(a) {
                    a.map(function(a) {
                        return Ember.RSVP.Promise.all([a.get("orderPiece").then(function(a) {
                            return Ember.RSVP.Promise.all([a.get("piece"),
                                a.get("options").then(function(a) {
                                    a.map(function(a) {
                                        return Ember.RSVP.Promise.all([a.get("option"), a.get("optionType")])
                                    })
                                })
                            ])
                        })])
                    })
                }), a.get("options")])
            }))
        })])
    },
    renderTemplate: function() {
        this.render("orderExporter");}
});