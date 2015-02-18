/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module Vues
 * @submodule Vues abstraites
 */

/**
 * Principe de base d'une liste affiché en plein écran
 * 
 * @class ListView
 * @namespace AbstractViews
 * @extends Ember.View
 */
App.AbstractViews.ListView = Ember.View.extend({
    tagName: 'div',
    /**
     * Hauteur minimale de la liste (en px)
     * @property minHeight
     * @type {Integer}
     * @default 200
     */
    minHeight: 200,
    didInsertElement: function() {
        this._super();
        var self = this;
        $(window).resize(function() {
            if ($(window).height() > $('.appHeader').height() + self.get('minHeight')) {
                $('body').css('overflow', 'hidden');
                $('#' + self.get('element.id')).height($(window).height() - $('.appHeader').height());
            } else {
                $('body').css('overflow', 'auto');
                $('#' + self.get('element.id')).height(self.get('minHeight'));
            }
        });
        $(window).resize();
    }
});