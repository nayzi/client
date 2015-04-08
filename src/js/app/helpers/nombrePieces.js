Ember.Handlebars.registerBoundHelper("nombrePieces", function(a) {console.log("nombre est "+parseFloat(a.get('nbPieces')/2000));
   if( a.get('orderPiece.piece.id')==28) return Math.round(parseFloat(a.get('nbPieces')/2000)*100)/100;
   else return a.get('nbPieces');
});