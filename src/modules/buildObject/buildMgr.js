
var BUILDING_TYPE = {
    GOLD_MINE: 1,
    ELIXIR_MINE: 2,
    DARK_ELIXIR_MINE: 3
}

var BuildMgr = cc.Class.extend({

    ctor: function(){
        this._super()

    }

})

BuildMgr.create = function(buildingType) {
    switch(buildingType) {
        case BUILDING_TYPE.GOLD_MINE:
            GoldMine.create();
        case BUILDING_TYPE.ELIXIR_MINE:
            ElixirMine.create();
        case BUILDING_TYPE.DARK_ELIXIR_MINE:
            DarkElixirMine.create();
    }
};