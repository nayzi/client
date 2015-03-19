Ember.Handlebars.registerBoundHelper("withh", function(a,b, cnv,opt,m) {

    for (var c = a.toArray(), d = 0; d < c.length; d++) {
        var e = c[d]._data.optionType._data.replace,
            f = c[d]._data.optionValue,
            h = "";
        if ("L4" == e && null != f && null != f.length) {
            for (var g = 0; g < 4 - f.length; g++) h += "0";
            f = h + f
        }  
        if(e=="P"){console.log("voila"+c[d]._data.option._data.value);b = b.replace("${P}",c[d]._data.option._data.value);}
        b = b.replace("${" + e + "}", f); - 1 < b.indexOf("B") && ("Basse" == c[d]._data.option._data.label || "Haute" == c[d]._data.option._data.label) &&
            (b = b.replace("B", "Haute" == c[d]._data.option._data.label ? 1 : 0))
    }
   b = b.replace("${EG4}",cnv._data.eg);
var RAL=(cnv._data.ralUnderConveyor=="RAL")?m._data.deal._data.ral:cnv._data.ral;
var RALU=(cnv._data.ralUnderConveyor=="RAL")?m._data.deal._data.ralUnderConveyor:cnv._data.ralUnderConveyor;
    b = b.replace("${RALU}",RAL);

    b = b.replace("${RAL}",RALU);
  
    var o =opt.toArray();
    if((b=="${Z}-${xxxx}-${yyy}-${zzz}-${vv-o}") || (b=="${Y}-${xxxx}-${yyy}-${zzz}-${vv-o}")){
        console.log(b);
        b = b.replace("${Z}",'Z');
        console.log(b);
        b= b.replace("${Y}","Y");
        b =b.replace("${zzz}",cnv._data.eg);
        for(i=0;i<o.length;i++){console.log('dddddddd');
            console.log(o[i]._data.optionType._data.id);
                if(o[i]._data.optionType._data.id==26+'') {console.log('26 trouveee');b =b.replace("${xxxx}",o[i]._data.optionValue);}
                if(o[i]._data.optionType._data.id==19+'') b =b.replace("${yyy}",o[i]._data.optionValue);
                if(o[i]._data.optionType._data.id==26+'') b =b.replace("${xxxx}",o[i]._data.optionValue);
                if(o[i]._data.optionType._data.id==7+'') b =b.replace("${vv-o}",o[i]._data.optionValue+((m._data.climat._data.abbreviation==null)?'':'-'+m._data.climat._data.abbreviation));

    }
  
    }

 
    for(var t=0;t<o.length;t++){
       /* console.log(o[t]._data.optionValue+"remplace :"+o[t]._data.optionType._data.replace);*/
    
      b = b.replace("${"+o[t]._data.optionType._data.replace+"}",o[t]._data.optionValue);

    }

    return b
});