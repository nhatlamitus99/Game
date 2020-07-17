/**
 * Created by GSN on 7/9/2015.
 */

var Objs = { 
    EnemiesDirection: [],
    Bullet: [],
    Enemies: [],
    Bullet_Enemies: [],
    myPlane: null,
    numberBullet: 6,
    soundInfo: null,
    gameScore: null,
    gameLive: null

}



var timePlayed = 0; //game time
var isAlive = false; //is the game is running
var gameOver;
var score = 0;
var live = 4;

var PADDLE_STATE_GRABBED = 0;
var PADDLE_STATE_UNGRABBED = 1;
var HIGH_PLAYER = 0;
var LOW_PLAYER = 1;
var STATUS_BAR_HEIGHT = 20.0;
var SPRITE_TAG = 0;







function movePlane(destination){ //move my plane to destination
}
function gameStart(){//game start, hide texts
}
function gameOver(){//game over, check score
}

var ScreenNetwork = cc.Layer.extend({
    _ball:null,
    _paddles:[],
    _ballStartingVelocity:null,
    _winSize:null,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();
        isAlive = true;
        gameLive = 4;
        gameScore= 0;
        

        cc.audioEngine.playEffect("res/Music/bgMusic.wav", true)

        cc.log(size.width+" sizeScreen "+size.height)
       

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

        Objs.gameLive = cc.LabelTTF.create("1", res.TitleFont, 20);
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
                
        


        

       

        this.scheduleUpdate();
        
            
       
        
        this._ballStartingVelocity = cc.p(20.0, -100.0);
        this._winSize = cc.director.getWinSize();


      

        this.schedule(this.generateEnemies, 4);
        
        this._balls = [];
        this.schedule(this.generateBullet, 0.3);
        this.schedule(this.generateBullet_, 0.3);

        this._ballEnemies = [];
        this.schedule(this.generateBulletEnemy, 0.5);

        

        var paddleTexture = cc.textureCache.addImage("res/game/animation/character/plane/plane_shoot.png");

        this._paddles = [];

        Objs.myPlane = Paddle.paddleWithTexture(paddleTexture);
        Objs.myPlane.x = this._winSize.width / 2;
        Objs.myPlane.y = this._winSize.width / 12;
        Objs.myPlane.runAction(cc.blink(3,10));
        this._paddles.push(Objs.myPlane);

        
        
        

        

        for (var i = 0; i < this._paddles.length; i++) {
            if (!this._paddles[i])
                break;

            this.addChild(this._paddles[i]);
        }

        this.schedule(this.doStep);
        this.schedule(this.level);
        this.schedule(this.speed);




        return true;
       
        
    },
    
    level: function(delta){
        for(var t =0;t<this._ballEnemies.length;t++){
            this._ballEnemies[t].moveReverse(score/20+3);
        }
    },

    speed: function(delta){
        for(var t =0;t<this._balls.length;t++){
            this._balls[t].move(score/20+4);
        }
    },


    generateBullet: function(delta){
        var ball = Ball.ballWithTexture(cc.textureCache.addImage("res/game/animation/bullet/bullet.png"));
        ball.x = Objs.myPlane.x-25;
        ball.y = Objs.myPlane.y;
        ball.setVelocity(this._ballStartingVelocity);   
        this._balls.push(ball);
        this.addChild(ball); 
    },

    generateBullet_: function(delta){
        var ball = Ball.ballWithTexture(cc.textureCache.addImage("res/game/animation/bullet/bullet.png"));
        ball.x = Objs.myPlane.x+25;
        ball.y = Objs.myPlane.y;
        ball.setVelocity(this._ballStartingVelocity);   
        this._balls.push(ball);
        this.addChild(ball); 
    },

    generateBulletEnemy: function(delta){
        var ball = Ball.ballWithTexture(cc.textureCache.addImage("res/game/animation/bullet/bullet_enemy.png"));
        var tmp = Math.floor(Math.random()*100) % 6;
        

        try {
            ball.x = Objs.Enemies[tmp].x;
            ball.y = Objs.Enemies[tmp].y;
            ball.setVelocity(this._ballStartingVelocity);   
            this._ballEnemies.push(ball);
            this.addChild(ball); 
        }
        catch (e) {
            cc.log("ERROR " + tmp);
        }

        var ball_ = Ball.ballWithTexture(cc.textureCache.addImage("res/game/animation/bullet/bullet_enemy.png"));
        var tmp = Math.floor(Math.random()*100) % 6;
        
        try {
            ball_.x = Objs.Enemies[tmp].x;
            ball_.y = Objs.Enemies[tmp].y;
            ball_.setVelocity(this._ballStartingVelocity);   
            this._ballEnemies.push(ball_);
            this.addChild(ball_);
        }
        catch (e) {
            cc.log("ERROR " + tmp);
        }
    },

    generateEnemies: function(delta){
        var size = cc.director.getVisibleSize();
        for(var i=0;i<6;i++){
            var enemy = cc.Sprite.create("res/game/animation/character/enemy/enemy_"+i+".png");
            enemy.setAnchorPoint(cc.p(0.5,0.5));
            if(i%2==0)
                enemy.setPosition(cc.p(size.width/2 + Math.random()*200 + 100, size.height + 10));
            else
                enemy.setPosition(cc.p(size.width/2 - Math.random()*200 - 200, size.height + 10));
            this.addChild(enemy, i, i);
            Objs.Enemies.push(enemy);
            if(i%2==0)
                enemy.runAction(cc.Sequence(
                    cc.MoveBy.create(0.5, -Math.random()*30,-Math.random()*80)            
                    ).repeatForever())
            else
                enemy.runAction(cc.Sequence(
                    cc.MoveBy.create(0.5, Math.random()*30, -Math.random()*80)            
                    ).repeatForever())
          
        }

        
    },

    doStep:function (delta) {
        

        for (var i = 0; i < this._paddles.length; i++) {
            if (!this._paddles[i])
                break;

            for(var j=0;j<this._balls;j++){
                this._balls[j].draw();

            }
            
        }

        for(var j=0;j<this._ballEnemies.length;j++){
                this._ballEnemies[j].draw();
        }
            

        
    },

    
    checkDamage: function() {
        for(var i=1;i<Objs.numberBullet;i++){
            for(var j=1;j<Objs.Enemies.length;j++){
                if(Objs.Enemies[j].x <= Objs.Bullet[i].x + 50 && Objs.Enemies[j].x >= Objs.Bullet[i].x - 50 && Objs.Enemies[j].x <= Objs.Bullet[i].y + 50 && Objs.Enemies[j].x >= Objs.Bullet[i].y + 50 ){
                    // Objs.Enemies[j].runAction(cc.MoveTo.create(0, -100, -100))
                    cc.log("yes")
                }
            }
        }
    },
    
    update: function(){

        //var score = cc.sys.localStorage.getItem("point")
        //var live = cc.sys.localStorage.getItem("live")
        //cc.log("haha:"+live)
        Objs.gameScore.setString(score)
        Objs.gameLive.setString(live)

        var size = cc.director.getVisibleSize()

        for(var i=0; i < this._balls.length; i++) {
            for(var j=0; j < Objs.Enemies.length; j++) {
                if(((Objs.Enemies[j].x <= this._balls[i].x + 40) && (Objs.Enemies[j].x >= this._balls[i].x - 40))) {                   
                    if(((Objs.Enemies[j].y <= this._balls[i].y + 40) && (Objs.Enemies[j].y >= this._balls[i].y - 40))) {
                        var explode = cc.Sprite.create("res/game/animation/explosion/exp.png")
                        explode.setAnchorPoint(cc.p(0.5,0.5));
                        explode.setPosition(cc.p(Objs.Enemies[j].x, Objs.Enemies[j].y));
                        this.addChild(explode);
                        explode.runAction(cc.Sequence(
                            cc.ScaleTo.create(0.5, 1.5, 1.5),
                            cc.MoveTo.create(0, -100, -100)))
                        score=score+1;
                        Objs.Enemies[j].runAction(cc.Sequence(
                            cc.MoveTo.create(0, size.width+50, size.height+50),
                            cc.MoveBy.create(0.5, Objs.Enemies[j].x > 0 ? -Math.random()*50: Math.random()*50, Objs.Enemies[j].y > 0 ? -Math.random()*80: Math.random()*80)            
                            .repeatForever()
                            
                       )
                    )   
                    }
                }

                
            }
        }

        for(var k=1; k<this._ballEnemies.length;k++){
            if(Objs.myPlane.x >= this._ballEnemies[k].x-50 && Objs.myPlane.x<=this._ballEnemies[k].x+50){
                if(Objs.myPlane.y >= this._ballEnemies[k].y-50 && Objs.myPlane.y<=this._ballEnemies[k].y+50){
                    live = live - 1;
                    if(live==0){
                        gameOver = cc.Sprite.create("res/game/animation/game_over/gameOver.png");
                        gameOver.setAnchorPoint(cc.p(0.5,0.5));
                        gameOver.setPosition(cc.p(size.width/2, size.height/2));
                        this.addChild(gameOver); 
                        die = cc.Sprite.create("res/game/animation/explosion/explosion.png");
                        die.setAnchorPoint(cc.p(0.5,0.5));
                        die.setPosition(cc.p(Objs.myPlane.x, Objs.myPlane.y));
                        this.addChild(die); 
                        die.runAction(cc.Sequence(
                            cc.ScaleTo.create(3, 3.5, 3.5),
                            cc.MoveTo.create(0, -200, -200),
                            cc.DelayTime.create(2)))
                
                        cc.audioEngine.stopAllEffects();
                        var yourScore = cc.LabelTTF.create("Your Score:", res.TitleFont, 40);
                        yourScore.setPosition(cc.p(size.width/2-50, size.height/2-150));
                        yourScore.setColor(cc.color.BLUE);
                        this.addChild(yourScore);

                        var yourGameScore = cc.LabelTTF.create("000", res.TitleFont, 36);
                        yourGameScore.setPosition(cc.p(size.width/2+90, size.height/2-150));
                        yourGameScore.setColor(cc.color.BLUE);
                        this.addChild(yourGameScore);
                        yourGameScore.setString(score);

                        var backButton = gv.commonButton(200, 64, size.width/2, size.height/2-250);
                        this.addChild(backButton);
                        backButton.addClickEventListener(this.onSelectPlayAgain.bind(this));

                        var playAgain = cc.Sprite.create("res/game/animation/game_over/playAgain.png");
                        playAgain.setAnchorPoint(cc.p(0.5,0.5));
                        playAgain.setPosition(cc.p(size.width/2, size.height/2-250));
                        this.addChild(playAgain); 

                    }
                    else{
                        Objs.myPlane.runAction(cc.Sequence(
                            cc.MoveTo.create(0, size.width/2, size.height/12)
                        ))
                        again = cc.Sprite.create("res/game/animation/explosion/explode.png");
                        again.setAnchorPoint(cc.p(0.5,0.5));
                        again.setPosition(cc.p(Objs.myPlane.x, Objs.myPlane.y));
                        this.addChild(again);
                        again.runAction(cc.Sequence(
                            cc.ScaleTo.create(1.5, 2.5, 2.5),
                            cc.MoveTo.create(0, -100, -100),
                            cc.DelayTime.create(2)))

                        
                    }
                }
            }
        }

            for(var k=1; k<Objs.Enemies.length;k++){
                if(Objs.myPlane.x>=Objs.Enemies[k].x-50 && Objs.myPlane.x<=Objs.Enemies[k].x+50){
                    if(Objs.myPlane.y>=Objs.Enemies[k].y-50 && Objs.myPlane.y<=Objs.Enemies[k].y+50){

                        live=live-1;
                        if(live==0){
                            gameOver = cc.Sprite.create("res/game/animation/game_over/gameOver.png");
                            gameOver.setAnchorPoint(cc.p(0.5,0.5));
                            gameOver.setPosition(cc.p(size.width/2, size.height/2));
                            this.addChild(gameOver); 
                            die = cc.Sprite.create("res/game/animation/explosion/explosion.png");
                            die.setAnchorPoint(cc.p(0.5,0.5));
                            die.setPosition(cc.p(Objs.myPlane.x, Objs.myPlane.y));
                            this.addChild(die); 
                            die.runAction(cc.Sequence(
                                cc.ScaleTo.create(1, 3.5, 3.5),
                                cc.MoveTo.create(0, -200, -200),
                                cc.DelayTime.create(2)))
                    
                            cc.audioEngine.stopAllEffects();
                            var yourScore = cc.LabelTTF.create("Your Score:", res.TitleFont, 40);
                            yourScore.setPosition(cc.p(size.width/2-50, size.height/2-150));
                            yourScore.setColor(cc.color.BLUE);
                            this.addChild(yourScore);

                            var yourGameScore = cc.LabelTTF.create("000", res.TitleFont, 36);
                            yourGameScore.setPosition(cc.p(size.width/2+90, size.height/2-150));
                            yourGameScore.setColor(cc.color.BLUE);
                            this.addChild(yourGameScore);
                            yourGameScore.setString(score);

                            var backButton = gv.commonButton(200, 64, size.width/2, size.height/2-250);
                            this.addChild(backButton);
                            backButton.addClickEventListener(this.onSelectPlayAgain.bind(this));

                            var playAgain = cc.Sprite.create("res/game/animation/game_over/playAgain.png");
                            playAgain.setAnchorPoint(cc.p(0.5,0.5));
                            playAgain.setPosition(cc.p(size.width/2, size.height/2-250));
                            this.addChild(playAgain); 
                        }
                        else{
                            Objs.myPlane.runAction(cc.Sequence(
                                cc.MoveTo.create(0, size.width/2, size.height/12)
                            ))
                            again = cc.Sprite.create("res/game/animation/explosion/explode.png");
                            again.setAnchorPoint(cc.p(0.5,0.5));
                            again.setPosition(cc.p(Objs.myPlane.x, Objs.myPlane.y));
                            this.addChild(again);
                            again.runAction(cc.Sequence(
                                cc.ScaleTo.create(2, 2.5, 2.5),
                                cc.MoveTo.create(0, -100, -100),
                                cc.DelayTime.create(2)))

                            
                        }

                    }
                }
            }
            
    
          
        
    },


    checkCollision: function(){
         
    },
    

    onSelectBack:function()
    {
        score=0;
        live=4;
        Objs.Enemies.length=0;
        cc.audioEngine.stopAllEffects();
        fr.view(ScreenMenu);
    },

    onSelectPlayAgain:function()
    {
        score=0;
        live=4;
        Objs.Enemies.length=0;
        cc.audioEngine.stopAllEffects();
        fr.view(ScreenNetwork);
    },

    explosion:function(x, y)
    {
        var ani  = fr.createAnimationById(resAniId.explosion,this);
        this.addChild(ani);
        ani.setPosition(cc.p(x,y));
        ani.getAnimation().gotoAndPlay("run",cc.random()*5,-1,1);
        ani.setCompleteListener(this.onFinishEffect.bind(this));
        
    },

    testLoadAnimation:function()
    {
        var testCount = 100;
        var start = Date.now();

        for(var i = 0; i< testCount; i++)
        {
            var ani  = fr.createAnimationById(resAniId.firework_test,this);
            this.addChild(ani);
            ani.setPosition(cc.random()*cc.winSize.width, cc.random()*cc.winSize.height);
            ani.getAnimation().gotoAndPlay("run",cc.random()*5,-1,1);
            ani.setCompleteListener(this.onFinishEffect.bind(this));
        }
        var end = Date.now();
        cc.log("time: " + (end - start));
        this.lblLog.setString("time: " + (end - start));
    },
    
    

});