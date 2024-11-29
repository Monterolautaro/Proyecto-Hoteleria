import { Injectable } from "@nestjs/common";
import { redis } from "src/config/redis.config";




@Injectable()
export class RedisService {
 
    async hSetHotels ( key, value ){
        const serializedHotels = JSON.stringify(value);
        await redis.hset(key, 'all' , serializedHotels);
        await redis.expire(key, 120);
    }

    async hGetHotels ( key ){
        const serializedHotels = await redis.hget(key, 'all');
        return JSON.parse(serializedHotels);
    }

    async delHotels ( key ){
        await redis.del(key);
    }
    
}