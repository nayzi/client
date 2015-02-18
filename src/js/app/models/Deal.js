/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.Deal"}}{{/crossLink}} est un objet qui stock les informations relatives à une
 * affaire. Le système crée automatiquement les instances de cet objet, il
 * n'est donc pas nécessaire de créer manuellement des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store.createRecord"}}{{/clink}}
 * 
 * @class Deal
 * @namespace App
 * @extends DS.Model
 */
App.Deal = DS.Model.extend({
    // Nécessaire pour les objets étants créé côté client
    clientId: function() {
        if (this.get('isNew')) {
            return App.generateIdForRecord();
        } else {
            return this.get('id');
        }
    }.property(),
    /**
     * Numéro de l'affaire
     * @property number
     * @type {String}
     */
    number: DS.attr('string'),
    /**
     * Taille de l'entre-guide
     * @property eg
     * @type {Integer}
     */
    eg: DS.attr('number'),
    /**
     * Couleur de la manut (codification RAL)
     * @property ral
     * @type {String}
     */
    ral: DS.attr('string'),
    /**
     * Couleur sous manut (codification RAL)
     * @property ralUnderConveyor
     * @type {String}
     */
    ralUnderConveyor: DS.attr('string', {defaultValue: '7015'}),
    /**
     * Nom du client
     * @property clientName
     * @type {String}
     */
    clientName: DS.attr('string'),
    /**
     * Nom de l'affaire
     * @property dealName
     * @type {String}
     */
    dealName: DS.attr('string'),
    /**
     * Nom et prénom de l'utilisateur ayant créé l'affaire
     * @property createdBy
     * @type {String}
     */
    createdBy: DS.attr('string'),
    /**
     * Date de création de l'affaire au format ISO-8601
     * @property createdAt
     * @type {String}
     */
    createdAt: DS.attr('string'),
    /**
     * Liste des bons de commandes liés à l'affaire
     * @property orders
     * @type {Integer[]}
     */
    orders: DS.hasMany('order', {async: true})
});

App.Deal.FIXTURES = [{
        id: 1,
        number: '165486',
        eg: 630,
        ral: 1040,
        clientName: 'La Poste',
        dealName: 'Extension site 1 Rhône',
        createdBy: 'Barthélemy Laurans',
        orders: [1, 2, 3, 4]
    }, {
        id: 2,
        number: '165485',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'La Poste',
        dealName: 'Extension site 1 Rhône',
        createdBy: 'Barthélemy Laurans',
        orders: [5, 6]
    }, {
        id: 3,
        number: '165476',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'La Poste',
        dealName: 'Extension site 1 Rhône',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 4,
        number: '165585',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'La Poste',
        dealName: 'Extension site 1 Rhône',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 5,
        number: '164485',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'La Poste',
        dealName: 'Extension site 1 Rhône',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 6,
        number: '165456',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'La Poste',
        dealName: 'Extension site 1 Rhône',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 7,
        number: '165475',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Extension site 1 Rhône',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 8,
        number: '163475',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Test',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 9,
        number: '169475',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Nouveau',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 10,
        number: '165465',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'La Poste',
        dealName: 'Test truc',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 11,
        number: '168975',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 12,
        number: '168976',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 13,
        number: '168977',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 14,
        number: '168984',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 15,
        number: '168985',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 16,
        number: '168986',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 17,
        number: '168987',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 18,
        number: '168988',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 19,
        number: '168989',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 20,
        number: '168990',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 21,
        number: '168991',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 22,
        number: '168992',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 23,
        number: '168993',
        eg: 680,
        ral: 1030,
        ralUnderConveyor: 7015,
        clientName: 'Lafarge',
        dealName: 'Truc machin',
        createdBy: 'Barthélemy Laurans'
    }
];