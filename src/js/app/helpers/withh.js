Ember.Handlebars.registerBoundHelper("withh", function(a, b, c, d, e) {
    a = a.get('content').toArray();
    for (var f = 0; f < a.length; f++) {
        var h = a[f]._data.optionType._data.replace,
            g = a[f]._data.optionValue,
            n = "";
        if ("L4" == h && null != g && null != g.length) {
            for (var k = 0; k < 4 - g.length; k++) n += "0";
            g = n + g
        }
        "P" == h && (console.log("voila" + a[f]._data.option._data.value), b = b.replace("${P}", a[f]._data.option._data.value));
        b = b.replace("${" + h + "}", g); - 1 < b.indexOf("B") && ("Basse" == a[f]._data.option._data.label || "Haute" == a[f]._data.option._data.label) && (b = b.replace("B",
            "Haute" == a[f]._data.option._data.label ? 2 : 1))
    }
    b = b.replace("${EG4}", c._data.eg);
    a = "RAL" == c._data.ralUnderConveyor ? e._data.deal._data.ralUnderConveyor : c._data.ralUnderConveyor;
    b = b.replace("${RALU}", "RAL" == c._data.ralUnderConveyor ? e._data.deal._data.ral : c._data.ral);
    b = b.replace("${RAL}", a);
    
    d = d.toArray();
    if ("${Z}-${xxxx}-${yyy}-${zzz}-${vv-o}" == b || "${Y}-${xxxx}-${yyy}-${zzz}-${vv-o}" == b)
        for (console.log(b), b = b.replace("${Z}", "Z"), console.log(b), b = b.replace("${Y}", "Y"), b = b.replace("${zzz}", c._data.eg<1000?'0'+c._data.eg:c._data.eg), i =
            0; i < d.length; i++){ console.log("dddddddd"); console.log(d[i]._data.optionType._data.id); "26" == d[i]._data.optionType._data.id && (console.log("26 trouveee"), b = b.replace("${xxxx}", d[i]._data.optionValue<1000?'0'+d[i]._data.optionValue:d[i]._data.optionValue)); "19" == d[i]._data.optionType._data.id && (b = b.replace("${yyy}", d[i]._data.optionValue)); "26" == d[i]._data.optionType._data.id && (b = b.replace("${xxxx}",  d[i]._data.optionValue<1000?'0'+d[i]._data.optionValue:d[i]._data.optionValue));
            if( "7" == d[i]._data.optionType._data.id) {
                var rempl ="";
            console.log("climat abbbbbre");
            console.log(e._data.climat);
            if(e._data.climat._data.abbreviation==null) {
            var vit = parseInt(d[i]._data.optionValue);
            console.log("viteeeesse "+vit);
            if(vit>15) rempl=55;
                else {
                    if (vit>0) rempl=15;
                    else rempl="-";
                }
            }
            else rempl= e._data.climat._data.abbreviation;
            console.log('remplacement : '+rempl+'    '+b);

            b= b.replace("${vv-o}",rempl);
        }}
            
    for (c = 0; c < d.length; c++) {
if( "7" == d[c]._data.optionType._data.id) {
                var rempl ="";
            console.log("climat abbbbbre11");
            console.log(e._data.climat);
            if(e._data.climat._data.abbreviation==null) {
            var vit = parseInt(d[c]._data.optionValue);
            console.log("viteeeesse "+vit);
            if(vit>15) rempl=55;
                else {
                    if (vit>0) rempl=15;
                    else rempl="-";
                }
            }
            else rempl= e._data.climat._data.abbreviation;
            console.log('remplacement : '+rempl+'    '+b);

            b= b.replace("${V}",rempl);
        }
        b = b.replace("${" + d[c]._data.optionType._data.replace + "}", d[c]._data.optionValue);}
    return b
});