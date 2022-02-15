import mongoose from 'mongoose'

// CONNECTING TO MONGOOSE (get database url from .env.local)
const DATABASE_URL = process.env.DATABASE_URL

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

declare global {
  var mongoose: { conn: any; promise: any }
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

// connection function
const connect = async () => {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose
      .connect(DATABASE_URL as string, opts)
      .then((db) => {
        return db
      })
      .catch((err) => console.log(err))
  }
  cached.conn = await cached.promise
  console.log('Mongoose Connection Established')

  return cached.conn
  // const conn = await mongoose
  //   .connect(DATABASE_URL as string)
  //   .catch((err) => console.log(err))
  // console.log('Mongoose Connection Established')

  // return { conn }
}

export default connect
