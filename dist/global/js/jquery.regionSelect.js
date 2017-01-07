//地区联动
;
(function ($, window, document) {

    var pluginName = 'regionSelect';
    var defaultVal = {
        url: '',
        province: 'province',
        key: 'id',
        name: 'province',
        type: 'get'
    };
    var Regionselect = function (element, options) {
        this.element = element;
        this.setting = $.extend({}, defaultVal, options);
        this.selectContainer = $(element);
        this.province = 'select.province';
        this.city = 'select.city';
        this.area = 'select.area';
        this.ajaxData = null;
    };
    Regionselect.prototype = {
        init: function () {
            this.initSelect();
            this.initProvince();
        },
        initSelect: function () {
            this.selectContainer.find("select").each(function () {
                var sel = $(this);
                sel.find("option:not(:first)").remove();
            });
        },
        getData: function (select) {
            var This = this;
            var opt = This.setting;
            $.ajax({
                url: opt.url,
                dataType: 'json',
                type: opt.type,
                async: opt.async,
                data: This.ajaxData,
                success: function (data) {
                    if (data.status == 'ok') {
                        This.setSelectOptions(select, data.msg);
                    } else if (data.status == 'fail') {} else {
                        alert('系统异常！请刷新重试！');
                    }
                },
                error: function () {
                    // alert('很抱歉，请重试！');
                }
            });
        },
        setSelectOptions: function (selectClass, data) {
            var This = this;
            var select = This.selectContainer.find(selectClass);
            var temp = "";
            for (var i = 0, len = data.length; i < len; i++) {
                temp += '<option value="' + data[i][This.key] + '">' + data[i][This.name] + '</option>';
            }
            select.append(temp);
        },
        initProvince: function () {
            var This = this;
            This.ajaxData = { "areaCode": "province" };
            This.getData(This.province);
            This.setCityOpts();
        },
        setCityOpts: function () {
            var This = this;
            This.selectContainer.on('change', This.province, function () {
                This.ajaxData = { "areaCode": "city" };
                This.getData(This.city);
                this.setAreaOpts();
            });
        },
        setAreaOpts: function () {
            var This = this;
            This.selectContainer.on('change', This.city, function () {
                This.ajaxData = { "areaCode": "area" };
                This.getData(This.area);
            });
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                var opts = $.extend(true, {}, $.fn[pluginName].defaults, typeof options === "object" ? options : {});
                var newFun = new Regionselect(this, opts);
                $.data(this, pluginName, newFun);
            }
            if (typeof options === "string" && typeof newFun[options] == "function") {
                // 执行插件的方法
                newFun[options].apply(newFun, args);
            }
        });
    };
})(jQuery, window, document);