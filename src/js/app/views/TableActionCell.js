/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module Vues
 * @submodule Vues abstraites
 */

/**
 * 
 * 
 * @class TableActionCell
 * @namespace App
 * @extends Ember.Table.TableCell
 * @extends Ember.View
 */
App.TableActionCell = Ember.Table.TableCell.extend({
    templateName: 'table/actionCell',
    buttonList: Ember.computed(function() {
        if (this.get('cellContent') !== undefined) {
            var _this = this;
            $.each(this.get('cellContent.buttonList'), function(i, button) {
                button.set('hasAccess', false);
                _this.get('context.session.account').then(function(res) {
                    res.get('rights').then(function(result) {
                        button.set('hasAccess', Utils.hasAccess(result.toArray(), button.rights));
                    });
                });
            });

            return this.get('cellContent').buttonList;
        }
    }).property('cellContent'),
    rowId: Ember.computed(function() {
        return this.get('cellContent.id');
    }).property('cellContent.isLoaded')
});