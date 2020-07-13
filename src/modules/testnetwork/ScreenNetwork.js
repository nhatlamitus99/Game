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
    Bullet: [],
    Enemies: [],
    myPlane: null,
    numberBullet: 6,
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

        cc.audioEngine.playEffect("res/Music/bgMusic.wav", true)

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
        

        

        Objs.myPlane = cc.Sprite.create("res/game/animation/character/plane/myPlane.png");
        Objs.myPlane.setAnchorPoint(cc.p(0.5,0.5));
        Objs.myPlane.setPosition(cc.p(size.width/2, size.height/10));
        this.addChild(Objs.myPlane, 1, 0);
        Objs.myPlane.runAction(cc.blink(4,12));
    
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

        for(var i=1;i<=6;i++){
            Objs.Enemies[i] = cc.Sprite.create("res/game/animation/character/enemy/enemy_"+i+".png");
            Objs.Enemies[i].setAnchorPoint(cc.p(0.5,0.5));
            Objs.Enemies[i].setPosition(cc.p(size.width - Math.random()*200, size.height - Math.random()*200));
            this.addChild(Objs.Enemies[i], i, i);
            Objs.Enemies[i].runAction(cc.Sequence(
                cc.MoveBy.create(0.5, Objs.Enemies[i].x > 0 ? -Math.random()*80: Math.random()*80, Objs.Enemies[i].y > 0 ? -Math.random()*80: Math.random()*80)            
                ).repeatForever())
        }


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
                
        for(var i=1;i<=Objs.numberBullet;i++){
            
            Objs.Bullet[i] = cc.Sprite.create("res/game/animation/bullet/bullet.png");
            Objs.Bullet[i].setAnchorPoint(cc.p(0.5,0.5));
            Objs.Bullet[i].setPosition(cc.p(Objs.myPlane.x-20, Objs.myPlane.y + i*150));
            this.addChild(Objs.Bullet[i], i, i+6);
            Objs.Bullet[i].runAction(cc.blink(3, 20).repeatForever());
            Objs.Bullet[i+Objs.numberBullet] = cc.Sprite.create("res/game/animation/bullet/bullet.png");
            Objs.Bullet[i+Objs.numberBullet].setAnchorPoint(cc.p(0.5,0.5));
            Objs.Bullet[i+Objs.numberBullet].setPosition(cc.p(Objs.myPlane.x+20, Objs.myPlane.y + i*150));
            this.addChild(Objs.Bullet[i+Objs.numberBullet], i, i+6+Objs.numberBullet);
            Objs.Bullet[i+Objs.numberBullet].runAction(cc.blink(3, 20).repeatForever());
        }

        if( 'touches' in cc.sys.capabilities )
            cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesEnded:function (touches, event) {
                    if (touches.length <= 0)
                        return;
                    event.getCurrentTarget().moveSprite(touches[0].getLocation());
                    event.getCurrentTarget().moveBullet(touches[0].getLocation(), this);
                }
            }), this);
        else if ('mouse' in cc.sys.capabilities )
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    event.getCurrentTarget().moveSprite(event.getLocation());
                    event.getCurrentTarget().moveBullet(event.getLocation(), this);
                }
            }, this);
             
       
        
    },

    moveSprite: function(pos){
        var sprite = this.getChildByTag(0);
        sprite.stopAllActions();
        sprite.runAction(cc.moveTo(0.6, pos));


    },

    moveBullet: function(pos, node){
        var bullets = [];
        for(var i=7;i<=Objs.numberBullet*2+6;i++){
            bullets[i-7] = this.getChildByTag(i);
            bullets[i-7].stopAllActions();
            if(i<Objs.numberBullet+7)
                bullets[i-7].runAction(cc.Spawn(cc.blink(3,20), cc.moveTo(0.6, pos.x-20, pos.y + (i-6)*150)));
            else
                bullets[i-7].runAction(cc.Spawn(cc.blink(3,20), cc.moveTo(0.6, pos.x+20, pos.y + (i-6)*150)));

        }
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
        cc.audioEngine.stopAllEffects();
        fr.view(ScreenMenu);
    }
    
    

});