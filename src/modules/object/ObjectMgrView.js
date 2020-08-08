var ObjectMgrView = cc.Class.extend({

    numTypeObject: 11,  // number of type of building objects
    listObject: [],  // list of building objects in current map

    ctor: function(){
        for(var i=0; i <= this.numTypeObject; ++i) {
            this.listObject[i] = [];
        }
        var listObject = ObjectMgrData.getInstance().getListObject();
        for (i = 0; i < listObject.length; ++i) {
            for (var j = 0; j < listObject[i].length; ++j) {
                var attributes = {
                    type: listObject[i][j].type,
                    id: listObject[i][j].id
                };
                this.createItemToList(attributes);
            }
        }
    },

    createItemToList: function(attributes) {
        var object = new MapObjectView(attributes);
        object.setAnchorPoint(0.5, 0.5);
        this.addObject(object);
    },

    addObject: function(object) {
        this.listObject[object.getType()].push(object);
    },

    removeObject: function(object) {
        this.listObject[object.getType()].splice(object.getId(), 1);
    },

    getListObject: function () {
        return this.listObject;
    }
});
