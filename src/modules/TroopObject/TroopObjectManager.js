var TroopManager = cc.Class.extend({
    ctor:function(){
        this._super();
    }

});


// chia lính về trại mỗi khi load màn hình
TroopManager.loadCampArmy = function(){

};

// tìm trại lính thích hợp cho lính mới train xong
TroopManager.findCamp = function(new_troop){

};

// add troop to list
TroopManager.addTroop = function(troop){

};

// tìm đường đi của lính về trại lính
TroopManager.findPath = function(){

};

// find troopMiniObj in list by id
TroopManager.getIndexById = function(list, id){
    for(var i = 0; i < list.length; i++){
        if(list[i].id === id){
            return i;
        }
    }

    return -1;
}

