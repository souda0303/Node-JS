const fs = require("fs");

// sync function or blocking request
fs.writeFileSync("./test.txt", "Hey there!");
 
// async function or non blocking request
fs.writeFile('./test.txt', 'This is a async function', (err) => {});

// sync function or blocking request
/* whenever we are using synchronous task that
   return something, here is a text, and it stores
   into the result. */
const result = fs.readFileSync('./contact.txt', 'utf-8');
console.log(result);


/* it is a asynchronous task or non blocking task */
/* but when we are trying to fetch the data using readFile,
   it doesnot return anything, rather it passing it the file path, 
   encoding and a callback function that will be called with the 
   file data (and the error) */
fs.readFile('./contact.txt', 'utf-8', (err, result) => {
    if(err) {
        console.log('Error', err);
    } else {
        console.log(result);
    }
})


/* fs.appendFileSync() method is used to synchronously append 
   the given data to a file. A new file is created if it does 
   not exist. The optional options parameter can be used to 
   modify the behavior of the operation.
Syntax:
fs.appendFileSync( path, data, [options]) */
fs.appendFileSync('./test.txt', `Hello Forks!\n`);