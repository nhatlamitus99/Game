

var DefenseObject = CreatedMapObject.extend({
    minRange: 0,
    maxRange: 0,
    attackSpeed: 0,
    attackRadius: 0,
    attackArea: 0,
    attackType: 0,

    ctor: function(type, position) {
        this._super(type, position);
        this.loadInfo(type, level);
    },

    loadInfo: function(type, level) {
        // load technical info's object from excel file via type object and level 
    }
})


