/**
 * Created by CPU12744-local on 8/9/2020.
 */
var Substructure = cc.Sprite.extend({
    _type: null,
    _id: null,
    _normalSubs: null,
    _greenSubs: null,
    _redSubs: null,
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
            var subs = cc.Sprite(res.object_mgr.normal_substructures.subs[indexSubsPath]);
            var shadow = cc.Sprite(res.object_mgr.normal_substructures.shadow[indexSubsPath]);
            this._normalSubs.addChild(subs, 0);
            this._normalSubs.addChild(shadow, 1);
    }
        // create red green subs
        this._greenSubs = new cc.Sprite(res.object_mgr.red_substructures[indexSubsPath]);
        this._redSubs = new cc.Sprite(res.object_mgr.green_substructures[indexSubsPath]);

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
    setGreenMode: function () {
        this._greenSubs.setVisible(true);
        this._redSubs.setVisible(false);
        this._normalSubs.setVisible(false);
    },
    setRedMode: function () {
        this._greenSubs.setVisible(false);
        this._redSubs.setVisible(true);
        this._normalSubs.setVisible(false);
    },
    setNormalMode: function() {
        this._greenSubs.setVisible(false);
        this._redSubs.setVisible(false);
        this._normalSubs.setVisible(true);
    }
});