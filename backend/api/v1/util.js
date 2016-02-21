exports.handleError = function (err, res) {
    if (!err) {
        err = new Error("Unknown error");
    }

    console.log(err);

    var msg = err.message || err;
    var code = err.status || 500;

    if (err.stack) {
        res.status(code).json({
            message: msg,
            stack: getStackAsArray(err)
        });
    } else {
        res.status(code).json({message: msg});
    }
};

var getStackAsArray = exports.getStackAsArray = function (err) {
    if (err && err.stack) {
        return err.stack.split('\n');
    }

    return err;
};