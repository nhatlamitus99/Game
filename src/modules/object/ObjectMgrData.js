var ObjectMgrData = cc.Class.extend({
    numTypeObject: 11,  // number of type of building objects
    listObject: [],  // list of building objects in current map

    ctor: function(){
        for(var i=0; i <= this.numTypeObject; ++i) {
            this.listObject[i] = [];
        }
    },

    createItemToList: function(attributes) {
        var object = null;
        switch(attributes.type) {
            case OBJECT_MGR_CONFIG.buildingType.goldMine:
                object = new GoldMine();
                break;
            case OBJECT_MGR_CONFIG.buildingType.elixirMine:
                object = new ElixirMine();
                break;
            case OBJECT_MGR_CONFIG.buildingType.mapObject:
                object = new MapObject(attributes.type, attributes.position);
                break;
            default:
                break;
        }
        // object.setAttributes(attributes);
        object.size = attributes.size;
        this.addObject(object);
    },

    addObject: function(object) {
        object.setId(this.listObject[object.getType()].length);
        this.listObject[object.getType()].push(object);
    },

    removeObject: function(object) {
        this.listObject[object.getType()].splice(object.getId(), 1);
    },

    getListObject: function () {
        return this.listObject;
    },

    getNextIdOfType: function (type) {
        return this.listObject[type].length;
    },

    getObject: function (type, id) {
        return this.listObject[type][id];
    },

    getRegionOfObject: function(type, id) {
        var object = this.getObject(type, id);
        return {
            i: object.position.i,
            j: object.position.j,
            h: object.size.h,
            w: object.size.w
        }
    },
    setPosOfObject: function(typeID, newRegion) {
        var object = this.getObject(typeID.type, typeID.id);
        object.position.i = newRegion.i;
        object.position.j = newRegion.j;
    },
    sendMessage: function (message) {
    }
});

var OBJECT_MGR_DATA_ONLY_ONE = null;
ObjectMgrData.getInstance = function () {
    if (OBJECT_MGR_DATA_ONLY_ONE === null) {
        OBJECT_MGR_DATA_ONLY_ONE = new ObjectMgrData();
    }
    return OBJECT_MGR_DATA_ONLY_ONE;
};
