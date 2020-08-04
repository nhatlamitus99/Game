

var GoldMine = HarvestObject.extend(
    {
        ctor: function() {
            this._super()

        }

    }
)

// Override
goldMine.create = function(mainLayer) {
    var size = cc.director.getVisibleSize();
    var mine = cc.Sprite.create(this.getImage());
    mine.setPosition(cc.p(size.width/2, size.height/2));
    mainLayer.addChild(mine);
}

// Override
goldMine.collect({

})

// Override
goldMine.upgrade({

})

// Override
goldMine.updateValue({

})