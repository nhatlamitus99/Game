
var StaticMapObject = MapObject.extend(
    {
        value: 0,
        cost: 0,
        removedTime: 0,

        ctor: function() {
            this.getBeginTime()
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
        },
    }
)



