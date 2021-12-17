var cpr;
(function (cpr) {
    var test;
    (function (test) {
        var instance = null;
        var TestKit = /** @class */ (function () {
            function TestKit() {
            }
            Object.defineProperty(TestKit, "INSTANCE", {
                get: function () {
                    if (!instance) {
                        instance = new TestKit();
                    }
                    return instance;
                },
                enumerable: false,
                configurable: true
            });
            TestKit.prototype.getControlByNode = function (element) {
                var rootApps = cpr.core.Platform.INSTANCE.getAllRunningAppInstances().filter(function (it) {
                    return it.isUDCInstance() === false && it.isRootAppInstance();
                });
                var controlUUID = cpr.ufc.DOMUUIDMapper.INSTANCE._getControlUUID(element);
                if (!controlUUID) {
                    return null;
                }
                var control = null;
                for (var _i = 0, rootApps_1 = rootApps; _i < rootApps_1.length; _i++) {
                    var eachRootApp = rootApps_1[_i];
                    control = eachRootApp._lookupDrillDownByUUID(controlUUID);
                    if (control instanceof cpr.controls.UIControl) {
                        return control;
                    }
                }
                return null;
            };
            return TestKit;
        }());
        test.TestKit = TestKit;
    })(test = cpr.test || (cpr.test = {}));
})(cpr || (cpr = {}));
