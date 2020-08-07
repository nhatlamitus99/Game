

var ElixirStorage = WarehouseObject.extend({

    ctor: function(type, position) {
        this._super(type, position);
        this.loadInfo(type, level);
    }
})