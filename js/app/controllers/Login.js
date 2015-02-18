/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * 
 * @uses App.Mixin.Validator
 */
App.LoginController = Ember.Controller.extend(Ember.SimpleAuth.LoginControllerMixin, Ember.Validations.Mixin.Validator, {
    authenticatorFactory: 'ember-simple-auth-authenticator:custom',
    actions: {
        cancel: function() {
            this.set('identification', '');
            this.set('password', '');
        },
        displayErrors: function(errors) {
            Utils.displayErrors(Ember.isArray(errors) ? errors : [errors]);
        },
        successfulSaving: function() {

        },
        failSaving: function() {

        }
    },
    submitForm: function() {
        this.send('authenticate');

        return Ember.RSVP.Promise.resolve();
    },
    validations: {
        identification: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: /^[a-zA-Z0-9]{2,}$/,
            message: 'Nom d\'utilisateur non valide'
        },
        password: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: new RegExp('^.+$'),
            message: 'Ne peut être vide'
        }
    }
});