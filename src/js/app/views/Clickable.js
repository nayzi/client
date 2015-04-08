App.ClickableView = JQ.ButtonView.extend({
    label: "Telecharger (CSV)",
        icons: {
            primary: "ui-icon-extlink"
        },
  click: function(evt) {
    
    var table=$('#dvData');
    var filename='export.csv';
    var rows = table.find('tr:has(td)');
    console.log(rows);

            // Temporary delimiter characters unlikely to be typed by keyboard
            // This is to avoid accidentally splitting the actual contents
            tmpColDelim = String.fromCharCode(11), // vertical tab character
            tmpRowDelim = String.fromCharCode(0), // null character

            // actual delimiter characters for CSV format
            colDelim = '";"',
            rowDelim = '"\r\n"',

            // Grab text from table into CSV formatted string
            csv = '"' + rows.map(function (i, row) {
                var row = $(row),
                    cols = row.find('td');

                return cols.map(function (j, col) {
                    var col = $(col),
                        text = col.text();
                        text.replace('"', '""');
                        var b ="8.8";
                        text.replace('.',',');
                        console.log('teeeeeeeext :'+text+'apres '+text.replace('.',','));
                        

                    return text; // escape double quotes

                }).get().join(tmpColDelim);

            }).get().join(tmpRowDelim)
                .split(tmpRowDelim).join(rowDelim)
                .split(tmpColDelim).join(colDelim) + '"',
             console.log('vvvvvvvlllllll'+csv);
            // Data URI
            csvData = 'data:application/csv,' + 

             encodeURIComponent('\"Code Article Pere\";\"Num Ligne Nom\";\"Code Article Composant\";\"Quantite Composant\"\n'+csv);
            
           csvData = csvData.replace('.',',');
console.log("telechargement   :");
console.log(csvData);
console.log(this.get('context.deal.dealName')+'   '+this.get('context.otp'));
        var link = document.createElement('a');
    link.download = 'affaire/'+this.get('context.deal.dealName')+'::otp/'+this.get('context.otp')+'.csv';
    link.href = csvData;
    link.click();
    }
  
});