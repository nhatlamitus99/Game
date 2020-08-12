var MapConfig = {
    MAP_SIZE: {
        h: 42,
        w: 42
    },

    MOVING_ACCELERATION: 0.02,
    MOVING_ACCELERATION_ALPHA: 5,  // minimum speed = movingAccleration*movingAcclerationApha+maxspeeds

    // using for scale screen in Client
    MAX_SCALE: 2.1,
    MIN_SCALE: 0.5,
    ZOOM_MAX_DELTA: 20,

    // using for calculate zOrder of object in map
    MAX_Z_ORDER_OBJECT: 200,    // minZOrder of cell is 200 - 42*2*2 = 32
    MAX_Z_ORDER_TROOP: 300,

    // zOrder of substructure
    Z_ORDER_SUBSTRUCTURE: 10,
    Z_ORDER_MOVING_SUBS: 11,

    Z_ORDER_ARROW: 200,

    MIN_TOUCH_MOVE_DELTA: 3,
    MAX_COUNTING_FRAMES: 1000000000,
    COUNT_NO_MOVING: 10,

    // when a cell is not overided by building
    NULL_CELL: {type: "null_item", id: -1},
    getNullCell: function (){
        return {
            type: this.NULL_CELL.type,
            id: this.NULL_CELL.id
        };
    },

    CELL_SIZE: null,
    getCellSize: function() {
        if (this.CELL_SIZE == null) {
                var cell = cc.Sprite(res.map.img_cell);
                this.CELL_SIZE = {
                    h: cell.height/2,   // because gird.png has 2 cells
                    w: cell.width
                };
            }
        return this.CELL_SIZE;
    }
};
