class BaseResult {
    message: string = ''
    data: any
    constructor(data: any, message?: string | null) {
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessResult extends BaseResult {
    code: number
    constructor(data?: any, message?: string) {
        super(data, message)
        this.code = 0
    }
}

class ErrorResult extends BaseResult {
    code: number
    constructor(code: number, data: any, message?: string) {
        super(data, message)
        this.code = code
    }
}

export {
    SuccessResult,
    ErrorResult
}
