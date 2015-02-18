/* 
 * @license PASC Client - Fives
 * Available via the MIT or new BSD license.
 */

/**
 * Contient tous les modèles des données utilisés par Ember. Leur description
 * correspond au format JSON retourné par le serveur
 * 
 * @module App
 * @submodule Modèles
 * @main Modèles
 */

/**
 * Contient toutes les vues de l'application. Ces vues sont utilisées au travers
 * de outlets. Pour savoir où est utilisé une vue, il faut regarder dans la
 * définition des routes.
 * 
 * @module App
 * @submodule Vues
 * @main Vues
 */

/**
 * Contient toutes les routes de l'application. Ces routes définissent les
 * chemin d'accès de l'application. Elles sont en charge de la récupération des
 * données sur le serveur
 * 
 * @module App
 * @submodule Routes
 * @main Routes
 */

/**
 * Contient toutes les vues abstraites de l'application. Ces vues ont besoins
 * d'être étendues pour être utilisées
 * 
 * @module Vues
 * @submodule Vues abstraites
 * @main Vues abstraites
 */

/*
 * @class AbstractViews
 * @namespace App
 * @uses Ember.Namespace
 */
App.AbstractViews = App.AbstractViews || Ember.Namespace.create();

/**
 * Contient tous les contrôleurs abstraits de l'application. Ces contrôleurs ont besoins
 * d'être étendus pour être utilisés
 * 
 * @module Contrôleurs
 * @submodule Contrôleurs abstraits
 * @main Contrôleurs abstraits
 */

/*
 * @class AbstractControllers
 * @namespace App
 * @uses Ember.Namespace
 */
App.AbstractControllers = App.AbstractControllers || Ember.Namespace.create();

/**
 * Contient tous les modèles abstraits de l'application. Ces modèles ont besoins
 * d'être étendus pour être utilisés
 * 
 * @module Contrôleurs
 * @submodule Contrôleurs abstraits
 * @main Contrôleurs abstraits
 */

/*
 * @class AbstractModels
 * @namespace App
 * @uses Ember.Namespace
 */
App.AbstractModels = App.AbstractModels || Ember.Namespace.create();