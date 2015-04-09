
App.DealRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    model: function(params) {
    	this.store.unloadAll('deal');
        return this.store.find('deal', params.deal_id);
    },
    afterModel: function(model) {
    	
        return model.get('orders');
    }
});