var ObjectMgrData = cc.Class.extend({
    numTypeObject: 27,  // number of type of building objects
    listObject: new Array(),  // list of building objects in current map

    ctor: function(){
        for(var i=0; i <= this.numTypeObject; ++i) {
            this.listObject[i] = new Array();
        }
    },

    createItemToList: function(attributes) {
        cc.log(attributes.type)
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
            case OBJECT_MGR_CONFIG.buildingType.OBS_1:
                object = new StaticMapObject();
                break;
            case OBJECT_MGR_CONFIG.buildingType.TOW_1:
                object = new TownHall();
                break;
        }

        cc.log("test object: "+object)
        // object.setAttributes(attributes);
        object.size = attributes.size;
        object.level = attributes.level;
        object.position = attributes.position;

        cc.log("object: "+object.level)
        this.addObject(object);
    },

    addObject: function(object) {
        if(this.listObject[object.type] == undefined)
            this.listObject[object.type] = new Array();
        this.listObject[object.type].push(object);
        cc.log("position: "+this.listObject[object.type][0].position.i)

        object.setId(this.listObject[object.type].length - 1);
        cc.log("id: "+this.listObject[object.type][0].id)

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
