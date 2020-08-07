var MapConfig = {
    MAP_SIZE: {
        h: 42,
        w: 42
    },

    // using for scale screen in Client
    MAX_SCALE: 2.1,
    MIN_SCALE: 0.5,
    ZOOM_MAXDELTA: 20,

    // when a cell is not overided by building
    NULL_CELL: [-1, -1],
    getNullCell: function (){
        var array = [];
        for (var i = 0; i < this.NULL_CELL.length; i++) {
            array[i] = this.NULL_CELL[i];
        }
        return array;
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
