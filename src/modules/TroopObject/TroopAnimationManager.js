var TroopAnimationManager = cc.Class.extend({
    idle_animations:[],

    ctor:function(){
        this.addAnimations();
    },
    addAnimations:function(){
        // idle
        for(var i = 0; i < TROOP_ANIMATION.IDLE.length; i++){
            cc.animationCache.addAnimations(TROOP_ANIMATION.IDLE[i]);
            var list = [];
            list[1] = cc.animationCache.getAnimation("idle_1"); list[1].retain();
            list[2] = cc.animationCache.getAnimation("idle_7"); list[2].retain();
            list[3] = cc.animationCache.getAnimation("idle_6"); list[3].retain();
            list[4] = cc.animationCache.getAnimation("idle_5"); list[4].retain();
            list[5] = cc.animationCache.getAnimation("idle_5"); list[5].retain();
            list[6] = cc.animationCache.getAnimation("idle_6"); list[6].retain();
            list[7] = cc.animationCache.getAnimation("idle_7"); list[7].retain();
            list[8] = cc.animationCache.getAnimation("idle_8"); list[8].retain();
            this.idle_animations.push(list);
        }
    }
});

var TROOP_ANIMATION_ONLY_ONE = null;

TroopAnimationManager.getInstance = function(){
    if(TROOP_ANIMATION_ONLY_ONE == null){
        TROOP_ANIMATION_ONLY_ONE = new TroopAnimationManager();
    }

    return TROOP_ANIMATION_ONLY_ONE;
};