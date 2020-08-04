var MapConfig = {
    MAP_SIZE: {
        h: 40,
        w: 40
    },

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
