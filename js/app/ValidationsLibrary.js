/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

ValidationsLibrary = {
    get: function(convTypeId, key) {
        if (arguments.length < 2) {
            key = convTypeId;
            convTypeId = 0;
        }
        
        var val;
        var rootKey = key.split('_')[0];
        var valForKeyExist = !(ValidationsLibrary['CONVTYPE_' + convTypeId] === undefined || ValidationsLibrary['CONVTYPE_' + convTypeId][key] === undefined);
        var valForRootKeyExist = !(ValidationsLibrary['CONVTYPE_' + convTypeId] === undefined || ValidationsLibrary['CONVTYPE_' + convTypeId][rootKey] === undefined);

        if (valForKeyExist) {
            val = ValidationsLibrary['CONVTYPE_' + convTypeId][key];
        } else if (ValidationsLibrary['CONVEYORS'][key] !== undefined) {
            val = ValidationsLibrary['CONVEYORS'][key];
        } else if (ValidationsLibrary['GLOBAL'][key] !== undefined) {
            val = ValidationsLibrary['GLOBAL'][key];
        } else if (rootKey !== key) {
            if (valForRootKeyExist) {
                val = ValidationsLibrary['CONVTYPE_' + convTypeId][rootKey];
            } else if (ValidationsLibrary['CONVEYORS'][rootKey] !== undefined) {
                val = ValidationsLibrary['CONVEYORS'][rootKey];
            } else if (ValidationsLibrary['GLOBAL'][rootKey] !== undefined) {
                val = ValidationsLibrary['GLOBAL'][rootKey];
            }
        }

        Ember.warn('ValidationsLibrary: Aucune validation trouvé pour la clé `' + key + '`', val !== undefined);

        if (val === undefined || val.type === -1) {
            val = {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                type: Ember.Validations.Type.FUNCTION,
                check: function(value) {
                    return Ember.RSVP.Promise.resolve();
                }
            };
        }

        if (Ember.isArray(val)) {
            val.forEach(function(item) {
                item.message = item.message || 'Erreur inconnu, contacter le développeur';
            });
        } else {
            val.message = val.message || 'Erreur inconnu, contacter le développeur';
        }

        return val;
    },
    giveClosestValues: function(value, callback) {
        var l = 0;
        var g = 0;
        var i = 0;
        var current = callback.call(null, i);
        var prev = 0;

        // Search the first value above the current value
        while (value > current) {
            prev = current;
            current = callback.call(null, ++i);
        }

        if (current === 0) {
            l = 0;
            g = prev;
        } else {
            l = prev;
            g = current;
        }

        // Return the found values
        return {
            lower: (l === 0) ? undefined : l,
            greater: g
        };
    },
    GLOBAL: {
        eg: [
            {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                pattern: /^\d{3}$/,
                message: 'Doit contenir 3 chiffres'
            }, {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                type: Ember.Validations.Type.LISTRANGE,
                callback: 'Utils.setInputValue',
                message: 'EG non standard'
            }
        ],
        ral: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: /^\d{4}$/,
            message: 'Doit contenir 4 chiffres'
        },
        ralUnderConveyor: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: /^\d{4}$/,
            message: 'Doit contenir 4 chiffres'
        },
        drawerName: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            allowBlank: true,
            pattern: new RegExp('^[a-zA-Z0-9_ -]{1,}$'),
            message: 'Doit contenir des caractères alphanumériques (_, -, &lt;espace&gt; sont inclus)'
        },
        plan: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            allowBlank: true,
            pattern: new RegExp('^[a-zA-Z0-9_ -]{1,}$'),
            message: 'Doit contenir des caractères alphanumériques (_, -, &lt;espace&gt; sont inclus)'
        },
        climat: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            type: Ember.Validations.Type.LIST,
            inputObj: true
        }
    },
    CONVEYORS: {
        ref: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: /^[0-9a-zA-Z_ -]{1,}$/,
            message: 'Doit contenir des caractères alphanumériques (_, -, &lt;espace&gt; sont inclus)'
        },
        zone: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: /^[0-9a-zA-Z_ -]{1,}$/,
            allowBlank: true,
            message: 'Doit contenir des caractères alphanumériques (_, -, &lt;espace&gt; sont inclus)'
        },
        eg: [
            {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                pattern: /^\d{3}$/,
                allowBlank: true,
                message: 'Doit contenir 3 chiffres'
            }, {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                type: Ember.Validations.Type.LISTRANGE,
                callback: 'Utils.setInputValue',
                message: 'EG non standard'
            }
        ],
        ral: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: /^\d{4}|RAL$/i,
            message: 'Doit contenir 4 chiffres ou \'RAL\''
        },
        ralUnderConveyor: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: /^\d{4}|RAL$/i,
            message: 'Doit contenir 4 chiffres ou \'RAL\''
        },
        pieceType: {
            errLvl: Ember.Validations.ErrorLevels.ERROR,
            pattern: /^\d+$/,
            message: 'Doit être un nombre'
        },
        pieceOrderOption: {
            type: -1
        },
        conveyorOption: {
            type: -1
        }
    },
    CONVTYPE_3: {
        conveyorOption_2: [
            {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                type: Ember.Validations.Type.MIN,
                min: 392,
                message: 'Longueur minimum 392mm'
            },
            {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                type: Ember.Validations.Type.FUNCTION,
                message: 'Longueur non multiple de 28',
                check: function(value) {
                    if (value % 28 === 0) {
                        return Ember.RSVP.Promise.resolve({}, 'ValidationsLibrary:Test validity of conveyor\'s length');
                    } else {
                        var possibilities = ValidationsLibrary.giveClosestValues(value, function(i) {
                            return i * 28;
                        });

                        return Ember.RSVP.Promise.reject({
                            message: ' (' +
                                (possibilities.lower !== undefined ?
                                    "<a href='javascript:Utils.setInputValue(\"" +
                                    "FIELD_ID\", " + possibilities.lower +
                                    ")'>" + possibilities.lower + '</a> ou '
                                    : '') +
                                "<a href='javascript:Utils.setInputValue(\"" +
                                "FIELD_ID\", " + possibilities.greater +
                                ")'>" + possibilities.greater + '</a>)'
                        }, 'ValidationsLibrary:Test validity of conveyor\'s length');
                    }
                }
            },
            {
                errLvl: Ember.Validations.ErrorLevels.WARNING,
                type: Ember.Validations.Type.FUNCTION,
                message: 'Longueur plus courte que la longueur de plage',
                needContext: true,
                check: function(value) {
                    if (parseInt(this.get('conveyorOption_26_value'), 10) > parseInt(value, 10)) {
                        return Ember.RSVP.Promise.reject();
                    } else {
                        return Ember.RSVP.Promise.resolve();
                    }
                }
            }
        ],
        conveyorOption_26: {
            errLvl: Ember.Validations.ErrorLevels.WARNING,
            type: Ember.Validations.Type.FUNCTION,
            message: 'Plage longue, faîtes attention à la charge',
            needContext: true,
            check: function(value) {
                this.validate('conveyorOption_2_value');
                
                if (parseInt(value, 10) > 10 * parseInt(this.get('conveyorOption_19.label'), 10)) {
                    return Ember.RSVP.Promise.reject();
                } else {
                    return Ember.RSVP.Promise.resolve();
                }
            }
        },
        pieceOrderOption_1: [
            {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                type: Ember.Validations.Type.RANGE,
                min: 224,
                max: 2940,
                message: 'Longueur comprise entre 224 et 2940mm'
            },
            {
                errLvl: Ember.Validations.ErrorLevels.ERROR,
                type: Ember.Validations.Type.FUNCTION,
                message: 'Longueur non multiple de 28',
                check: function(value) {
                    if (value % 28 === 0) {
                        return Ember.RSVP.Promise.resolve({}, 'ValidationsLibrary:Test validity of stringer\'s length');
                    } else {
                        var possibilities = ValidationsLibrary.giveClosestValues(value, function(i) {
                            return i * 28;
                        });

                        return Ember.RSVP.Promise.reject({
                            message: ' (' +
                                (possibilities.lower !== undefined ?
                                    "<a href='javascript:Utils.setInputValue(\"" +
                                    "FIELD_ID\", " + possibilities.lower +
                                    ")'>" + possibilities.lower + '</a> ou '
                                    : '') +
                                "<a href='javascript:Utils.setInputValue(\"" +
                                "FIELD_ID\", " + possibilities.greater +
                                ")'>" + possibilities.greater + '</a>)'
                        }, 'ValidationsLibrary:Test validity of stringer\'s length');
                    }
                }
            }
        ]
    }
};