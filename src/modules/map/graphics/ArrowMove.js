/**
 * Created by CPU12744-local on 8/10/2020.
 */
var ArrowMove = cc.Node.extend({
    ctor: function() {
        this._super();
        this._arrowSprites = [];
        // init arrow Sprites
        for (var i = 0; i < res.map.arrow_move.length; ++i) {
            this._arrowSprites[i] = cc.Sprite(res.map.arrow_move[i]);
            this._arrowSprites[i].setVisible(false);
            this._arrowSprites[i].setScale(0.5);
            this.addChild(this._arrowSprites[i]);
        }
    },
    setSizeArrow: function(size) {
        for (var i = 0; i < res.map.arrow_move.length; ++i) {
            if (i+1 != size) {
                this._arrowSprites[i].setVisible(false);
            }
            else {

                this._arrowSprites[i].setVisible(true);
            }
        }

        this.currentSize = size;
    }
});