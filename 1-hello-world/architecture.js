/* blocking operations */
const fs = require("fs");

console.log("1");
const result = fs.readFileSync("./contact.txt", "utf-8");
console.log(result);

console.log("2");

/* 
    it returns:
    1
    Souvik: +9111111111
    Piyush: +9122222222
    2
    > because  blocking refers to operations that block 
    further execution until that operation finishes. 
    > Thus, "1" is logged first, then the content of the 
    contact.txt is printed, and finally "2" is logged.
*/

/* non-blocking operations */
// console.log('1');

fs.readFile('./contact.txt','utf-8', (err, result) => {
    if(err) {
        console.log('Error', err);
    } else {
        console.log(result);
    }
});

console.log('2');

/* Now it returns:
    1
    2
    Souvik: +9111111111
    Piyush: +9122222222
 
    > This script demonstrates asynchronous file reading in Node.js
    > The readFile function is non-blocking, allowing further execution 
    while waiting for the file operation to complete.
    > Thus, "1" and "2" are logged first, then the content of contact.txt 
    is printed when it's available.
*/

/* 
    Notes:
    > Default thread pool is 4.
    > Maximum thread increase is depend on system architecture like
    I have 8core CPU, so I have max to max 8 threads in thread pool.

*/

/* If want to check about your CPU cores */
const os = require('os');
console.log(os.cpus().length);
/* here it returns 8 in my case */