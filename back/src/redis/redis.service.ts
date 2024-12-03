import { Injectable } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { redis } from "src/config/redis.config";




@ApiTags('redis')
@Injectable()
export class RedisService {

    async hSetHotels(key, value) {
        const serializedHotels = JSON.stringify(value);
        await redis.hset(key, 'all', serializedHotels);
        await redis.expire(key, 1200);
    }

    async hGetHotels(key) {
        const serializedHotels = await redis.hget(key, 'all');
        return JSON.parse(serializedHotels);
    }

    async delHotels(key) {
        await redis.del(key);
    }

}