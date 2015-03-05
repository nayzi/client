Ember.Handlebars.registerBoundHelper("withh", function(a,b) {
    var z = a.toArray();
  
   for(var i=0;i<z.length;i++){b=b.replace("${"+z[i]._data.optionType._data.replace+"}", z[i]._data.optionValue);}
    return b;
   
    });