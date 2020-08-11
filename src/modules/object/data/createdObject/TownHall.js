

var TownHall = CreatedMapObject.extend({

    ctor: function(type, position) {
        this._super(type, position);
        this.loadInfo(this.type, this.level);
    }


})