/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Vues
 */

/**
 * En-tête de la gestion des affaires
 * @class HeaderDealsCreateView
 * @namespace App
 * @extends AbstractViews.HeaderView
 */
App.HeaderDealsCreateView = App.AbstractViews.HeaderView.extend({
    templateName: 'headerDealsForm',
    title: 'Créer une affaire'
});