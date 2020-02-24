async function f1(delay) {
    console.log('enter f1');
    let p = new Promise(res => setTimeout(res, delay));
    await p;
    console.log('exit f1');
}

(async function() {
    console.log('calling f1');
    await f1(1000);
    console.log('after f1');
})();