/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Contrôleurs
 */

/**
 * 
 * 
 * @class DealCreateOrderController
 * @namespace App
 * @extends Ember.ObjectController
 * @uses Ember.Validations.Mixin.Validator
 */
App.DealCreateOrderController = App.AbstractControllers.DealFormController.extend({
    addOptionObersers: function(a) {
        console.log("DealCreateOrderController addOptionObersers");
        console.log("orderOptions");
        console.log(a);
        console.log("this");
        console.log(this);
        var b = this;
        this.get("options").then(function(c) {
            for (c.addObjects(a.map(function(a) {
                    var b = a.get("isArray") ? a.get("options").find(function(b) {
                            return b.get("id") === a.get("defaultValue")
                        }) : a.get("options"),
                        c = this.get("store").createRecord("orderOption", {
                            order: this.get("model"),
                            optionType: a.get("content"),
                            option: b
                        });
                    this.set(a.get("name"), b);
                    a.get("isArray") && this.set(a.get("name").capitalize() + "Values", a.get("options"));
                    this.addObserver(a.get("name"), function(a, b) {
                        console.log('observer1');
                        c.set("option", a.get(b))
                    });
                    a.get("isArray") ? this.get("optionObservers").addObjects(a.get("name")) : (this.set(a.get("name") + "_value", a.get("isOptType26") ? 2 * parseInt(this.get("orderOption_19.label"), 10) : b.get("value")), this.addObserver(console.log('observer2'), a.get("name") + "_value", function(a, b) {
                        c.set("optionValue", a.get(b))
                    }), this.get("optionObservers").addObjects([a.get("name") +
                        "_value", a.get("name")
                    ]));
                    console.log("orderOptionRecord");
                    console.log(c);
                    return c
                }, b)); 0 !== a.length % 4;) a.push(Ember.Object.create({
                index: a.length,
                content: null,
                isArray: !1
            }))
        });
        Ember.run.sync();
        console.log("orderOptions after run");
        console.log(a);
        this.set("convTOptOrder", a)
    },
    init: function() {
        this._super();

        this.initValidations();
    },
    initLateProperties: function() {
        this.initOrderOptions();
    },
    initValidations: function() {
        this.addValidation('drawerName', ValidationsLibrary.get('drawerName'), true);
        this.addValidation('plan', ValidationsLibrary.get('plan'), true);
        this.addValidation('climat', ValidationsLibrary.get('climat'), true);
    },
    validations: {
        table: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            type: Ember.Validations.Type.FUNCTION,
            needContext: true,
            check: function() {
                if (this.get('table')) {
                    return Ember.RSVP.Promise.resolve();
                } else {
                    return Ember.RSVP.Promise.reject();
                }
            }
        }
    }
});