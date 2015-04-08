App.OrderDeleteRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {

    model: function(a, b) {
        console.log("Delete Order fffff");
        console.log(this.get("store").find("order", this.modelFor("order").get("id")).then(function(a) {
            return a
        }));
    }
    
});