"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BCIS = function () {
    function BCIS() {
        _classCallCheck(this, BCIS);
    }
    /**
     * 
     * @param {Object[]} _array array to be swapped
     * @param {number} a index a to be swapped with index b
     * @param {number} b index b to be swapped with index a
     */


    _createClass(BCIS, null, [{
        key: "SWAP",
        value: function SWAP() {
            var _array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var a = arguments[1];
            var b = arguments[2];

            var temp = _array[a];
            _array[a] = _array[b];
            _array[b] = temp;
        }
        /**
         * 
         * @param {Object[]} _array 
         * @param {*} _current_item 
         * @param {number} SR 
         * @param {number} right 
         */

    }, {
        key: "INSRIGHT",
        value: function INSRIGHT(_array, _current_item, SR, right) {
            var j = SR;
            while (j <= right && _current_item > _array[j]) {
                _array[j - 1] = _array[j];
                j = j + 1;
            };
            _array[j - 1] = _current_item;
        }
        /**
         * 
         * @param {Object[]} _array 
         * @param {*} _current_item 
         * @param {number} SL 
         * @param {number} left 
         */

    }, {
        key: "INSLEFT",
        value: function INSLEFT(_array, _current_item, SL, left) {
            var j = SL;
            while (j >= left && _current_item < _array[j]) {
                _array[j + 1] = _array[j];
                j = j - 1;
            };
            _array[j + 1] = _current_item;
        }
        /**
         * 
         * @param {Object[]} _array 
         * @param {number} SL 
         * @param {number} SR 
         */

    }, {
        key: "ISEQUAL",
        value: function ISEQUAL(_array, SL, SR) {
            var SL_MORE = SL + 1;
            var SR_LESS = SR - 1;
            for (var k = SL_MORE; k <= SR_LESS; k++) {
                if (_array[k] != _array[SL]) {
                    SWAP(_array, k, SL);
                    return k;
                }
            }
            return -1;
        }

        /**
         * 
         * @param {Object[]} _array array to be sorted
         * @param {number} left index of left sorted array 
         * @param {number} right index of right sorted array
         */

    }, {
        key: "Sort",
        value: function Sort() {
            var _array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var left = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var right = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            if (left === null) {
                left = 0;
            }
            if (right === null && _array.length > 0) {
                right = _array.length - 1;
            }

            var SL = left;
            var SR = right;
            var i = void 0;
            while (SL < SR && SR <= right) {
                var calc = parseInt(SL + (SR - SL) / 2);
                this.SWAP(_array, SR, calc);
                if (_array[SL] === _array[SR]) {
                    if (this.ISEQUAL(_array, SL, SR) !== -1) {
                        return -1;
                    }
                }
                if (_array[SL] > _array[SR]) {
                    this.SWAP(_array, SL, SR);
                }
                if (SL - SR >= 100) {
                    for (i = SL + 1; i <= parseInt(Math.sqrt(SR - SL)); i++) {
                        if (_array[SR] < _array[i]) {
                            this.SWAP(_array, SR, i);
                        } else if (_array[SL] > _array[i]) {
                            this.SWAP(_array, SL, i);
                        }
                    }
                } else {
                    i = SL + 1;
                }
                var LC = _array[SL];
                var RC = _array[SR];
                while (i < SR) {
                    var _current_item = _array[i];
                    if (_current_item >= RC) {
                        _array[i] = _array[SR - 1];
                        this.INSRIGHT(_array, _current_item, SR, right);
                        SR = SR - 1;
                    } else if (_current_item <= LC) {
                        _array[i] = _array[SL + 1];
                        this.INSLEFT(_array, _current_item, SL, left);
                        SL = SL + 1;
                        i = i + 1;
                    } else {
                        i = i + 1;
                    }
                }
                SL = SL + 1;
                SR = SR + 1;
            }
        }
    }]);

    return BCIS;
}();

function shuffle(array) {
    var i = array.length,
        j = 0,
        temp = void 0;

    while (i--) {

        j = Math.floor(Math.random() * (i + 1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}
function getArray(max_num) {
    var _a = [];
    for (var i = 0; i <= max_num; i++) {
        _a.push(i);
    }
    return _a;
}
function getTime() {
    return performance.now();
}
function getSeconds(p1, p2) {
    return p2 - p1;
}
function isSorted(array) {
    var length = array.length;
    for (var i = array[0]; i < length; i++) {
        if (i !== array[i]) {
            return false;
        }
    }
    return true;
}

function sort(_array) {
    var sorted = _array;
    var ret_obj = {
        original: _array.slice(0),
        sorted: null,
        time: -1,
        valid: false
    };
    var p1 = getTime();
    BCIS.Sort(sorted);
    var p2 = getTime();
    ret_obj.valid = isSorted(sorted);
    ret_obj.sorted = sorted;
    ret_obj.time = getSeconds(p1, p2);
    return ret_obj;
}
function generateRandomLength(max_num) {
    var array = getArray(max_num);
    array = shuffle(array);
    return sort(array);
}
function clear(arr) {
    var length = arr.length;
    for (var i = length; i--;) {
        arr[i].innerHTML = "";
    }
}
function printArray(dom, arr) {
    var text = "";
    var length = arr.length;
    var length_short = length - 1;
    var count = 0;
    for (var i = 0; i < length; i++) {
        var a = arr[i];
        if (i === length_short) {
            text += "" + a;
        } else {
            text += a + ", ";
        }
        count++;
    }
    dom.innerHTML = text;
};

function RunTest() {
    var value = parseInt(document.getElementById("max_num").value);
    if (isNaN(value) === true) return false;
    if (value < 10) return false;
    var orig = document.getElementById("orig");
    var sorted = document.getElementById("sorted");
    var time = document.getElementById("time");
    var valid = document.getElementById("valid");
    var obj = generateRandomLength(value);
    clear([orig, sorted, time, valid]);
    printArray(orig, obj.original);
    printArray(sorted, obj.sorted);
    time.innerHTML = obj.time + " milliseconds";
    valid.innerHTML = obj.valid === true ? '<h3 style="color: green">VALID</h3>' : '<h3 style="color: red">NOT VALID</h3>';
    return true;
}

function RunStressTest() {
    var o = document.getElementById("output");
    o.innerHTML = "processing";
    var max = 50001;
    var min = 10;
    var return_array = [];
    var time = [];
    for (var i = 10; i < max; i = i + 10) {
        return_array.push({
            x: i,
            y: generateRandomLength(i).time
        });
        console.log(i);
    }
    MakeChart(o, return_array);
    return true;
}

function MakeChart(o, data) {
    o = document.getElementById("output");
    o.innerHTML = "";
    o.innerHTML += "<div>x,y</div>";
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var v = _step.value;

            o.innerHTML += "<div>" + v.x + "," + v.y + "</div>";
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}