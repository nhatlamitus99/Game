

var WarehouseObject = CreatedMapObject.extend({

    capacity: 0,
    value: 0,

    ctor: function(){
        this._super();
    },

    getCapacity: function() {
        return this.capacity;
    },

    getValue: function() {
        return this.value;
    },

    setCapacity: function(capacity) {
        this.capacity = capacity;
    },

    setValue: function(value) {
        this.value = value;
    }
})