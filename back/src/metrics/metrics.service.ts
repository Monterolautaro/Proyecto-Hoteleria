import { Injectable } from "@nestjs/common";
import { MetricsRepository } from "./metrics.repository";

@Injectable()
export class MetricsService {
    constructor (private readonly metrics: MetricsRepository) {}

    getMetrics() {
        return this.metrics.getMetrics();
    }

    postMetrics() {
        return this.metrics.insertMetrics();
    }
    startLlogi() {
        return this.metrics.startLogin();
}
endlogi() {
    return this.metrics.endLogin();
}
}