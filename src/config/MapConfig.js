var MapConfig = {
    MAP_SIZE: {
        h: 42,
        w: 42
    },

    MOVING_ACCELERATION: 0.03,
    MOVING_ACCELERATION_ALPHA: 2,  // minimum speed = movingAccleration*movingAcclerationApha+maxspeeds

    // using for scale screen in Client
    MAX_SCALE: 2.1,
    MIN_SCALE: 0.5,
    ZOOM_MAXDELTA: 20,

    // when a cell is not overided by building
    NULL_CELL: {type: -1, id: -1},
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
