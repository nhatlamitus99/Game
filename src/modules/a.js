/**
 * Created by CPU12740-local on 8/6/2020.
 */
/**
 * Created by GSN on 7/6/2015.
 */

var aS = cc.Layer.extend({
    background:null,
    loginBox:null,
    logo:null,
    btnOk:null,
    loading:null,
    loading2:null,

    ctor:function() {
        this._super();
        this.init();
    },
    init: function()
    {
        var tmp = 5;
        var tableView = new cc.TableView(this, cc.size(600,60));
    }

});
