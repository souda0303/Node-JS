function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

/* you can't do this way like */
module.exports = add; // to export that add function 
module.exports = sub; // to export that sub function 
/* it is not possible to import in this way because
   it override the add with sub */

/* in other way you can also export this funtions like */
exports.add = (a, b) => a + b; //add: [Function (anonymous)]
exports.sub = (a, b) => a - b; //sub: [Function (anonymous)]
/* in the above exports technique it returns a anonymous function */



/* and this is also a way to function like an object */
module.exports = {
  addFn: add, //addFn: [Function: add]
  subFn: sub, //subFn: [Function: sub]
};
/* it returns a named function */
