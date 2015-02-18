/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module Validations
 */

/**
 * Objet contenant les informations de validation d'un champ
 * @class ValidationResult
 * @namespace Validations
 */
/**
 * Clé dans la liste des validations
 * @property name
 * @type {String}
 */
/**
 * Résultat de la fonction de validation
 * @property isValid
 * @type {Boolean}
 * @default false
 */
/**
 * Message d'erreur si nécessaire
 * @property errorMessage
 * @type {String}
 * @default null
 */

!function() {
    /**
     * Plugin pour effectuer des validations de formulaire
     * @namespace Ember
     * @class Validations
     */
    Ember.Validations = Ember.Namespace.create({
        VERSION: '0.0.1'
    });
}(), function() {
    /**
     * Défini les niveaux d'erreur
     * @class ErrorLevels
     * @namespace Validations
     */
    Ember.Validations.ErrorLevels = {
        WARNING: 1,
        ERROR: 0
    };
}(), function() {
    /**
     * Défini les types de validation
     * @class Type
     * @namespace Validations
     */
    Ember.Validations.Type = {
        TEXT: 0,
        LIST: 1,
        FUNCTION: 2,
        LISTRANGE: 3,
        RANGE: 4,
        MIN: 5,
        MAX: 6
    };
}(), function() {
    /**
     * Effectue une validation pour le champ `fieldValue` grâce aux informations
     * contenu dans l'objet `validation`
     * @for Validations
     * @method validate
     * @param {Object} validation
     * @param {Any} fieldValue Valeur du champ à tester
     * @param {Object} hash [OPTIONNEL] Obligatoire pour une vérification sur une liste ou un ensemble borné. Contient les options de vérification
     * @return {Ember.RSVP.Promise}
     */
    Ember.Validations.validate = function(validation, fieldValue, hash) {
        validation.type = validation.type || Ember.Validations.Type.TEXT;
        validation.inputObj = validation.inputObj || false;
        validation.propToTest = validation.propToTest || 'id';
        validation.message = validation.message || 'Aucun message enregistré';
        fieldValue = validation.inputObj ? fieldValue.get(validation.propToTest) : fieldValue;

        var hasError = false;
        var hasWarning = false;
        var waitPromise = false;
        var fail = false;
        var message = validation.message;

        switch (validation.type) {
            case Ember.Validations.Type.TEXT:
                // On force la valeur de fieldValue afin que le test de la regex
                // renvoie false pour une chaine undefined ou null
                fieldValue = Ember.isEmpty(fieldValue) ? '' : fieldValue;

                if ((!validation.allowBlank || !Ember.isEmpty(fieldValue)) && !validation.pattern.test(fieldValue)) {
                    fail = true;
                }

                break;

            case Ember.Validations.Type.LIST:
                var val = (isNaN(hash[0]) ? fieldValue : parseInt(fieldValue));

                if (!hash.list.contains(val)) {
                    fail = true;
                }

                break;

            case Ember.Validations.Type.LISTRANGE:
                if (!Ember.isEmpty(fieldValue)) {
                    var val = parseInt(fieldValue);
                    if (!hash.list.contains(val)) {
                        var possibilities = Ember.Validations.giveClosestValues(val, hash.list.toArray());
                        fail = true;

                        message = validation.message + ' (' +
                            (possibilities.lower !== undefined ?
                                "<a href='javascript:" + hash.callback + "(\"" +
                                "FIELD_ID\", " + possibilities.lower +
                                ")'>" + possibilities.lower + '</a> ou '
                                : '') +
                            "<a href='javascript:" + hash.callback + "(\"" +
                            "FIELD_ID\", " + possibilities.greater +
                            ")'>" + possibilities.greater + '</a>)';
                    }
                }
                break;

            case Ember.Validations.Type.RANGE:
                val = parseFloat(fieldValue);

                if (hash.STRICT) {
                    if (hash.min > fieldValue || hash.max < fieldValue) {
                        fail = true;
                    }
                } else {
                    if (hash.min >= fieldValue || hash.max <= fieldValue) {
                        fail = true;
                    }
                }

                break;

            case Ember.Validations.Type.MIN:
                val = parseFloat(fieldValue);

                if (hash.STRICT) {
                    if (hash.min > fieldValue) {
                        fail = true;
                    }
                } else {
                    if (hash.min >= fieldValue) {
                        fail = true;
                    }
                }

                break;

            case Ember.Validations.Type.MAX:
                val = parseFloat(fieldValue);

                if (hash.STRICT) {
                    if (hash.max < fieldValue) {
                        fail = true;
                    }
                } else {
                    if (hash.max <= fieldValue) {
                        fail = true;
                    }
                }

                break;

            case Ember.Validations.Type.FUNCTION:
                waitPromise = true;
                return validation.check.call(hash.context, fieldValue).then(function() {
                    return Ember.RSVP.Promise.resolve({
                        hasError: false,
                        hasWarning: false,
                        message: ''
                    });
                }, function(error) {
                    if (validation.errLvl === Ember.Validations.ErrorLevels.WARNING) {
                        hasWarning = true;
                    } else if (validation.errLvl === Ember.Validations.ErrorLevels.ERROR) {
                        hasError = true;
                    }

                    return Ember.RSVP.Promise.resolve({
                        hasError: hasError,
                        hasWarning: hasWarning,
                        message: validation.message + (error && error.message ? error.message : '')
                    });
                }, 'Ember.Validations:Validate using function with late result');

                break;
        }

        if (!waitPromise) {
            return new Ember.RSVP.Promise(function(resolve, reject) {
                if (fail) {
                    if (validation.errLvl === Ember.Validations.ErrorLevels.WARNING) {
                        hasWarning = true;
                    } else if (validation.errLvl === Ember.Validations.ErrorLevels.ERROR) {
                        hasError = true;
                    }
                } else {
                    message = '';
                }

                resolve({
                    hasError: hasError,
                    hasWarning: hasWarning,
                    message: message
                });
            }, 'Ember.Validations:Validation of type ' + validation.type);
        }
    };
}(), function() {
    /**
     * Renvoi les deux plus proches valeurs (inférieur et supérieur) de la valeur saisie par l'utilisateur.
     * NB: Ne marche qu'avec les nombres
     * @method giveClosestValues
     * @param {Integer} value Valeur saisie par l'utilisateur
     * @param {Array.Integer} list La liste des valeurs possibles
     * @return {Object} 
     */
    Ember.Validations.giveClosestValues = function(value, list) {
        var l = 0;
        var g = 0;
        var current = 0;
        var prev = 0;

        // Make sure the array is sorted
        list = list.sort();

        // Iterate over the array
        list.every(function(val) {
            prev = current;
            current = val;
            if (value > prev && value < current) {
                l = prev;
                g = current;
                // Make the iteration to stop
                return false;
            }

            return true;
        });

        if (g === 0) {
            l = 0;
            g = current;
        }

        // Return the found values
        return {
            lower: (l === 0) ? undefined : l,
            greater: g
        };
    };
}(), function() {
    /**
     * Défini les mixins du plugin
     * @class Mixin
     * @namespace Validations
     */
    Ember.Validations.Mixin = Ember.Namespace.create();
}(), function() {
    /**
     * Défini le fonctionnement d'un objet validable.
     * @class ValidatableMixin
     * @namespace Mixin
     * @uses Ember.Mixin
     */
    Ember.Validations.Mixin.ValidatableMixin = Ember.Mixin.create({
        /**
         * Exécuté à chaque changement de la validation associé à cette vue
         * @method validationDidChange
         */
        validationDidChange: function() {
            if (!this.get('parentView.controller.isReseting')) {
                var fieldName = this.get('nameInController');
                var result = this.get('parentView.controller.validationResults').findBy('name', fieldName);
                this.set('hasError', !result.get('isValid'));
                if (!this.get('hasError')) {
                    if (!Ember.isEmpty(result.get('errorMessage'))) {
                        this.set('hasWarning', true);
                    } else {
                        this.set('hasWarning', false);
                    }
                }
                if (!Ember.isEmpty(result.get('errorMessage')) && (this.get('hasError') || this.get('hasWarning'))) {
                    this.updateValidationLayout(false);
                } else {
                    this.set('hasWarning', false);
                    this.set('hasError', false);
                    this.updateValidationLayout(true);
                }
                
                this.afterValidation();
                
                return true;
            }
            
            return false;
        },
        /**
         * Exécuté à chaque changement de la validation associé à cette vue.
         * Permet de lancer une procédure après la validation.
         * @method afterValidation
         */
        afterValidation: Ember.K,
        /**
         * Exécuté à chaque changement de la validation associé à cette vue.
         * Met à jour la vue en fonction du résultat. Doit être implémenté pour
         * chaque vue qui utilise cette mixin.
         * @method updateValidationLayout
         * @param {Boolean} messageIsHidden Indique si les erreurs doivent être affichées
         */
        updateValidationLayout: Ember.K,
        /**
         * Nom de la propriété dans le contrôleur
         * @property nameInController
         * @type {String}
         * @default Alias of name
         */
        nameInController: Ember.computed.oneWay('name'),
        /**
         * Lance la validation sur le champ
         * @method validate
         */
        validate: function() {
            Ember.warn('The parentView controller does not provide the validate function. Do you use the Validator mixin with controller ?', typeof this.get('parentView.controller').validate === 'function');
            if (typeof this.get('parentView.controller').validate === 'function') {
                this.get('parentView.controller').validate(this.get('nameInController'));
            }
        },
        /**
         * Indique si le champ contient une alerte
         * @property hasWarning
         * @type {Boolean}
         */
        hasWarning: false,
        /**
         * Indique si le champ contient une erreur
         * @property hasError
         * @type {Boolean}
         */
        hasError: false,
        didInsertElement: function() {
            this.get('parentView.controller').on(this.get('nameInController') + 'DidChange', this, this.validationDidChange);
            this._super();
        },
        willDestroyElement: function() {
            this.get('parentView.controller').off(this.get('nameInController') + 'DidChange', this, this.validationDidChange);
            this.set('hasError', false);
            this._super();
        }
    });
}(), function() {
    /**
     * Défini le fonctionnement d'un champ validable. Doit être utiliser pour étendre une vue
     * @class ValidatableInput
     * @namespace Mixin
     * @uses Ember.Validations.Mixin.ValidatableMixin
     * @uses Ember.View
     */
    Ember.Validations.Mixin.ValidatableInput = Ember.Mixin.create(Ember.Validations.Mixin.ValidatableMixin, {
        action: 'submitForm',
        focusOut: function() {
            this.validate();
        },
        validationDidChange: function() {
            if (!this._super()) {
                this.set('prevValue', null);
            }
        },
        updateValidationLayout: function(messageIsHidden) {
            var elt = this.$();

            if (messageIsHidden) {
                if (Ember.isEmpty(this.get('parentView.controller.' + this.get('nameInController'))))
                    this.set('prevValue', null);
                elt.qtip('hide').qtip('disable');
            } else {
                elt.qtip('enable').qtip(
                    'option',
                    'content.text',
                    this.get('parentView.controller.validationResults').findBy('name', this.get('nameInController')).get('errorMessage').replace(/FIELD_ID/g, elt.attr('id'))
                    );
                if (this.get('hasError')) {
                    elt.qtip('option', 'hide.event', false).qtip('option', 'show.event', 'focus').qtip('show');
                } else {
                    elt.qtip('option', 'show.event', 'mouseenter focus').qtip('option', 'hide.event', 'blur mouseleave');
                }
            }
        },
        validate: function() {
            if (this.get('prevValue') !== this.get('value') || Ember.isEmpty(this.get('prevValue'))) {
                this.set('prevValue', this.get('value'));

                this._super();
            }
        },
        classNameBindings: ['hasWarning:warning', 'hasError:error'],
        didInsertElement: function() {
            this.$().qtip({
                prerender: false,
                position: {
                    my: "left center",
                    at: "right center",
                    adjust: {
                        x: 1
                    },
                    viewport: $('body'),
                    target: this.$()
                },
                style: {
                    widget: true,
                    def: false
                },
                show: {
                    event: 'focus',
                    effect: function() {
                        $(this).show('slide', 300);
                    }
                },
                hide: {
                    event: false,
                    delay: 300,
                    fixed: true
                },
                content: {
                    text: ''
                }
            }).qtip('disable');

            this._super();
        },
        willDestroyElement: function() {
            this.$().qtip('destroy');
            this.set('prevValue', null);
            this._super();
        }
    });
}(), function() {
    /**
     * Défini le fonctionnement du controleur de la page contenant le formulaire
     * @class Validator
     * @namespace Mixin
     * @uses Ember.Mixin
     * @uses Ember.Controller
     */
    Ember.Validations.Mixin.Validator = Ember.Mixin.create(Ember.Evented, {
        actions: {
            submitForm: function() {
                var self = this;
                if (this.get('isSubmitting') !== true) {
                    this.set('isSubmitting', true);
                    this.validate().then(function() {
                        self.submitForm().then(function() {
                            self.set('isSubmitting', false);
                            self.send('successfulSaving');
                        }, function() {
                            self.set('isSubmitting', false);
                            self.send('failSaving');
                        });
                    }, function() {
                        self.set('isSubmitting', false);
                    });
                }
            },
            resetForm: function() {
                this.set('isReseting', true);
                this.reset();
            }
        },
        /**
         * Fait les manipulations nécessaire à l'envoi des données sur le serveur
         */
        submitForm: Ember.computed(function() {
            return Ember.RSVP.Promise.resolve();
        }),
        /**
         * Indique si le formulaire est non valide
         * @property isFormInvalid
         * @type {Boolean}
         */
        isFormInvalid: Ember.computed.not('isFormValid').property('isFormValid'),
        /**
         * Liste des résultats de la validation des champs
         * @property validationResults
         * @type {Validations.ValidationResult[]}
         */
        validationResults: Ember.computed(function() {
            return Ember.A();
        }),
        /**
         * Liste des champs à valider
         * @property validations
         * @type {Validations.Validation[]}
         */
        validations: Ember.computed(function() {
            return {};
        }),
        /**
         * Indique si le formulaire est valide
         * @property isFormValid
         * @type {Boolean}
         */
        isFormValid: Ember.computed(function() {
            return this.get('validationResults.length') > 0 ? this.get('validationResults').isEvery('isValid', true) : false;
        }).property('validationResults.length', 'validationResults.@each.isValid'),
        /**
         * Indique si le formulaire est en cour de réinitialisation
         * @property isReseting
         * @type {Boolean}
         */
        isReseting: false,
        init: function() {
            this._super();

            this.initFormProperties();
        },
        /**
         * Initialise les variables nécessaires à la validation
         * @method initFormProperties
         * @protected
         */
        initFormProperties: function() {
            var props = Ember.keys(this.get('validations'));

            props.forEach(function(prop) {
                this.get('validationResults').addObject(Ember.Object.create({
                    name: prop,
                    isValid: false,
                    errorMessage: null
                }));
            }, this);
        },
        /**
         * Ajoute une validation
         * @method addValidation
         * @param {String} key
         * @param {Ember.Validations.ValidationObject} validation
         * @param {Boolean} isValid Valeur optionnel indiquant l'état de la validation à l'initialisation (par défaut FALSE)
         */
        addValidation: function(key, validation, isValid) {
            this.get('validations')[key] = validation;
            
            if (!this.get('validationResults').isAny('name', key)) {
                this.get('validationResults').addObject(Ember.Object.create({
                    name: key,
                    isValid: isValid ? isValid : false,
                    errorMessage: null
                }));
            }
        },
        /**
         * Supprime une validation
         * @method removeValidation
         * @param {String} key
         */
        removeValidation: function(key) {
            var index = this.get('validationResults').lastIndexOf(this.get('validationResults').findBy('name', key));

            if (index !== -1) {
                this.get('validationResults').splice(index, 1);
            }

            delete this.get('validations')[key];
        },
        /**
         * Réinitialize le formulaire à son état d'origine
         * @method reset
         * @protected
         */
        reset: function() {
            this.get('validationResults').forEach(function(prop) {
                this.set(prop.get('name'), null);
                prop.set('isValid', false);
                prop.set('errorMessage', null);
                // Force ember à indiquer que la propriété a changé
                this.notifyPropertyChange(prop.get('name'));
                this.trigger(prop.get('name') + 'DidChange');
            }, this);
            Ember.run.next(this, function() {
                this.set('isReseting', false);
            });
        },
        /**
         * Effectue la vérification sur un champ ou tous les champs
         * @method validate
         * @param {String} fieldName Nom du champ
         * @return {Ember.RSVP.Promise}
         */
        validate: function(fieldName) {
            // If the form is in reset mode we don't want to validate
            if (this.get('isReseting')) {
                return new Ember.RSVP.Promise(function(resolve, reject) {
                    // In the case we are waiting the result we reject because reseating is equivalent to bad data
                    reject();
                }, 'Ember.Validations:Validation of field ' + fieldName + ' while reseating');
            }

            if (Ember.isBlank(fieldName)) {
                var promises = [];
                Ember.keys(this.get('validations')).forEach(function(fieldName) {
                    promises.push(this.validate(fieldName));
                }, this);

                return Ember.RSVP.Promise.all(promises, 'Ember.Validations:Validation of all fields of the form');
            } else {
                var validations = this.get('validations')[fieldName];

                if (!Ember.isArray(validations)) {
                    validations = [validations];
                }

                var hasError = false;
                var hasWarning = false;
                var messages = [];
                // We overload the toString method because we need a special format for the tooltip
                messages.toString = function() {
                    var t = '';
                    this.forEach(function(m) {
                        t = t + m + '<br />';
                    });
                    return t.substr(0, t.length - 6);
                };

                var promises = [];

                // Compile all the validations to do on the field
                validations.every(function(validation) {
                    var hash = {};
                    if (validation.type === Ember.Validations.Type.LISTRANGE) {
                        if (!Ember.isEmpty(validation.callback)) {
                            hash.list = this.get(fieldName.capitalize() + 'Values').mapBy('id');
                            hash.callback = validation.callback;
                        } else {
                            Ember.Logger.warn('Cannot check with type LISTRANGE because there is no callback function', 'Validation SKIPPED');
                            return true; // Same as doing 'continue' in a for loop
                        }
                    } else if (validation.type === Ember.Validations.Type.LIST) {
                        hash.list = this.get(fieldName.capitalize() + 'Values').mapBy('id');
                    } else if (validation.type === Ember.Validations.Type.RANGE) {
                        if (!Ember.isEmpty(validation.min) && !Ember.isEmpty(validation.max)) {
                            hash.min = validation.min;
                            hash.max = validation.max;
                            hash.INTEGER = validation.INTEGER || true;
                            hash.STRICT = validation.STRICT || true;
                        } else {
                            Ember.Logger.warn('Cannot check with type RANGE because you didn\'t define min or max', 'Validation SKIPPED');
                            return true; // Same as doing 'continue' in a for loop
                        }
                    } else if (validation.type === Ember.Validations.Type.MIN) {
                        if (!Ember.isEmpty(validation.min)) {
                            hash.min = validation.min;
                            hash.INTEGER = validation.INTEGER || true;
                            hash.STRICT = validation.STRICT || true;
                        } else {
                            Ember.Logger.warn('Cannot check with type RANGE because you didn\'t define min', 'Validation SKIPPED');
                            return true; // Same as doing 'continue' in a for loop
                        }
                    } else if (validation.type === Ember.Validations.Type.MAX) {
                        if (!Ember.isEmpty(validation.max)) {
                            hash.max = validation.max;
                            hash.INTEGER = validation.INTEGER || true;
                            hash.STRICT = validation.STRICT || true;
                        } else {
                            Ember.Logger.warn('Cannot check with type RANGE because you didn\'t define max', 'Validation SKIPPED');
                            return true; // Same as doing 'continue' in a for loop
                        }
                    } else if (validation.type === Ember.Validations.Type.FUNCTION) {
                        if (!Ember.isEmpty(validation.needContext) && validation.needContext) {
                            hash.context = this;
                        } else {
                            hash.context = null;
                        }
                    }
                    var value = this.get(fieldName);
                    promises.push(Ember.Validations.validate(validation, value, hash));

                    return true;
                }, this);

                var self = this;

                // When all the validations are done
                return Ember.RSVP.Promise.all(promises, 'Ember.Validations:Run all checking for field ' + fieldName).then(function(array) {
                    // Get the result of each validation (either valid or not) and compile a final result
                    array.forEach(function(result) {
                        hasError = hasError || result.hasError;
                        hasWarning = hasWarning || result.hasWarning;
                        if (result.hasError || result.hasWarning) {
                            messages.push(result.message);
                        }
                    });

                    var watched = self.get('validationResults').findBy('name', fieldName);
                    Ember.warn('Ember.Validations: you probably didn\'t use the `addValidation` method to add the validation of `' + fieldName + '`', watched !== undefined);

                    if (watched) {
                        watched.set('isValid', !hasError);
                        watched.set('errorMessage', (messages.length > 0) ? messages.toString() : undefined);
                        self.trigger(watched.get('name') + 'DidChange');
                    }
                    
                    if (hasError) {
                        return Ember.RSVP.Promise.reject();
                    } else {
                        return Ember.RSVP.Promise.resolve();
                    }
                }, function(error) {
                    var watched = self.get('validationResults').findBy('name', fieldName);
                    Ember.warn('Ember.Validations: you probably didn\'t use the `addValidation` method to add the validation of `' + fieldName + '`', watched !== undefined);

                    if (watched) {
                        watched.set('isValid', false);
                        watched.set('errorMessage', error.toString());
                        self.trigger(watched.get('name') + 'DidChange');
                    }

                    return Ember.RSVP.Promise.reject();
                }, 'Ember.Validations:Finish all checking of field ' + fieldName);
            }
        }
    });
}(), "undefined" == typeof location || "localhost" !== location.hostname && "127.0.0.1" !== location.hostname || Ember.Logger.warn("You are running a production build of Ember on localhost and won't receive detailed error messages. If you want full error messages please use the non-minified build provided on the Ember website.");