/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

App.OrderDetailsRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    
 model: function(params) {console.log('parametre'+params);
 alert(params.order_id)
    return this.get('store').find('order', params.order_id);



    }
});