/**
 * Created by CPU12744-local on 8/8/2020.
 */

var MapObjectView = cc.Sprite.extend({
    _type: null,
    _id: null,
    _level: null,

    ctor: function() {
        this._super();
    },
    getType: function(){
        return this._type;
    },
    getID: function(){
        return this._id;
    },
    initObject: function(attributes) {
        switch(attributes.type) {
            case OBJECT_MGR_CONFIG.buildingType.AMC_1:
                new ArmyCampView(attributes.level, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.BAR_1:
                new BarrackView(attributes.level, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.BDH_1:
                new BuilderHutView(attributes.level, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.CLC_1:
                new ClanCastleView(attributes.level, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.RES_1:
                new GoldMineView(attributes.level, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.RES_2:
                new ElixirMineView(attributes.level, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.STO_1:
                new GoldStorageView(attributes.level, 0, 0, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.STO_2:
                new ElixirStorageView(attributes.level, 0, 0, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_1:
                new CanonView(attributes.level, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_2:
                new AnchorTownView(attributes.level, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_3:
                new TrebuchetView(attributes.level, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_5:
                new AAGunView(attributes.level, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.TOW_1:
                new TownHallView(attributes.level, this);
                break;
            default:
                new ObstacleView(attributes.type, this);
        }

        this._type = attributes.type;
        this._id = attributes.id;
        this._level = attributes.level;
        this.scale = OBJECT_MGR_CONFIG.SCALE_BUILDING;
    },



});