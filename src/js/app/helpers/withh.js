Ember.Handlebars.registerBoundHelper("withh", function(a, b) {
    for (var c = a.toArray(), d = 0; d < c.length; d++) {
        var e = c[d]._data.optionType._data.replace,
            f = c[d]._data.optionValue,
            h = "";
        if ("L4" == e && null != f && null != f.length) {
            for (var g = 0; g < 4 - f.length; g++) h += "0";
            f = h + f
        }
        console.log("variable : " + f + " remplace :" + e);
        console.log("var :" + c[d]._data.option._data.value + " remplace :" + c[d]._data.option._data.label);
        b = b.replace("${" + e + "}", f);
        if ((b.indexOf("B") > -1) && ((c[d]._data.option._data.label == "Basse") || (c[d]._data.option._data.label == "Haute"))) {
            var z = (c[d]._data.option._data.label == "Haute") ? 1 : 0;
            b = b.replace("B", z);
        }

    }
    return b
});
