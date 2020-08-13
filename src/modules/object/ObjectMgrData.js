var ObjectMgrData = cc.Class.extend({
    numTypeObject: 27,  // number of type of building objects
    listObject: [],  // list of building objects in current map

    ctor: function(){
        for(var i=0; i <= this.numTypeObject; ++i) {
            this.listObject[i] = [];
        }
    },

    createItemToList: function(attributes) {
        
        var object = null;
        switch(attributes.type) {
            case OBJECT_MGR_CONFIG.buildingType.AMC_1:
                object = new ArmyCamp();
                break;
            case OBJECT_MGR_CONFIG.buildingType.BAR_1:
                object = new Barrack();
                break;
            case OBJECT_MGR_CONFIG.buildingType.BDH_1:
                object = new BuilderHut();
                break;
            case OBJECT_MGR_CONFIG.buildingType.CLC_1:
                object = new ClanCastle();
                break;
            case OBJECT_MGR_CONFIG.buildingType.RES_1:
                object = new GoldMine();
                break;
            case OBJECT_MGR_CONFIG.buildingType.RES_2:
                object = new ElixirMine();
                break;
            case OBJECT_MGR_CONFIG.buildingType.STO_1:
                object = new GoldStorage();
                break;
            case OBJECT_MGR_CONFIG.buildingType.STO_2:
                object = new ElixirStorage();
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_1:
                object = new Canon();
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_2:
                object = new AnchorTown();
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_3:
                object = new Trebuchet();
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_5:
                object = new AAGun();
                break;
            case OBJECT_MGR_CONFIG.buildingType.TOW_1:
                object = new TownHall();
                break;
            default :
                object = new StaticMapObject();
        }

        // object.setAttributes(attributes);
        object.size = attributes.size;
        object.level = attributes.level;
        object.position = attributes.position;
        object.type = attributes.type;

        this.addObject(object);

        //cc.log("show logic object   " + attributes.type, attributes.size.h, attributes.size.w, attributes.level, attributes.position.i, attributes.position.j);
    },

    addObject: function(object) {
        if(this.listObject[object.type] == undefined)
            this.listObject[object.type] = [];
        this.listObject[object.type].push(object);

        object.setId(this.listObject[object.type].length - 1);

        //cc.log("test:"+this.listObject[object.type].length)

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
