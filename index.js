export class BCIS {
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