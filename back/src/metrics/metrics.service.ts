import { Injectable } from "@nestjs/common";
import { MetricsRepository } from "./metrics.repository";

@Injectable()
export class MetricsService {
    constructor (private readonly metrics: MetricsRepository) {}

    getMetrics() {
        return this.metrics.getMetrics();
    }

    startLlogi(user_id: string) {
        return this.metrics.startLogin(user_id);
}
endlogi(user_id: string) {
    return this.metrics.endLogin(user_id);
}
}