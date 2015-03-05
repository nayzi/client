
Ember.Handlebars.registerBoundHelper("with", function(a,b,c) {
    var j =c.replace("${"+b+"}", a);
    return (j);
    });