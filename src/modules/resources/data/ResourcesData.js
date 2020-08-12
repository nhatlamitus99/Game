/**
 * Created by CPU12744-local on 8/4/2020.
 */

var ResourcesData = cc.Class.extend({
    _resources: [], //[Vang , Dau, G]

    ctor: function(){
    },

    setAttributes: function(data) {
        if (data.gold < 0 || data.elixir < 0 || data.g < 0)
            return false;
        this._resources = [data.gold, data.elixir, data.g];
        return true;
    },

    increaseResources: function(amount) {
        if (amount.length != this._resources.length)
            return false;
        for (var i = 0; i < this._resources.length; ++i)
            this._resources[i] += amount[i];
        return true;
    },

    decreaseResources: function(amount) {
        if (amount.length != this._resources.length)
            return false;
        for (var i = 0; i < this._resources.length; ++i)
            if (this._resources[i] < amount[i])
                return false;
        for (i = 0; i < this._resources.length; ++i)
            this._resources[i] -= amount[i];
    },

    getResources: function() {
        var res = [];
        for (var i = 0; i < this._resources.length; ++i)
            res.push(this._resources[i]);
        return res;
    },
    showInfo: function() {
        cc.log("resources :(Gold-Elixir-G)="+this.getResources());
    }
});

var RESOURCES_DATA_ONLY_ONE = null;
ResourcesData.getInstance = function () {
    if (RESOURCES_DATA_ONLY_ONE === null) {
        RESOURCES_DATA_ONLY_ONE = new ResourcesData();
    }
    return RESOURCES_DATA_ONLY_ONE;
};