

var Barrack = CreatedMapObject.extend({
    sizeBarrack: 0,
    trainingQueue: [],
    creatableItems: [],

    ctor: function(type, position) {
        this._super(type, position);
        this.loadInfo(this.type, this.level);
    },

    loadInfo: function(type, level) {
        // load technical info's object from excel file via type object and level 
    },

})

Barrack.onFinish = function(){

}

Barrack.create = function() {

}