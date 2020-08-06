
var BUILDING_TYPE = {
    GOLD_MINE: 1,
    ELIXIR_MINE: 2,
}

var ObjectMgr = cc.Class.extend({

    numTypeObject: 11,  // number of type of building objects
    listObject: [],  // list of building objects in current map

    ctor: function(){
        for(var i=0; i <= this.numTypeObject; ++i) {
            this.listObject[i] = [];
        }

    },

    create: function(type) {
        switch(type) {
            case BUILDING_TYPE.GOLD_MINE:
                GoldMine.create();
            case BUILDING_TYPE.ELIXIR_MINE:
                ElixirMine.create();
        }
    },

    addObject: function(object) {
        object.setId(this.listObject[object.getType()].length);
        this.listObject[object.getType()].push(object);
    },

    removeObject: function(object) {
        for(var i=0; i < this.listObject.length; ++i) {
            if(i === object.getType()) {
                this.listObject[i].splice(object.getId(), 1);
            }
                
        }
    },

    getListObject: function () {
        return this.listObject;
    },

    getObject: function (type, id) {
        return this.listObject[type][id];
    },

    sendMessage: function (message) {

    }
});

var OBJECT_MGR_ONLY_ONE = null;
ObjectMgr.getInstance = function () {
    if (OBJECT_MGR_ONLY_ONE === null) {
        OBJECT_MGR_ONLY_ONE = new ObjectMgr();
    }
    return OBJECT_MGR_ONLY_ONE;
};
