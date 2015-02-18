/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * Défini des fonctions utilitaires non relié à Ember
 * @module Utils
 */


/**
 * Cette classe fournit des fonctions utilitaires à l'ensemble du programme
 * @class Utils
 * @static
 */
Utils = {
    /**
     * Vérifie que les droits utilisateurs permettent d'accéder à l'information demandé
     * @method hasAccess
     * @param {Array} userRights Droits de l'utilisateur
     * @param {Object} rightsNeeded La liste des droits nécessaire ([1, 2, ...] ou 'all')
     * @return {Boolean} 
     */
    hasAccess: function(userRights, rightsNeeded) {
        var hasAccess = false;

        if (userRights !== undefined && userRights !== null && $.isArray(rightsNeeded)) {
            // Itereate over the needed right to check if one of them is contained in the userRights array
            $.each(rightsNeeded, function(i, right) {
                if ($.inArray(right.toString(), userRights.mapBy('id')) > -1) {
                    hasAccess = true;
                    // Make the iteration to stop
                    return false;
                }
            });
        } else {
            // No restricted access
            if (rightsNeeded === 'all')
                hasAccess = true;
        }

        return hasAccess;
    },
    /**
     * Force la valeur d'un champ et ferme le tooltip associé
     * @method setInputValue
     * @param {String} fieldId Id du champ dans le DOM
     * @param {Any} value Valeur à mettre dans le champ
     * @return {void}
     */
    setInputValue: function(fieldId, value) {
        $('#' + fieldId).val(value).qtip('hide').keyup();
    },
    /**
     * Retourne la valeur avec le bon type
     * @method getValue
     * @param {Any} value Valeur à transformer
     * @param {String} type Type en sortie
     * @return {Any}
     */
    getValue: function(value, type) {
        switch (type) {
            // Transforme la valeur en une chaine de caractère
            case "string":
                return (value !== undefined ? value.toString() : undefined);
                break;

                // Transforme la valeur en un nombre
            case "number":
                return parseFloat(value);
                break;

                // Transforme la valeur en une date
            case "date":
                return new Date(value);
                break;
                
                // Transforme la valeur en un boolean
            case "boolean":
                if (value.toLowerCase() === "true" || value === "1" || value === true || value === 1) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    },
    /**
     * Vérifie qu'un élément correspondant aux paramètres existe dans la BDD
     * @param {Object} params
     * @return {Ember.RSVP.Promise}
     */
    checkIfExist: function(params) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Utils.makeRequest('recordExists', 'GET', params).then(function(response) {
                if (Ember.isEmpty(response.exist)) {
                    reject();
                } else {
                    response.exist ? reject() : resolve();
                }
            }, function(xhr, status, error) {
                reject(xhr.responseJson || xhr.responseText);
            });
        });
    },
    /**
     * Fait une requête sur le serveur
     * @param {String} webservice Nom du webservice à appeler
     * @param {String} method Méthode HTTP utilisé pour la requête
     * @param {Object} params Paramètres à passer à la requête
     * @return {undefined}
     */
    makeRequest: function(webservice, method, params) {
        var adapter = App.ApplicationAdapter.create();
        var url = adapter.get('host') + '/' + adapter.get('namespace') + '/' + webservice;

        return Ember.$.ajax({
            url: url,
            type: method,
            contentType: 'application/json',
            data: params
        });
    },
    /**
     * Affiche une pop-in avec les erreurs retournées par le serveur
     * @method displayErrors
     * @param {Server.Error[]} errors Liste des erreurs serveur
     */
    displayErrors: function(errors) {
        var str = '';
        $.each(errors, function(i, error) {
            str = str + (i + 1) + '. (' + error.type + ') ' + error.message + ' (Erreur n°' + error.number + ')<br/>';
        });
        $('<div/>')
            .html(str)
            .dialog({
                appendTo: 'body',
                modal: true,
                autoOpen: true,
                title: 'Erreur sur le serveur',
                width: 600,
                buttons: [
                    {
                        text: 'Ok',
                        click: function() {
                            $(this).dialog('close');
                        }
                    }
                ]
            });
    }
    /**
     * Description du format des erreurs serveur
     * @class Error
     * @namespace Server
     */
    /**
     * Numéro de l'erreur
     * @property number
     * @type {Integer}
     */
    /**
     * Catégorie de l'erreur
     * @property type
     * @type {String}
     */
    /**
     * Description de l'erreur
     * @property message
     * @type {String}
     */
};
