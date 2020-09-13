class ApiResult {

    constructor(message, source, totalCount)
    {
        this.message = message;
        this.source = source;
        this.totalCount = totalCount;
    }

    message;
    source = [];
    totalCount;
}

module.exports = ApiResult;