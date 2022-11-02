const env = process.env.NODE_ENV

let MONGODB_CONF: {
    path: string,
    port: number,
    database: string
}

let REDIS_CONF: {
    port: number,
    host: string
}

if (env === 'development') {

    MONGODB_CONF = {
        path: 'localhost',
        port: 27017,
        database: 'todolist'
    }

    REDIS_CONF = {
        port: 6379,
		host: '127.0.0.1'
    }

}

export { 
    MONGODB_CONF,
    REDIS_CONF
}
