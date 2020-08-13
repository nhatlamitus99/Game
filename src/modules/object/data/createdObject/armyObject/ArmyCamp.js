

var ArmyCamp = CreatedMapObject.extend({
    capacity: 0,
    value: 0,
    code: "AMC_1",

    ctor: function(type, position) {
        this._super(type, position);
    },

    loadInfo: function(type, level) {
        // load technical info's object from excel file via type object and level 
    },

    getCapacity: function() {
        return this.capacity;
    },

    setCapacity: function(capacity) {
        this.capacity = capacity;
    },

    getValue: function() {
        return this.value;
    },

    setValue: function(value) {
        this.value = value;
    }

})