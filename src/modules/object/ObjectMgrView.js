var ObjectMgrView = cc.Class.extend({
    numTypeObject: 27,  // number of type of building objects
    listObject: [],  // list of building objects in current map
    listSubs: [], // list of substructures of building in current map

    ctor: function(){
        for(var i=0; i <= this.numTypeObject; ++i) {
            this.listObject[i] = [];
            this.listSubs[i] = [];
        }
        var listObject = ObjectMgrData.getInstance().getListObject();

        for (i = 0; i < listObject.length; ++i) {
            if(listObject[i].length == 0)
                continue;
            for (var j = 0; j < listObject[i].length; ++j) {
               
                var attributes = {
                    type: listObject[i][j].type,
                    id: listObject[i][j].id,
                    size: listObject[i][j].size,
                    level: listObject[i][j].level,
                    position: listObject[i][j].position
                };
                //this.createItemListObject(attributes);
                //this.createItemListSubs(attributes);
                if(attributes.type != 13)
                    this.buildObject(attributes);
                else
                    this.initObject(attributes);


            }
        }
    },

    buildObject: function(attributes) {
        this.createItemListObject(attributes);
        var object = new Substructure(attributes);
        object.createGround(attributes);
        object.createProgressBar(attributes);
        object.setAnchorPoint(0.5, 0.5);
        this.addSubs(object);

    },

    initObject: function(attributes) {
        this.createItemListObject(attributes);
        var object = new Substructure(attributes);
        object.setAnchorPoint(0.5, 0.5);
        this.addSubs(object);
    },

    createItemListObject: function(attributes) {
        var object = new MapObjectView();
        object.initObject(attributes);
        object.setAnchorPoint(0.5, 0.5);
        this.addObject(object);
    },


    addObject: function(object) {
        this.listObject[object.getType()].push(object);
    },

    addSubs: function(subs) {
        this.listSubs[subs.getType()].push(subs);
    },

    removeObject: function(object) {
        this.listObject[object.getType()].splice(object.getId(), 1);
    },

    getListObject: function () {
        return this.listObject;
    },
    getListSubs: function() {
        return this.listSubs;
    },
    setGreenState: function(type, id) {
        this.listSubs[type][id].setGreenState();
    },
    setNormalState: function(type, id) {
        this.listSubs[type][id].setNormalState();
    },
    getObjectFromTypeID: function(type, id) {
        return this.listObject[type][id];
    },
    getSubsFromTypeID: function(type, id) {
        return this.listSubs[type][id];
    }
});
