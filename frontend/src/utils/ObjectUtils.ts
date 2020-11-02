export default class ObjectUtils {

    static removeEmptyField<T>(obj: object) {
        var newObj = {};
        if (typeof obj == "string") {
            obj = JSON.parse(obj);
        }
        if (obj instanceof Array) {
            newObj = [];
        }
        if (obj instanceof Object) {
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr) && obj[attr] !== "" && obj[attr] !== null && obj[attr] !== undefined) {
                    if (obj[attr] instanceof Object) {
                        newObj[attr] = ObjectUtils.removeEmptyField(obj[attr]);
                    } else if (typeof obj[attr] == "string" && ((obj[attr].indexOf("{") > -1 && obj[attr].indexOf("}") > -1) || (obj[attr].indexOf("[") > -1 && obj[attr].indexOf("]") > -1))) {
                        try {
                            var attrObj = JSON.parse(obj[attr]);
                            if (attrObj instanceof Object) {
                                newObj[attr] = ObjectUtils.removeEmptyField(attrObj);
                            }
                        } catch (e) {
                            newObj[attr] = obj[attr];
                        }
                    } else {
                        newObj[attr] = obj[attr];
                    }
                }
            }
        }
        return newObj;
    }

    static stringifyNoEmptyField<T>(obj: object) {
        var newObj = ObjectUtils.removeEmptyField(obj);
        for (var attr in newObj) {
            if (newObj.hasOwnProperty(attr) && newObj[attr] instanceof Array) {
                newObj[attr] = JSON.stringify(newObj[attr]);
            }
        }
        return JSON.stringify(newObj);
    }
}