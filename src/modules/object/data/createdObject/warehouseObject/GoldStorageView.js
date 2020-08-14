

var GoldStorageView = cc.Sprite.extend({

    ctor: function(level, value, capacity, view) {
        this._super();

        // 0->25: goldRate = 0   // 26->50: goldRate = 1    // 51->75: goldRate = 2      // 76->100: goldRate = 3
        var goldRate = Math.floor((100 * value) / (25 * (capacity + 1)));

        view.initWithFile("content/Art/Buildings/gold storage/STO_1_" + level + "/idle/image000"+ goldRate +".png");
        this.x = view.width / 2;
        this.y = view.height / 2;

        view.addChild(this);



    }

});





