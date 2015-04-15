App.PopInDealsController = Ember.Controller.extend(Ember.Validations.Mixin.Validator, {
    actions: {
        successfulSaving: function() {
          
        },
        failSaving: function() {}
    },
    needs: ["deals"],
    jojo:'ko',
    submitForm: function() {
        return Ember.RSVP.Promise.resolve()
    },

    
});