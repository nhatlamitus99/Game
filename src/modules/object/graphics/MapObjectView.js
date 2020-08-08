/**
 * Created by CPU12744-local on 8/8/2020.
 */
var MapObjectView = cc.Sprite.extend({
    _type: null,
    _id: null,
    ctor: function(attributes) {
        this._super();
        this.initWithFile("content/Art/Buildings/townhall/TOW_1_1/idle/image0000.png");
        this._type = attributes.type;
        this._id = attributes.id;
    },
    getType: function(){
        return this._type;
    },
    getID: function(){
        return this._id;
    }
});