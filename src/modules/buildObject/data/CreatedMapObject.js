

var CreatedMapObject = MapObject.extend(
    {
        level: 0,
        description: null,
        buildingCost: 0,
        buildingTime: 0,
        upgradingCost: 0,
        upgradingTime: 0,
        hp: 0,

        ctor: function() {

        },

        create: function() {

        },

        upgrade: function() {

        },

        move: function() {

        },

        getLevel: function(){
            return this.level;
        },

        getDescription: function(){
            return this.description;
        },

        getBuildingCost: function(){
            return this.buildingCost;
        },

        getBuildingTime: function(){
            return this.buildingTime;
        },

        getUpgradingCost: function(){
            return this.upgradingCost;
        },

        getUpgradingTime: function(){
            return this.upgradingTime;
        },

        getHp: function(){
            return this.hp;
        },

        setLevel: function(data){
            this.level = data;
        },

        setDescription: function(data){
            this.description = data;
        },

        setBuildingCost: function(data){
            this.buildingCost = data;
        },

        setBuildingTime: function(data){
            this.buildingTime = data;
        },

        setUpgradingCost: function(data){
            this.upgradingCost = data;
        },

        setUpgradingTime: function(data){
            this.upgradingTime = data;
        },

        setHp: function(data){
            this.hp = data;
        },

    }
)