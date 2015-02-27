/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

App.OrderDetailsRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    
 model: function(params) {return this.get('store').find('order', params.order_id);



    }
});