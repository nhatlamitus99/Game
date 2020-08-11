/**
 * Created by CPU12744-local on 8/11/2020.
 */
var CONFIG_DATA = {
    file: {},
    load: function () {
        this.file.AMC = cc.loader.getRes(itemInfo_resources.AMC);
        this.file.BAR = cc.loader.getRes(itemInfo_resources.BAR);
        this.file.BDH = cc.loader.getRes(itemInfo_resources.BDH);
        this.file.CCS = cc.loader.getRes(itemInfo_resources.CCS);
        this.file.DEF = cc.loader.getRes(itemInfo_resources.DEF);
        this.file.DEB = cc.loader.getRes(itemInfo_resources.DEB);
        this.file.OBS = cc.loader.getRes(itemInfo_resources.OBS);
        this.file.RES = cc.loader.getRes(itemInfo_resources.RES);
        this.file.STO = cc.loader.getRes(itemInfo_resources.STO);
        this.file.TOW = cc.loader.getRes(itemInfo_resources.TOW);
        this.file.TRO = cc.loader.getRes(itemInfo_resources.TRO);
        this.file.TRB = cc.loader.getRes(itemInfo_resources.TRB);
        this.file.WAL = cc.loader.getRes(itemInfo_resources.WAL);
    },
    name: {
        "ArmyCamp": "AMC",
        "Barrack": "BAR",
        "BuilderHut": "BDH",
        "ClanCastle": "CCS",
        "Defence": "DEF",
        "DefenceBase": "DEB",
        "Obstacle": "OBS",
        "Resource": "RES",
        "Storage": "STO",
        "TownHall": "TOW",
        "Troop": "TRO",
        "TroopBase":"TRB",
        "Wall": "WAL"
    },
    getData: function(key, type, level) {
        cc.log(key + " " + level);
        var file = this.file[this.name[key]];
        return file[type][level];
    }
};