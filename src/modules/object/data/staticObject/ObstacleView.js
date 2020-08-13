

var ObstacleView = cc.Sprite.extend({
    _numOfCreatedObject: 13,

    ctor: function(type, pos, view) {
        this._super();
        type = type - this._numOfCreatedObject;
        view.initWithFile("content/Art/Buildings/obstacle/OBS_"+ type +"/idle/image0000.png");
    }

});