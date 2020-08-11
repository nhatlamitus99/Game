var TroopAnimationManager = cc.Class.extend({
    idle_animations:[],
    run_animations:[],

    ctor:function(){
        this.addAnimations();
    },
    addAnimations:function() {
        // idle
        for (var i = 0; i < TROOP_ANIMATION.IDLE.length; i++) {
            cc.animationCache.addAnimations(TROOP_ANIMATION.IDLE[i]);

            // idle
            var list_idle = [];
            list_idle[1] = cc.animationCache.getAnimation("idle_1");
            list_idle[1].retain();
            list_idle[2] = cc.animationCache.getAnimation("idle_7");
            list_idle[2].retain();
            list_idle[3] = cc.animationCache.getAnimation("idle_6");
            list_idle[3].retain();
            list_idle[4] = cc.animationCache.getAnimation("idle_5");
            list_idle[4].retain();
            list_idle[5] = cc.animationCache.getAnimation("idle_5");
            list_idle[5].retain();
            list_idle[6] = cc.animationCache.getAnimation("idle_6");
            list_idle[6].retain();
            list_idle[7] = cc.animationCache.getAnimation("idle_7");
            list_idle[7].retain();
            list_idle[8] = cc.animationCache.getAnimation("idle_8");
            list_idle[8].retain();
            this.idle_animations.push(list_idle);

            // run
            var list_run = [];
            list_run[1] = cc.animationCache.getAnimation("run_1");
            list_run[1].retain();
            list_run[2] = cc.animationCache.getAnimation("run_7");
            list_run[2].retain();
            list_run[3] = cc.animationCache.getAnimation("run_6");
            list_run[3].retain();
            list_run[4] = cc.animationCache.getAnimation("run_5");
            list_run[4].retain();
            list_run[5] = cc.animationCache.getAnimation("run_5");
            list_run[5].retain();
            list_run[6] = cc.animationCache.getAnimation("run_6");
            list_run[6].retain();
            list_run[7] = cc.animationCache.getAnimation("run_7");
            list_run[7].retain();
            list_run[8] = cc.animationCache.getAnimation("run_8");
            list_run[8].retain();
            this.run_animations.push(list_run);
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