/**
 * Created by CPU12744-local on 8/9/2020.
 */
var Substructure = cc.Sprite.extend({
    _type: null,
    _id: null,
    _normalSubs: null,
    _greenSubs: null,
    _redSubs: null,
    _ground: null,
    ctor: function(attributes) {
        this._super();
        this._type = attributes.type;
        this._id = attributes.id;
        // create subs
        var sizeSubs = attributes.size.h;
        var indexSubsPath = sizeSubs - 1;
        // normal Subs
        this._normalSubs = new cc.Node();


        if (sizeSubs > 1) {

            if(attributes.type <= 13) {
                var subs = cc.Sprite(res.object_mgr.normal_substructures.subs[indexSubsPath]);
                this._normalSubs.addChild(subs, 0);
                var shadow = cc.Sprite(res.object_mgr.normal_substructures.shadow[indexSubsPath]);
                this._normalSubs.addChild(shadow, 1);
            }
            else{
                var subs = cc.Sprite(res.object_mgr.normal_obstacle.subs[indexSubsPath]);
                this._normalSubs.addChild(subs, 0);
            }
        }
        // create red green subs
        this._greenSubs = new cc.Sprite(res.object_mgr.green_substructures[indexSubsPath]);
        this._redSubs = new cc.Sprite(res.object_mgr.red_substructures[indexSubsPath]);

        if(attributes.type <= 13 && attributes.type != 11) {
            var path = "content/Art/Map/map_obj_bg/upgrading.png";
            this._ground = new cc.Sprite(path);
            var scale = 4;
            var cellX = MapConfig.getCellSize().w / scale;
            var cellY = MapConfig.getCellSize().h / scale;

            var distance = Math.sqrt(cellX*cellX + cellY*cellY) * attributes.size.w/2;

            this._ground.y -= Math.floor(distance) - 8;
            this.addChild(this._ground, 5);
        }

        this.addChild(this._normalSubs);
        this.addChild(this._greenSubs, 0);
        this.addChild(this._redSubs, 0);
        this._normalSubs.setVisible(true);
        this._greenSubs.setVisible(false);
        this._redSubs.setVisible(false);


    },
    getType: function(){
        return this._type;
    },
    getID: function(){
        return this._id;
    },
    setGreenState: function () {
        this._greenSubs.setVisible(true);
        this._redSubs.setVisible(false);
        this._normalSubs.setVisible(false);
    },
    setRedState: function () {
        this._greenSubs.setVisible(false);
        this._redSubs.setVisible(true);
        this._normalSubs.setVisible(false);
    },
    setNormalState: function() {
        this._greenSubs.setVisible(false);
        this._redSubs.setVisible(false);
        this._normalSubs.setVisible(true);

    },
    isInMovingState: function() {
        return !this._normalSubs.isVisible();
    }
});