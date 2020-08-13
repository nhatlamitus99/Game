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
                    size: {
                        w: listObject[i][j].size.w,
                        h: listObject[i][j].size.h
                    },
                    level: listObject[i][j].level,
                    position: {
                        i: listObject[i][j].position.i,
                        j: listObject[i][j].position.j
                    }
                };
                this.createItemListObject(attributes);
                this.createItemListSubs(attributes);

            }
        }
    },

    createItemListObject: function(attributes) {
        var object = new MapObjectView(attributes);
        object.setAnchorPoint(0.5, 0.5);
        object.setPosition(cc.p(attributes.position.i, attributes.position.j));
        cc.log("position idle: ", attributes.type, attributes.position.i, attributes.position.j)
        this.addObject(object);
    },

    createItemListSubs: function(attributes) {
        var object = new Substructure(attributes);
        object.setAnchorPoint(0.5, 0.5);
        this.addSubs(object);
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
