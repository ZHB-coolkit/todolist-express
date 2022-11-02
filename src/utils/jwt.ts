import jwt from 'jsonwebtoken'

// 算法类型
const algorithm = 'HS256'

// token 密钥
const SECRET = 'token_secret'

/**
 * 生成 token
 * @param id 用户id
 * @returns 
 */
const generateToken = (id: string) => {
    return jwt.sign(
        { 
            id,
            exp: Date.now() + 1000 * 60
        }, 
        SECRET, 
        { 
            algorithm
        }
    )
}

const verifyToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) {
                console.log('verifyToken err', err)
                reject(err)
            } else {
                console.log('verifyToken decoded', decoded)
                resolve(decoded)
            }
        })
    })
}

export {
    generateToken,
    verifyToken
}
