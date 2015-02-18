/* 
 * @license PASC Client - Fives Cinetic
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Vues
 */

/**
 * 
 * 
 * @class HeaderDealsView
 * @namespace App
 * @extends AbstractViews.HeaderView
 */
App.HeaderDealsView = App.AbstractViews.HeaderView.extend({
    templateName: 'headerDeals',
    /*
     * Bouton pour créer une affaire
     * @attribute buttonCreate
     * @extend JQ.ButtonView
     */
    buttonCreate: JQ.ButtonView.extend({
        icons: {
            primary: 'ui-icon-plusthick'
        },
        text: false,
        label: 'Créer une affaire',
        click: function() {
            this.get('controller').send('create');
        }
    })
});