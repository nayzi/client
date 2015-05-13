PASC.BdcTable.Ext = PASC.BdcTable.Ext || Ember.Namespace.create();

/**
 * Contrôleur pour les colonnes du contenu du tableau
 * @class RCDController
 * @namespace Ext
 * @extends Ember.ObjectController
 * @uses PASC.BdcTable.ColControllerMixin
 */
PASC.BdcTable.Ext.TBController = Ember.ObjectController.extend(PASC.BdcTable.ColControllerMixin, {
    actions: {
        updateCategory: function(pieceTypeId) {
            console.log("RCD updateCategory");
            console.log("pieceTypeId");
            console.log(parseInt(pieceTypeId, 10));
            switch (parseInt(pieceTypeId, 10)) {
                case 1:
                    this.checkStringers();
                    break;

                case 5:
                    this.checkControlBoard();
                    break;

                case 12:
                    this.checkControlBoard();
                    break;
            }
        },
        calculate: function(pieceTypeId) {
            console.log("RCD calculate");
            console.log("pieceTypeId");
            console.log(parseInt(pieceTypeId, 10));
            var self = this;
            this.validate('conveyorOption_2_value').then(function() {
                self.calculateDecomposition();
            });
        }
    },
    conveyorOption_19: Ember.computed(function() {
        console.log("RCD conveyorOption_19");
        return {
            label: 0
        };
    }),

    hasAlreadyCalculated: function(pieceTypeId) {
        return this.get('pieceOrders').any(function(pieceOrder) {
            return pieceOrder.get('orderPiece.piece.pieceType.id') === 1 + '' && pieceOrder.get('nbPieces') > 0;
        });
    },
    getTextForDialogWarning: function(pieceTypeId) {
        return "Le convoyeur contient déjà une décomposition, êtes-vous sûr de vouloir refaire la décomposition ?<br />" +
            "Cela aura pour effet de remettre à zéro les longerons, rouleaux complémentaires et courroies.";
    },
    checkStringers: function() {

    },
    checkControlBoard: function() {


    },
    calculateDecomposition: function() {


    },
    generateStringerList: function() {
        var liste =[];
        return liste
    },
    initializeStringers: function(stringers) {
  
    },
    initializeComplementaryPieces: function() {
        
    },
    generateOrderPiece: function(orderPiece, piece) {
        console.log('RCD generateOrderPiece');
        console.log('orderPiece :');
        console.log(orderPiece);
        console.log('piece :');
        console.log(piece);

        var self = this;

        if (piece.l) {
            orderPiece.get('options').then(function(orderPieceOptions) {
/*                console.log('orderPieceOptions.findBy');
                console.log(orderPieceOptions.findBy('optionType.id', 1 + '').get('clientId'));*/
                self.set('parentController.firstColController.orderPieceOption_' + orderPieceOptions.findBy('optionType.id', 1 + '').get('clientId') + '_value', piece.l);
            });
        } 
        
        
      
        else {if (piece.strapLength) {
            orderPiece.get('piece').then(function(pieceRef) {
                pieceRef.get('options').then(function(options) {
                    var option = options.findBy('label', piece.strapLength + '');

                    orderPiece.get('options').then(function(orderPieceOptions) {
                        self.set('parentController.firstColController.orderPieceOption_' + orderPieceOptions.findBy('optionType.id', 19 + '').get('clientId'), option);
                    });
                });
            });
        }


        
        else if (piece.Ab) {
           console.log("pieeeeeeeeeeeeeeeeeceAb");
           console.log('orderPiece :');
        console.log(orderPiece);
        
        

        
        } 
    }this.set('pieceOrder_' + orderPiece.get('clientId') + '_value', piece.nb);}
});
