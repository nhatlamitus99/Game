/**
 * Created by CPU12744-local on 8/8/2020.
 */
var MapObjectView = cc.Sprite.extend({
    _type: null,
    _id: null,
    ctor: function(attributes) {
        this._super();
        switch (attributes.size.h) {
            case 4:
                this.initWithFile("content/Art/Buildings/townhall/TOW_1_1/idle/image0000.png");
                break;
            case 3:
                this.initWithFile("content/Art/Buildings/dark elixir storage/STO_3_1/idle/image0003.png");
                break;
            case 2:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_1/idle/image0000.png");
                break;
            case 1:
                this.initWithFile("content/Art/Buildings/wall/WAL_1_1/WAL_1_1/run/image0000.png");
                break;
        }
        this._type = attributes.type;
        this._id = attributes.id;
        this.scale = OBJECT_MGR_CONFIG.SCALE_BUILDING;
    },
    getType: function(){
        return this._type;
    },
    getID: function(){
        return this._id;
    }
});