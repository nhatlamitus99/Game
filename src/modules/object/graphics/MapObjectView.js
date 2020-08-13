/**
 * Created by CPU12744-local on 8/8/2020.
 */
var MapObjectView = cc.Sprite.extend({
    _type: null,
    _id: null,
    ctor: function(attributes) {
        this._super();
        switch(attributes.type) {
            case OBJECT_MGR_CONFIG.buildingType.AMC_1:
                new ArmyCampView(4, attributes.position, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.BAR_1:
                new BarrackView(attributes.level, attributes.position, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.BDH_1:
                //new BuilderHutView(attributes.level, attributes.position, this);
                new BarrackView(5, attributes.position, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.CLC_1:
                //new ClanCastleView(attributes.level, attributes.position, this);
                new ElixirMineView(attributes.level, attributes.position, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.RES_1:
                new GoldMineView(attributes.level, attributes.position, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.RES_2:
                new ElixirMineView(attributes.level, attributes.position, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.STO_1:
                new GoldStorageView(attributes.level, attributes.position, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.STO_2:
                new ElixirStorageView(attributes.level, attributes.position, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_1:
                new CanonView(attributes.level, attributes.position, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_2:
                new AnchorTownView(attributes.level, attributes.position, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_3:
                new TrebuchetView(attributes.level, attributes.position, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_5:
                new AAGunView(attributes.level, attributes.position, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.TOW_1:
                new TownHallView(attributes.level, attributes.position, this);
                break;
            default:
                new ObstacleView(attributes.type, attributes.position, this);
        }

        this._type = attributes.type;
        this._id = attributes.id;
        this.scale = OBJECT_MGR_CONFIG.SCALE_BUILDING;
    },
    getType: function(){
        return this._type;
    },
    getID: function(){
        return this._id;
    }
});