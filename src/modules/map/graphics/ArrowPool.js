/**
 * Created by CPU12744-local on 8/12/2020.
 */
var ArrowPool = cc.Class.extend({
    _pool: [],
    ctor: function() {
    },
    getArrow: function() {
        var arrow = null;
        if (this._pool.length == 0) {
            arrow = new ArrowMove();
            var mapView = MapView.getInstance();
            mapView._map.addChild(arrow, MapConfig.Z_ORDER_ARROW);
        }
        else {
            arrow = this._pool.pop();
        }
        arrow.setVisible(true);
        return arrow;
    },
    sendToPool: function(arrow) {
        //arrow.setVisible(false);
        arrow.setSizeArrow(0);
        this._pool.push(arrow);
    }
});

var ARROW_POOL_ONLY_ONE = null;
ArrowPool.getInstance = function() {
    if (ARROW_POOL_ONLY_ONE == null)
        ARROW_POOL_ONLY_ONE = new ArrowPool;
    return ARROW_POOL_ONLY_ONE;
};