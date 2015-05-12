App.HeaderDealUpdateView = App.AbstractViews.HeaderView.extend({
    templateName: "headerDealCreate",
    fullscreenButton: JQ.ButtonView.extend({
        label: "Plein \u00e9cran (F11)",
        icons: {
            primary: "ui-icon-newwin"
        },
        text: !1,
        click: function() {
            document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() :
                document.webkitExitFullscreen && document.webkitExitFullscreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.msRequestFullscreen ? document.documentElement.msRequestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
    }),
    addConveyorButton: JQ.ButtonView.extend({
        label: "Ajouter un convoyeur",
        icons: {
            primary: "ui-icon-plusthick"
        },
        text: !1,
        click: function() {
            this.get("controller").send("addConveyor")
        }
    }),
    saveButton: JQ.ButtonView.extend({
        label: "Modifier",
        icons: {
            primary: "ui-icon-disk"
        },
        text: !1,
        click: function() {
            this.get("controller").send("submitForm")
        }
    })
});