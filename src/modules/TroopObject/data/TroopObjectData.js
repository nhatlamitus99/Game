var MIN_X = 0;
var MAX_X = 0;
var MIN_Y = 0;
var MAX_Y = 0;

var TroopObjectData = cc.Class.extend({
    /*  attributes  */
    active:true, // sống hay chết
    type:1,      // loại lính
    id:1,        // id lính để tiện cho đánh nhau
    campId:1,    // đứng ở trại lính nào
    xLocation:0, // x
    yLocation:0, // y
    state:1,     // trạng thái

    // chiến đấu
    attackType:1,           // loại hình tấn công: tầm xa, tầm gần,...
    attackArea:null,        // hit range
    housingSpace:1,         // chiếm chỗ trại lính
    trainingTime:1,         // thời gian luyện lính
    moveSpeed:0,            // tốc độ di chuyển
    attackSpeed:0,          // tốc độ đánh
    barrackLevelRequired:1, // cấp nhà lính yêu cầu để tạo lính
    attackRange:null,       // khoảng cách tấn công
    favoriteTarget:null,    // mục tiêu tấn công
    maxHP:100,              // max hp
    currentHP: 100,         // hp hiện tại
    level:1,                // cấp lính

    /* methods */
    moveTo: function(x, y){
        if(x>=MIN_X && x<=MAX_X && y>=MIN_Y && y<=MAX_Y){
            this.xLocation = x;
            this.yLocation = y;
        }
    },
    findShortestPath: function(camp){

    }
});