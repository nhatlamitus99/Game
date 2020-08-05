/**
 * Created by CPU12744-local on 7/31/2020.
 */

var GameScreen = cc.Layer.extend({
    _map:null,

    ctor:function() {
        this._super();
        //loadSpriteFrame();
        this._map = new MapView();
        this.addChild(this._map);
    }
});