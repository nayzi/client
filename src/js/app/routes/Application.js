/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

App.ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
    actions: {
        // override authenticateSession to instead of transitioning to a login route start authentication directly
        //authenticateSession: function() {
        //    this.get('session').authenticate('authenticators:custom', {});
        //}
    }
});