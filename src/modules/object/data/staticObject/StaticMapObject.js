
var StaticMapObject = MapObject.extend(
    {
        value: 0,
        cost: 0,
        removedTime: 0,

        ctor: function(type, position) {
            this._super(type, position);
            this.loadInfo(type);
        },

        loadInfo: function(type) {
            // load information's object from excel file via type and level 
        },

        create: function() {

        },

        remove: function() {

        },

        getValue: function() {
            return this.value;
        },

        getCost: function() {
            return this.cost;
        },

        getRemovedTime: function() {
            return this.removedTime;
        },

        setValue: function(value) {
            this.value = value;
        },

        setCost: function(cost) {
            this.cost = cost;
        },

        setRemovedTime: function(time) {
            this.removedTime = time;
        }
    }
);



