
var SIZE_MAP = 40;

var MapObject = cc.Class.extend(
    {

        name: null,
        type: null,
        id: null,
        position: null,
        size: null,
        state: false,
        imagePath: null,
        beginTime: null,


        ctor: function() {
            this._super()
        },

        onCreate: function() {

        },

        isSelected: function() {

        },

        stopAction: function() {

        },

        executeImmediately: function() {

        },

        sendMessage: function() {

        },

        getName: function() {
            return this.name;
        },

        getType: function() {
            return this.type;
        },

        getId: function() {
            return this.id;
        },

        getPositionX: function() {
            return this.position.x;
        },

        getPositionY: function() {
            return this.position.y;
        },

        getSize: function() {
            return this.size;
        },

        getState: function() {
            return this.state;
        },

        getImage: function() {
            return this.imagePath;
        },

        getBeginTime: function() {
            return this.beginTime;
        },

        setImage: function(imagePath) {
            this.imagePath = imagePath;
        },

        setName: function(name) {
            this.name = name;
        },

        setType: function(type) {
            this.type = type;
        },

        setId: function(id) {
            this.id = id;
        },

        setPosition: function(x, y) {
            this.position.x = x;
            this.position.y = y;
        },

        setSize: function(size) {
            this.size = size;
        },

        setState: function(state) {
            this.state = state;
        },

        setBeginTime: function(beginTime) {
            this.beginTime = beginTime;
        }

    }
)

