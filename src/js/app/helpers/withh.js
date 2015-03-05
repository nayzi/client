Ember.Handlebars.registerBoundHelper("withh", function(a,b) {
    for (var c = a.toArray(), d = 0; d < c.length; d++) {
var rep =c[d]._data.optionType._data.replace;
var val= c[d]._data.optionValue;
var v="";
if(rep=="L4"&&val!=null){
if(val.length!=null){	
for(var i=0;i<4-val.length;i++){v+="0";}
val=v+val;}
}

        console.log("variable : "+val+" remplace :"+rep); b = b.replace("${" + rep + "}", val);}
    return b
    });