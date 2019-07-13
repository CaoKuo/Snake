var jsUtil = {
    extends: function (parentFunc) {
        var result = function () {
            parentFunc.apply(this, arguments)
        }
        this.inherit(result, parentFunc)
        return result;
    },

    inherit: function (target, origin) {
        var temp = function () {};
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
    },

    single: function (parentFunc) {
        //var result = this.extends(func);  //继承自Func的构造函数
        var singleResult = (function () {
            var instance;
            return function () {
                if (typeof instance == 'object') {
                    return instance;
                }
                // console.log(this, arguments)
                parentFunc && parentFunc.apply(this, arguments);
                instance = this;
            }
        })();
        parentFunc && this.inherit(singleResult, parentFunc)
        return singleResult;
    }


}
