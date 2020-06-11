/**
 * 初始化详情对话框
 */
var GxswJcsjInfoInfoDlg = {
    gxswJcsjInfoInfoData : {}
};

layui.use(['layer', 'Hussar', 'HussarAjax', 'laydate'], function(){
	var layer = layui.layer
        ,Hussar = layui.Hussar
	    ,$ = layui.jquery
	    ,laydate = layui.laydate
	    ,$ax = layui.HussarAjax;

/**
 * 清除数据
 */
GxswJcsjInfoInfoDlg.clearData = function() {
    this.gxswJcsjInfoInfoData = {};
};

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
GxswJcsjInfoInfoDlg.set = function(key, val) {
    this.gxswJcsjInfoInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
};

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
GxswJcsjInfoInfoDlg.get = function(key) {
    return $("#" + key).val();
};

/**
 * 关闭此对话框
 */
GxswJcsjInfoInfoDlg.close = function() {
    parent.layui.layer.close(window.parent.GxswJcsjInfo.layerIndex);
};

/**
 * 收集数据
 */
GxswJcsjInfoInfoDlg.collectData = function() {
    this
    .set('identityCard')
    .set('taxpayerName')
    .set('taxpayerItem')
    .set('taxpayerMoney')
    .set('startTime')
    .set('endTime')
    .set('taxpayerType')
    .set('town')
    .set('village');
};

/**
 * 提交添加
 */
GxswJcsjInfoInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Hussar.ctxPath + "/gxswJcsjInfo/add", function(data){
        window.parent.layui.Hussar.success("添加成功!");
        window.parent.$('#GxswJcsjInfoTable').bootstrapTable('refresh');
        GxswJcsjInfoInfoDlg.close();
    },function(data){
        Hussar.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.gxswJcsjInfoInfoData);
    ajax.start();
};

/**
 * 提交修改
 */
GxswJcsjInfoInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Hussar.ctxPath + "/gxswJcsjInfo/update", function(data){
        window.parent.layui.Hussar.success("修改成功!");
        window.parent.$('#GxswJcsjInfoTable').bootstrapTable('refresh');
        GxswJcsjInfoInfoDlg.close();
    },function(data){
        Hussar.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.gxswJcsjInfoInfoData);
    ajax.start();
};

/**
 * 初始化时间控件
 */
GxswJcsjInfoInfoDlg.initLaydate = function() {
    var dateDom = $(".dateType");
    $.each($(".dateType"), function (i,dom) {
        laydate.render({
            elem: dom,
            type : 'datetime'
        });
    });
}

$(function() {
    GxswJcsjInfoInfoDlg.initLaydate();   //初始化时间控件
});

});