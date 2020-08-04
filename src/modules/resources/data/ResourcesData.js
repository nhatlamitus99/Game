/**
 * Created by CPU12744-local on 8/4/2020.
 */

var ResourcesData = cc.Class.extend({
    _resources: null, //[Vang , Dau, G]

    ctor: function(resources){
        if (resources == null)
            return false;
        this._resources = resources;
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
    }
});