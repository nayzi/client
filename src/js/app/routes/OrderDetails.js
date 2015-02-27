/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

App.OrderDetailsRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
    
 model: function(params) {console.log('orderdetails.js model :'+ params.order_id);        var ord = this.get('store').find('order', params.order_id).then(fulfill, reject);

        function fulfill(answer) {
            console.log("The answer is " + answer.otp);

            return answer;
        }

        function reject(reason) {
            console.log("Couldn't get the answer! Reason: " + reason);
        }



    }
});