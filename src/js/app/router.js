/* 
 * @license PASC Client - Fives Cinetic
 * Available via the MIT or new BSD license.
 */

App.Router.reopen({
    rootURL: '/DEST_FOLDER'
});

App.Router.map(function() {
    this.route('logout');
    this.route('login');
    this.resource('deals', function() {
        this.route('createDeal');
        this.resource('deal', {path: 'deal/:deal_id'}, function() {
            this.route('createOrder', {path: 'createOrder/:BPE/:conv_type'});
            this.route('edit');
            this.resource('order', {path: 'order/:order_id'}, function() {
                this.route('edit');
                this.route('print');
            });
        });
    });
    this.resource('manage', function() {

    });

});