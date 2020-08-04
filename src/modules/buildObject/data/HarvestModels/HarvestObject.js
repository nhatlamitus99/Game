

var HarvestObject = CreatedMapObject.extend(
    {
        valueBeforeUpgrade: 0,
        imagePath: null,
        capacity: 0,
        productivity: 0,

        ctor: function() {

        },

        create: function() {

        },

        collect: function() {

        },

        upgrade: function(level) {

        },

        updateValue: function(resource) {

        },

        animate: function() {

        },

        getValueBeforeUpgrade: function() {
            return this.valueBeforeUpgrade;
        },

        getImage: function() {
            return this.imagePath;
        },

        getCapacity: function() {
            return this.capacity;
        },

        getProductivity: function(data) {
            this.productivity = data;
        },

        setValueBeforeUpgrade: function(data) {
           this.valueBeforeUpgrade = data;
        },

        setImage: function(data) {
            this.imagePath = data;
        },

        setCapacity: function(data) {
            this.capacity = data;
        },

        setProductivity: function(data) {
            this.productivity = data;
        }


    }
)