var MapConfig = {
    MAP_SIZE: {
        h: 40,
        w: 40
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
    }
};
