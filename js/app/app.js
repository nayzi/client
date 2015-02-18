/* 
 * @license PASC Client - Fives Cinetic
 * Available via the MIT or new BSD license.
 */

/**
 * Défini l'application PASC.
 * @module App
 */


// Initialise MomentJS (http://momentjs.com/)
moment.lang('fr');

// Initialise l'application en créant une instance d'application Ember.
App = Ember.Application.extend({
    LASTID: 0,
    generateIdForRecord: function() {
        this.incrementProperty('LASTID');
        return "localId-" + this.get('LASTID');
    }
}).create({
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
//    ApplicationAdapter: DS.FixtureAdapter.extend({
//	queryFixtures: function(fixtures, query, type) {
//	    return fixtures.filter(function(item) {
//		for (var prop in query) {
//		    if (item[prop] !== query[prop]) {
//			return false;
//		    }
//		}
//		return true;
//	    });
//	}
//    }),
    ApplicationAdapter: DS.RESTAdapter.extend({
        host: 'API_URL',
        namespace: 'API_PATH'
    }),
    ApplicationRoute: Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin)
});

// Ajoute un initialisateur à l'application afin de paramétrer le plugin [Ember-SimpleAuth](https://github.com/simplabs/ember-simple-auth)
App.initializer({
    name: 'authentication',
    initialize: function(container, application) {
        // Ajoute le stockage des informations de session
        Ember.SimpleAuth.Session.reopen({
            /**
             * Informations sur l'utilisateur connecté.
             * @property account
             * @type App.User
             */
            account: function() {
                var userId = this.get('userId');
                if (!Ember.isEmpty(userId)) {
                    return container.lookup('store:main').find('user', userId);
                }
            }.property('userId'),
            /**
             * Indique si l'utilisateur a accès à l'interface de gestion.
             * @property canManage
             * @type boolean
             */
            canManage: function() {
                var self = this;
                // Attente du chargement des informations utilisateur
                this.get('account').then(function(res) {
                    // Attente de la récupération des droits de l'utilisateur
                    res.get('rights').then(function(result) {
                        self.set('canManage', Utils.hasAccess(result.toArray(), [1, 2]));
                    });
                });
            }.property('account')
        });

        /**
         * Ajout du processus d'identification
         * @class Authenticator
         * @namespace Session
         */
        container.register('ember-simple-auth-authenticator:custom', Ember.SimpleAuth.Authenticators.Base.extend({
            /**
             * Restaure la session avec les informations stockées dans l'ordinateur.
             * @method restore
             * @param {Object} storage
             * @return {Ember.RSVP.Promise}
             */
            restore: function(storage) {
                if (!Ember.isEmpty(storage.userId)) {
                    return new Ember.RSVP.Promise(function(resolve, reject) {
                        resolve(storage);
                    });
                } else {
                    return new Ember.RSVP.Promise(function(resolve, reject) {
                        reject();
                    });
                }
            },
            /**
             * Essaye d'authentifier l'utilisateur en fonction de ses identifiants.
             * @method authenticate
             * @param {Object} credentials
             * @return {Ember.RSVP.Promise}
             */
            authenticate: function(credentials) {
                return new Ember.RSVP.Promise(function(resolve, reject) {
                    Utils.makeRequest('session', 'POST', JSON.stringify({
                        username: credentials.identification,
                        password: credentials.password
                    })).then(function(response) {
                        if (Ember.isEmpty(response.id) || Ember.isEmpty(response.token)) {
                            console.log(response);
                            reject(response);
                        } else {
                            resolve({userId: response.id, token: response.token});
                        }
                    }, function(xhr, status, error) {
                        reject(xhr.responseJSON);
                    });
                });
            },
            /**
             * Déconnecte l'utilisateur.
             * @method invalidate
             * @return Ember.RSVP.Promise
             */
            invalidate: function() {
                return new Ember.RSVP.Promise(function(resolve, reject) {
                    Utils.makeRequest('session', 'delete', {}).always(function() {
                        resolve();
                    });
                });
            }
        }));

        /**
         * Injection de la clé d'identification lors des requêtes sur le serveur
         * @class Authorizer
         * @namespace Session
         */
        container.register('ember-simple-auth-authorizer:custom', Ember.SimpleAuth.Authorizers.Base.extend({
            /**
             * Injecte la clé d'identification lors des requêtes sur le serveur
             * @method authorize
             * @param {xhr} jqXHR
             * @param {Object} requestOptions
             */
            authorize: function(jqXHR, requestOptions) {
                if (this.get('session.isAuthenticated') && !Ember.isEmpty(this.get('session.token')) && !Ember.isEmpty(this.get('session.userId'))) {
                    jqXHR.setRequestHeader('Authorization', JSON.stringify({
                        token: this.get('session.token'),
                        id: this.get('session.userId')
                    }));
                }
            }
        }));

        // Initialise le plugin [Ember-SimpleAuth](https://github.com/simplabs/ember-simple-auth)
        Ember.SimpleAuth.setup(container, application, {routeAfterAuthentication: 'deals', authorizerFactory: 'ember-simple-auth-authorizer:custom'});
    }
});

/**
 * 
 * @class TextField
 * @namespace App
 * @uses Ember.Validations.Mixin.ValidatableInput
 * @extends Ember.TextField
 */
App.TextField = Ember.TextField.extend(Ember.Validations.Mixin.ValidatableInput, {
    /**
     * Timer indiquant si le champs est en attente. Utile pour déclencher
     * une validation après que l'utilisateur ait fini de saisir les données sans attendre un focusout
     * @property isWaiting
     * @type {String}
     * @protected
     */
    isWaiting: null,
    keyUp: function(e) {
        if (!Ember.isBlank(this.get('maxlength')) && !Ember.isEmpty(this.get('value')) && this.get('maxlength') === this.get('value').length) {
            this.validate();
            return;
        }

        if (Ember.isBlank(this.get('maxlength')) && !Ember.isEmpty(this.get('value'))) {
            Ember.run.cancel(this.get('isWaiting'));

            this.set('isWaiting', Ember.run.later(this, function() {
                if (!this.get('isDestroyed'))
                    this.validate();
            }, 750));
            return;
        }
        
        return this._super(e);
    }
});

/**
 * 
 * @class Select
 * @namespace App
 * @uses Ember.Validations.Mixin.ValidatableInput
 * @extends Ember.Select
 */
App.Select = Ember.Select.extend(Ember.Validations.Mixin.ValidatableInput, {
    change: function() {
        Ember.run.next(this, this.validate);
    }
});