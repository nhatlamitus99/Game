/**
 * Created by CPU12744-local on 8/9/2020.
 */
var Substructure = cc.Sprite.extend({
    _type: null,
    _id: null,
    _subs: null, // substructure
    _shadow: null, // shadow of building
    ctor: function(attributes) {
        this._super();
        this._type = attributes.type;
        this._id = attributes.id;
        this._subs = cc.Sprite("content/Art/Map/map_obj_bg/BG_0/4.png");
        this._shadow = cc.Sprite("content/Art/Map/map_obj_bg/GRASS_4_Shadow.png");
        this._subs.setAnchorPoint(0.5, 0.5);
        this._shadow.setAnchorPoint(0.5, 0.5);
        this.addChild(this._subs, 0);
        this.addChild(this._shadow, 1);
    },
    getType: function(){
        return this._type;
    },
    getID: function(){
        return this._id;
    }
});