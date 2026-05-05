
function BaseObject() {
    this.methodLogs = [];
}

BaseObject.prototype.logMethodCall = function (name, args) {
    let time = performance.now();
    this.methodLogs.push({name, time, args});
}

BaseObject.prototype.clearMethodLogs = function () {
    this.methodLogs = [];
};

BaseObject.prototype.printMethodLogs = function () {
    console.log(" ");
    console.log("Список действий:");
    this.methodLogs.forEach(log => {
        console.log(`${log.name}(${JSON.stringify(log.args)}) - ${log.time}`);
    });
}
