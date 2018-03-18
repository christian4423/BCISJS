class BCIS {
    constructor() { }
    /**
     * 
     * @param {Object[]} _array array to be swapped
     * @param {number} a index a to be swapped with index b
     * @param {number} b index b to be swapped with index a
     */
    static SWAP(_array = [], a, b) {
        const temp = _array[a];
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
    static INSRIGHT(_array, _current_item, SR, right) {
        let j = SR;
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
    static INSLEFT(_array, _current_item, SL, left) {
        let j = SL;
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
    static ISEQUAL(_array, SL, SR) {
        const SL_MORE = SL + 1;
        const SR_LESS = SR - 1;
        for (let k = SL_MORE; k <= SR_LESS; k++) {
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
    static Sort(_array = [], left = null, right = null) {
        if (left === null) {
            left = 0;
        }
        if (right === null && _array.length > 0) {
            right = _array.length - 1;
        }

        let SL = left;
        let SR = right;
        let i;
        while (SL < SR && SR <= right) {
            let calc = parseInt(SL + ((SR - SL) / 2));
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
                for (i = (SL + 1); i <= parseInt(Math.sqrt(SR - SL)); i++) {
                    if (_array[SR] < _array[i]) {
                        this.SWAP(_array, SR, i);
                    } else if (_array[SL] > _array[i]) {
                        this.SWAP(_array, SL, i);
                    }
                }
            } else {
                i = SL + 1;
            }
            let LC = _array[SL];
            let RC = _array[SR];
            while (i < SR) {
                let _current_item = _array[i];
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
}
function shuffle(array) {
    let i = array.length,
        j = 0,
        temp;

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
    let _a = [];
    for (let i = 0; i <= max_num; i++) {
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
    let length = array.length;
    for (let i = array[0]; i < length; i++) {
        if (i !== array[i]) {
            return false;
        }
    }
    return true;
}


function sort(_array) {
    let sorted = _array;
    let ret_obj = {
        original: _array.slice(0),
        sorted: null,
        time: -1,
        valid: false
    }
    let p1 = getTime();
    BCIS.Sort(sorted);
    let p2 = getTime();
    ret_obj.valid = isSorted(sorted);
    ret_obj.sorted = sorted;
    ret_obj.time = getSeconds(p1, p2);
    return ret_obj;
}
function generateRandomLength(max_num) {
    let array = getArray(max_num);
    array = shuffle(array);
    return sort(array);
}
function clear(arr) {
    let length = arr.length;
    for (let i = length; i--;) {
        arr[i].innerHTML = "";
    }
}
function printArray(dom, arr) {
    let text = "";
    let length = arr.length;
    let length_short = length - 1;
    let count = 0;
    for (let i = 0; i < length; i++) {
        let a = arr[i];
        if (i === length_short) {
            text += `${a}`
        } else {
            text += `${a}, `
        }
        count++;
    }
    dom.innerHTML = text;
};

function RunTest() {
    let value = parseInt(document.getElementById("max_num").value);
    if (isNaN(value) === true) return false;
    if (value < 10) return false;
    let orig = document.getElementById("orig");
    let sorted = document.getElementById("sorted");
    let time = document.getElementById("time");
    let valid = document.getElementById("valid");
    let obj = generateRandomLength(value);
    clear([orig, sorted, time, valid]);
    printArray(orig, obj.original);
    printArray(sorted, obj.sorted);
    time.innerHTML = `${obj.time} milliseconds`;
    valid.innerHTML = (obj.valid === true) ? '<h3 style="color: green">VALID</h3>' : '<h3 style="color: red">NOT VALID</h3>';
    return true;
}

function RunStressTest() {
    let o = document.getElementById("output");    
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
    MakeChart(o,return_array);
    return true;
}

function MakeChart(o,data) {
    o = document.getElementById("output");
    o.innerHTML = "";
    o.innerHTML += `<div>x,y</div>`
    for (let v of data) {
        o.innerHTML += `<div>${v.x},${v.y}</div>`;
    }
}
