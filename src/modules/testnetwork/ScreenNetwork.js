/**
 * Created by GSN on 7/9/2015.
 */

var Direction =
{
    UP:1,
    DOWN:2,
    LEFT:3,
    RIGHT:4
};

var Objs = { 
    EnemiesDirection: [],
    Enemies: [],
    myPlane: null,
    soundInfo: null,
    gameScore: null,
    gameLive: null

}

var timePlayed = 0; //game time
var isAlive = false; //is the game is running

function movePlane(destination){ //move my plane to destination
}
function gameStart(){//game start, hide texts
}
function gameOver(){//game over, check score
}

var ScreenNetwork = cc.Layer.extend({
    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();
        isAlive = true;

        var backGround = cc.Sprite.create("res/game/animation/back_ground/backGround.png");
        backGround.setAnchorPoint(cc.p(0.5, 0.5));
        backGround.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(backGround, 0);
        backGround.runAction(cc.Sequence(
            cc.MoveBy.create(15, 0, -110),
            cc.MoveBy.create(0, 0, 110)
        ).repeatForever());

        

        var object_1 = cc.Sprite.create("res/game/animation/object_ground/object_1.png");
        object_1.setAnchorPoint(cc.p(0.5, 0.5));
        object_1.setPosition(cc.p(size.width, size.height+100));
        this.addChild(object_1, 1);
        var object_1_scale = cc.ScaleTo.create(0,0.5,0.5);
        object_1.runAction(object_1_scale);
        
        var object_2 = cc.Sprite.create("res/game/animation/object_ground/object_2.png");
        object_2.setAnchorPoint(cc.p(0.5, 0.5));
        object_2.setPosition(cc.p(size.width/5, size.height+100));
        this.addChild(object_2, 1);
        var object_2_scale = cc.ScaleTo.create(0,0.5,0.5);
        object_2.runAction(object_2_scale);
        

        var object_3 = cc.Sprite.create("res/game/animation/object_ground/object_3.png");
        object_3.setAnchorPoint(cc.p(0.5, 0.5));
        object_3.setPosition(cc.p(size.width/3, size.height+100));
        this.addChild(object_3, 1);
        
        var object_4 = cc.Sprite.create("res/game/animation/object_ground/object_4.png");
        object_4.setAnchorPoint(cc.p(0.5, 0.5));
        object_4.setPosition(cc.p(size.width/2, size.height+100));
        this.addChild(object_4, 1);
        var object_4_scale = cc.ScaleTo.create(0,0.5,0.5);
        object_4.runAction(object_4_scale);
        

        

        var myPlane = cc.Sprite.create("res/game/animation/character/plane/myPlane.png");
        myPlane.setAnchorPoint(cc.p(0.5,0.5));
        myPlane.setPosition(cc.p(size.width/2, size.height/10));
        this.addChild(myPlane, 1, 9);
        myPlane.runAction(cc.blink(4,12));
    
        var score = cc.LabelTTF.create("Score:", res.TitleFont, 22);
        score.setPosition(cc.p(size.width-100, size.height-35));
        this.addChild(score);

        Objs.gameScore = cc.LabelTTF.create("000", res.TitleFont, 20);
        Objs.gameScore.setPosition(cc.p(size.width-40, size.height-35));
        this.addChild(Objs.gameScore);

        var backButton = gv.commonButton(200, 64, size.width - 80, 30 );
        backButton.setColor(cc.color.BLUE);
        this.addChild(backButton);
        backButton.addClickEventListener(this.onSelectBack.bind(this));

        var backLabel = cc.LabelTTF.create("Main Menu", res.TitleFont, 28);
        backLabel.setPosition(cc.p(size.width-80, 30));
        backLabel.setColor(cc.color.BLUE);
        this.addChild(backLabel);

        var live = cc.Sprite.create("res/game/animation/character/plane/myPlane.png");
        live.setAnchorPoint(cc.p(0.5,0.5));
        live.setPosition(cc.p(50, size.height-40));
        this.addChild(live);
        var live_scale = cc.ScaleTo.create(0.5,0.5,0.5);
        live.runAction(live_scale);

        Objs.gameLive = cc.LabelTTF.create("4", res.TitleFont, 20);
        Objs.gameLive.setPosition(cc.p(80, size.height-30));
        Objs.gameLive.setColor(cc.color.RED);
        this.addChild(Objs.gameLive);

        object_3.runAction(cc.Sequence(
            cc.MoveTo.create(10, size.width/3, -100),
            cc.MoveTo.create(0, 2*size.width/3, size.height+100)
        ).repeatForever())
        object_2.runAction(cc.Sequence(
            cc.DelayTime.create(6),
            cc.MoveTo.create(10, size.width/5, -100),
            cc.MoveTo.create(0, size.width/5, size.height+100)
        ).repeatForever())
        object_1.runAction(cc.Sequence(
            cc.DelayTime.create(12),
            cc.MoveTo.create(10, size.width/3+50, -100),
            cc.MoveTo.create(0, size.width/3, size.height+100)
        ).repeatForever())       
        object_4.runAction(cc.Sequence(
            cc.DelayTime.create(15),
            cc.MoveTo.create(10, size.width/2, -100),
            cc.MoveTo.create(0, size.width/2, size.height+100),
            cc.DelayTime.create(12)
        ).repeatForever())
                
        

        if( 'touches' in cc.sys.capabilities )
            cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesEnded:function (touches, event) {
                    if (touches.length <= 0)
                        return;
                    event.getCurrentTarget().moveSprite(touches[0].getLocation());
                    
                }
            }), this);
        else if ('mouse' in cc.sys.capabilities )
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    event.getCurrentTarget().moveSprite(event.getLocation());
                    
                }
            }, this);
             
       
        
    },

    moveSprite: function(pos){
        var sprite = this.getChildByTag(9);
        sprite.stopAllActions();
        sprite.runAction(cc.moveTo(0.4, pos));
        
        // var bullet = cc.Sprite.create("res/game/animation/bullet/bullet.png");
        //             bullet.setAnchorPoint(cc.p(0.5, 0.5));
        //             bullet.setPosition(cc.p(event.getLocation()));
        //             this.addChild(bullet);
        // for(var i=0;i<7;i++){
        //     var bullet = cc.Sprite.create("res/game/animation/bullet/bullet.png");
        //     bullet.setAnchorPoint(cc.p(0.5, 0.5));
        //     bullet.setPosition(cc.p(pos));
        //     this.addChild(bullet);
        //     bullet.runAction(cc.Sequence(
        //         cc.MoveBy.create(0, 0, 50*(i+1)),
        //         cc.MoveTo.create(0, 0, -10)
        //     ))
        // }

    },
    
    
    update: function(dt){//update callback, run every frame
    },
    checkCollision: function(){
    },
    onTouchBegan: function(touch, event){//touchbegan callback
    },
    onTouchMoved: function(touch, event){//touchmoved callback
    },
    addTexts: function(){//add the texts to the screen
    },
    SoundClicked: function(){
    },
    addSquares: function(){//add the squares to the scene
    },
    generateDirection: function(){//generate a random direction
    },
    onSelectBack:function(sender)
    {
        fr.view(ScreenMenu);
    }
    
    

});