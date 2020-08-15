/**
 * Created by CPU12744-local on 8/8/2020.
 */
var OBJECT_MGR_CONFIG = OBJECT_MGR_CONFIG || {};

OBJECT_MGR_CONFIG.buildingType = {
    AMC_1: 1,
    BAR_1: 2,
    DEF_1: 3,
    DEF_2: 4,
    DEF_3: 5,
    DEF_5: 6,
    RES_1: 7,
    RES_2: 8,
    STO_1: 9,
    STO_2: 10,
    BDH_1: 11,
    CLC_1: 12,
    TOW_1: 13,
    OBS_1: 14,
    OBS_2: 15,
    OBS_3: 16,
    OBS_4: 17,
    OBS_5: 18,
    OBS_6: 19,
    OBS_7: 20,
    OBS_8: 21,
    OBS_9: 22,
    OBS_10: 23,
    OBS_11: 24,
    OBS_12: 25,
    OBS_13: 26,
    OBS_14: 27
};
// Map ObjectCodeID -> Name
OBJECT_MGR_CONFIG.getNameByID = new Map();
OBJECT_MGR_CONFIG.getNameByID["AMC_1"] = "Army camps";

OBJECT_MGR_CONFIG.getNameByID["BAR_1"] = "Barrack";
OBJECT_MGR_CONFIG.getNameByID["BAR_2"] = "X-Men house";

OBJECT_MGR_CONFIG.getNameByID["DEF_1"] = "Canon";
OBJECT_MGR_CONFIG.getNameByID["DEF_2"] = "Archer tower";
OBJECT_MGR_CONFIG.getNameByID["DEF_3"] = "Trebuchet";
OBJECT_MGR_CONFIG.getNameByID["DEF_4"] = "Wizard tower";
OBJECT_MGR_CONFIG.getNameByID["DEF_5"] = "A.A gun";
OBJECT_MGR_CONFIG.getNameByID["DEF_7"] = "Bow machine";
OBJECT_MGR_CONFIG.getNameByID["DEF_8"] = "Lightning tower";
OBJECT_MGR_CONFIG.getNameByID["DEF_9"] = "Laser tower";
OBJECT_MGR_CONFIG.getNameByID["DEF_12"] = "Dragon cannon";

OBJECT_MGR_CONFIG.getNameByID["RES_1"] = "Gold mine";
OBJECT_MGR_CONFIG.getNameByID["RES_2"] = "Elixir mine";

OBJECT_MGR_CONFIG.getNameByID["STO_1"] = "Gold storage";
OBJECT_MGR_CONFIG.getNameByID["STO_2"] = "Elixir storage";

OBJECT_MGR_CONFIG.getNameByID["BDH_1"] = "Builder hut";

OBJECT_MGR_CONFIG.getNameByID["CLC_1"] = "Clan castle";
OBJECT_MGR_CONFIG.getNameByID["TOW_1"] = "Townhall";

OBJECT_MGR_CONFIG.getNameByID["WAL_1"] = "Wall";

OBJECT_MGR_CONFIG.getNameByID["LAB_1"] = "Laboratory";


// Map ObjectCodeID -> list detailed info
OBJECT_MGR_CONFIG.detailedInfo = new Map();
OBJECT_MGR_CONFIG.detailedInfo["AMC_1"] = ["capacity", "hitpoints"];

OBJECT_MGR_CONFIG.detailedInfo["BAR_1"] = ["hitpoints"];
OBJECT_MGR_CONFIG.detailedInfo["BAR_2"] = ["hitpoints"];

OBJECT_MGR_CONFIG.detailedInfo["DEF_1"] = ["damagePerShot", "hitpoints"];
OBJECT_MGR_CONFIG.detailedInfo["DEF_2"] = ["damagePerShot", "hitpoints"];
OBJECT_MGR_CONFIG.detailedInfo["DEF_3"] = ["damagePerShot", "hitpoints"];
OBJECT_MGR_CONFIG.detailedInfo["DEF_4"] = ["damagePerShot", "hitpoints"];
OBJECT_MGR_CONFIG.detailedInfo["DEF_5"] = ["damagePerShot", "hitpoints"];
OBJECT_MGR_CONFIG.detailedInfo["DEF_7"] = ["damagePerShot", "hitpoints"];
OBJECT_MGR_CONFIG.detailedInfo["DEF_8"] = ["damagePerShot", "hitpoints"];
OBJECT_MGR_CONFIG.detailedInfo["DEF_9"] = ["damagePerShot", "hitpoints"];
OBJECT_MGR_CONFIG.detailedInfo["DEF_12"] = ["damagePerShot", "hitpoints"];

OBJECT_MGR_CONFIG.detailedInfo["RES_1"] = ["capacity", "productivity", "hitpoints"];
OBJECT_MGR_CONFIG.detailedInfo["RES_2"] = ["capacity", "productivity", "hitpoints"];

OBJECT_MGR_CONFIG.detailedInfo["STO_1"] = ["capacity", "hitpoints"];
OBJECT_MGR_CONFIG.detailedInfo["STO_2"] = ["capacity", "hitpoints"];

OBJECT_MGR_CONFIG.detailedInfo["BDH_1"] = ["hitpoints"];

OBJECT_MGR_CONFIG.detailedInfo["CLC_1"] = ["capacity", "hitpoints"];
OBJECT_MGR_CONFIG.detailedInfo["TOW_1"] = ["capacityGold", "capacityElixir", "hitpoints"];

OBJECT_MGR_CONFIG.detailedInfo["WAL_1"] = ["hitpoints"];

OBJECT_MGR_CONFIG.detailedInfo["LAB_1"] = "Laboratory";



OBJECT_MGR_CONFIG.getCodeByType = {
    1: "AMC_1",
    2: "BAR_1",
    3: "DEF_1",
    4: "DEF_2",
    5: "DEF_3",
    6: "DEF_5",
    7: "RES_1",
    8: "RES_2",
    9: "STO_1",
    10: "STO_2",
    11: "BDH_1",
    12: "CLC_1",
    13: "TOW_1"
};

OBJECT_MGR_CONFIG.SCALE_BUILDING = 0.5;

OBJECT_MGR_CONFIG.CLAN_CASTLE_ACTIVATE_LEVEL = 1;
