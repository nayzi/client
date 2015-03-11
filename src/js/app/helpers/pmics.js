Ember.Handlebars.registerBoundHelper("pmics", function(a,co,eg,clim,a1,a2,a3,a4,inc) {

    var PP=0;
    var PR=0;
    var VV=0;
    var EG=eg;
    var climat =clim;
  /*  console.log("pp");*/
    var cc=co.toArray();
    /*console.log(co.toArray());*/
        for(var v=0;v<cc.length;v++){
            if(cc[v]._data.optionType.id==7) VV=cc[v]._data.optionValue;
            if(cc[v]._data.optionType.id==26) PP=cc[v]._data.optionValue;
            if(cc[v]._data.optionType.id==19){  PR=cc[v]._data.option._data.value;console.log("PR :"+PR+"   et "+cc[v]._data.option._data.value)};

        }

    function lg(a){
        
        for(var x=0;a._data.options.length;x++){
        
        
            if(a._data.options[x]._data.optionType._data.replace=="L4") return a._data.options[x]._data.optionValue;
        }
    }
    function nb(PO){
    return PO._data.nbPieces;
    }

    var o = a.toArray();
    var b =[];
   
    for(var i=0;i<o.length;i++){
        if(o[i]._data.orderPiece._data.piece._data.erpRef=="S147020${Memb}-${L4}"){b.push({l: lg(o[i]._data.orderPiece), n: nb(o[i]), id:o[i].id})}
    }
    var fin = [];
    var l=[];
    var ind=[];

    for(var t=0;t<b.length;t++){
        if(!l.contains(b[t].l)){
            l.push(b[t].l);
            fin.push({l:b[t].l,n:b[t].n});
            ind.push(b[t].id);
                }
        else {
            if(!ind.contains(b[t].id)) {
                ind.push(b[t].id);
                for(var ff=0;ff<fin.length;ff++){ if(fin[ff].l==b[t].l) fin[ff].n+=b[t].n;}
                    }
             }



    }


var L_RCD_total=0;
var Q_Y_T=0;
var Q_Z_T=0;
for(var e=0;e<fin.length;e++){
    L_RCD=fin[e].l*fin[e].n/2;
    L_RCD_total+=L_RCD;
    Q_Y=(PP==0)?0:Math.floor(L_RCD/PP);

    Z=(fin[e].l<1500)?1:2;
    console.log("l :"+fin[e].l+"Z :"+Z+"n :"+fin[e].n+" math :"+Math.floor(Z*fin[e].n/2)+"  avant :"+Math.floor(L_RCD/PP));
    Q_Y-=Math.floor(Z*fin[e].n/2);
    if(Q_Y<0) Q_Y=0;
    if(L_RCD<PP) {Q_Y_T=0; Q_Z_T=0;}
    else if(L_RCD>=PP){Q_Y_T+=Q_Y;Q_Z_T+=Math.floor(Z*fin[e].n/2)}
        }

//pieces manquants
if((L_RCD_total-(Q_Y_T+Q_Z_T)*PP)!=0){console.log("kifach")}
    
    if (PP.length<4) PP="0"+PP;
    if (PR.length<3) PR="0"+PR;
    if ((EG+"").length<4) EG="0"+EG;
    clim=(clim==null)?((VV>15)?55:(VV>0)?15:""):((VV>15)?"55-":(VV>0)?"15-":"")+clim;
    var YYY="";
    var ZZZ="";
    if(Q_Z_T>0){YYY="<tr>"+
    "<td>I"+a1+""+a2+""+a3+""+a4+"</td>"+
    "<td>"+(o.length*10+10)+"</td>"+
    "<td>"+"Z-"+PP+"-"+PR+"-"+EG+"-"+clim+"</td>"+
    "<td>"+Q_Z_T+"</td>"+
    "</tr>";
    }
    var iii=0;
    if(Q_Y_T>0){if(Q_Z_T>0) iii=10;
    ZZZ="<tr>"+
   "<td>I"+a1+""+a2+""+a3+""+a4+"</td>"+
    "<td>"+(o.length*10+10+iii)+"</td>"+ 
    "<td>"+"Y-"+PP+"-"+PR+"-"+EG+"-"+clim+"</td>"+
    "<td>"+Q_Y_T+"</td>"+
    "</tr>";}
return new Handlebars.SafeString(ZZZ+YYY
    );

});