import BCIS from "./src/index";
let array = [3, 4, 2, 1, 0, 0, 4, 3, 4, 2];
let array2 = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let bcis = new BCIS();
console.log(bcis.sort(array2));
console.log(bcis.sort(array));