class BaseResult {
    code: number = -1
    message: string = ''
    data: any
    constructor(code: number, message?: string, data?: any) {
        this.code = code
        if (message) this.message = message
        if (data) this.data = data
    }
}

class SuccessResult extends BaseResult {
    constructor(data?: any, message?: string) {
        super(0, message, data)
    }
}

class ErrorResult extends BaseResult {
    constructor(code: number, message?: string, data?: any) {
        super(code, message, data)
    }
}

class BadRequestErrorResult extends ErrorResult {
    constructor(message?: string, data?: any) {
        super(400, message, data)
    }
}

class PermissionErrorResult extends ErrorResult {
    constructor(message: string = 'Access without permission!', data?: any) {
        super(401, message, data)
    }
}

export {
    SuccessResult,
    ErrorResult,
    BadRequestErrorResult,
    PermissionErrorResult
}
