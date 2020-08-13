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
                new ArmyCampView(attributes.level, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.BAR_1:
                new BarrackView(attributes.level, this);
                break;
            case OBJECT_MGR_CONFIG.buildingType.BDH_1:
                this.initWithFile("content/Art/Buildings/builder hut/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.CLC_1:
                this.initWithFile("content/Art/Buildings/clan_castle/CLC_1_0/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.RES_1:
                this.initWithFile("content/Art/Buildings/gold mine/RES_1_1/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.RES_2:
                this.initWithFile("content/Art/Buildings/elixir collector/RES_2_1/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.STO_1:
                this.initWithFile("content/Art/Buildings/gold storage/STO_1_1/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.STO_2:
                this.initWithFile("content/Art/Buildings/elixir storage/STO_2_1/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_1:
                this.initWithFile("content/Art/Buildings/army camp/AMC_1_1/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_2:
                this.initWithFile("content/Art/Buildings/army camp/AMC_1_1/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_3:
                this.initWithFile("content/Art/Buildings/army camp/AMC_1_1/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.DEF_5:
                this.initWithFile("content/Art/Buildings/army camp/AMC_1_1/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.TOW_1:
                this.initWithFile("content/Art/Buildings/townhall/TOW_1_1/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_1:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_1/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_2:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_2/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_3:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_3/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_4:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_4/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_5:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_5/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_6:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_6/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_7:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_7/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_8:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_8/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_9:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_9/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_10:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_10/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_11:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_11/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_12:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_12/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_13:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_13/idle/image0000.png");
                break;
            case OBJECT_MGR_CONFIG.buildingType.OBS_14:
                this.initWithFile("content/Art/Buildings/obstacle/OBS_14/idle/image0000.png");
                break;
            default :
                this.initWithFile("content/Art/Buildings/obstacle/OBS_1/idle/image0000.png");
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