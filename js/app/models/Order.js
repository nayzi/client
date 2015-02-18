/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * @module App
 * @submodule Modèles
 */

/**
 * Un {{#crossLink "App.Order"}}{{/crossLink}} est un objet qui stock les informations relatives à un
 * bon de commande. Le système crée automatiquement les instances de cet objet,
 * il n'est donc pas nécessaire de créer manuellement des instances de celui-ci.
 * 
 * Pour créer un enregistrement, voir {{#clink "DS.Store.createRecord"}}{{/clink}}
 * 
 * @class Order
 * @namespace App
 * @extends DS.Model
 */
App.Order = DS.Model.extend({
    // Nécessaire pour les objets étants créé côté client
    clientId: function() {
        if (this.get('isNew')) {
            return App.generateIdForRecord();
        } else {
            return this.get('id');
        }
    }.property(),
    /**
     * Affaire liée à ce bon de commande
     * @property deal
     * @type {App.Deal}
     */
    deal: DS.belongsTo('deal', {async: true}),
    /**
     * Numéro de BPE
     * @property bpe
     * @type {String}
     */
    bpe: DS.attr('string'),
    /**
     * Type de convoyeur
     * @property conveyorType
     * @type {App.ConveyorType}
     */
    conveyorType: DS.belongsTo('conveyorType', {async: true}),
    /**
     * Statut du bon de commande
     * @property status
     * @type {App.OrderStatus}
     */
    status: DS.belongsTo('orderStatus', {async: true}),
    /**
     * Nom du dessinateur du plan
     * @property drawerName
     * @type {string}
     */
    drawerName: DS.attr('string', {defaultValue: undefined}),
    /**
     * Nom du plan
     * @property plan
     * @type {string}
     */
    plan: DS.attr('string', {defaultValue: undefined}),
    /**
     * Climat de fonctionnement
     * @property climat
     * @type {App.Climat}
     */
    climat: DS.belongsTo('climat'),
    /**
     * Pièces utilisées par les convoyeurs du bon de commande
     * @property orderPieces
     * @type {App.OrderPiece[]}
     */
    orderPieces: DS.hasMany('orderPiece', {async: true}),
    /**
     * Date de création du bon de commande au format ISO-8601
     * @property createdAt
     * @type {string}
     */
    createdAt: DS.attr('string'),
    /**
     * Nom et prénom de l'utilisateur ayant créé le bon de commande
     * @property createdBy
     * @type {string}
     */
    createdBy: DS.attr('string'),
    /**
     * Date de dernière édition du bon de commande au format ISO-8601
     * @property lastEditedAt
     * @type {string}
     */
    lastEditedAt: DS.attr('string', {defaultValue: undefined}),
    /**
     * Nom et prénom de l'utilisateur ayant édité le bon de commande en dernier
     * @property lastEditedBy
     * @type {string}
     */
    lastEditedBy: DS.attr('string', {defaultValue: undefined}),
    /**
     * Liste des convoyeurs du bon de commande
     * @property conveyors
     * @type {App.Conveyors[]}
     */
    conveyors: DS.hasMany('conveyor', {async: true}),
    /**
     * Liste des options sur le bon de commande
     * @property options
     * @type {App.OrderOption[]}
     */
    options: DS.hasMany('orderOption', {async: true})
});

App.Order.FIXTURES = [
    {
        id: 1,
        bpe: '204',
        conveyorType: 1,
        status: 1,
        climat: 1,
        createdAt: '2014-04-02T12:45:00Z',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 2,
        bpe: '205',
        conveyorType: 1,
        status: 2,
        climat: 1,
        plan: 'A35550011',
        createdAt: '2014-04-02T12:45:00Z',
        createdBy: 'Barthélemy Laurans',
        lastEditedBy: 'Jérome Forestieri',
        lastEditedAt: '2014-04-02T13:45:00Z'
    }, {
        id: 3,
        bpe: '308',
        conveyorType: 1,
        status: 3,
        climat: 1,
        createdAt: '2014-04-02T12:45:00Z',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 4,
        bpe: '201',
        conveyorType: 1,
        status: 4,
        climat: 1,
        createdAt: '2014-04-02T12:45:00Z',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 5,
        bpe: '201',
        conveyorType: 1,
        status: 5,
        climat: 1,
        createdAt: '2014-03-02T12:45:00Z',
        createdBy: 'Barthélemy Laurans'
    }, {
        id: 6,
        bpe: '306',
        conveyorType: 1,
        status: 6,
        climat: 1,
        createdAt: '2014-02-02T12:45:00Z',
        createdBy: 'Barthélemy Laurans'
    }
];