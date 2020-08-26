'use strict';
(function () {
  window.utils = {
    arrayToLowerCase: arr => {
      let newArray = [];
      arr.forEach(element => newArray.push(element.toLowerCase()));
      return newArray;
    },
    checkDuplicatesInArray: arr => {
      let temp = [];
      temp = arr.filter(elem => {
        return temp[elem] || !(temp[elem]=!0)
      })
      return temp.length <= 0;
    }
  };
})();