//    var callFilters = function (filters, action) {
//        var i = 0,
//            filter,
//            success = true;
//
//        //combine all filters with action filters
//        filters = (filters['*'] || []).concat((filters[action] || []));
//
//        if (filters.length > 0) {
//            (function iterator(err) {
//
//                if (err) {
//                    success = false;
//                    return;
//                }
//
//                //get the next filter
//                filter = filters[i++];
//
//                //if we have a filter call it else we finished runnig the filter return success
//                if (filter) {
//                    filter.call(_self, _self.req, _self.res, iterator);
//                }
//            })();
//        }
//
//        return success;
//    };


//    function addFilter (filters, actions, callback) {
//
//        actions = _.isArray(actions) ?  actions : [actions];
//
//        _.forEach(actions,function(action){
//            if (!filters[action]) {
//                filters[action]  = [];
//            }
//
//            filters[action].push(callback);
//        });
//
//    };

//    this.beforeAction = function (action, callback) {
//
//        addFilter(_beforeAction, action, callback);
//    };
//
//    this.afterAction = function (action, callback) {
//
//        addFilter(_afterAction, action, callback);
//    };