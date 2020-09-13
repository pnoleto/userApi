class ExceptionResult{
    
    constructor(status, name, message)
    {
        this.status = status;
        this.name = name;
        this.message = message;
    }

    status;
    name;
    message;
}

module.exports = ExceptionResult;