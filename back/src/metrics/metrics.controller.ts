import { Controller, Get, Post } from "@nestjs/common";
import { MetricsService } from "./metrics.service";


@Controller('metrics')

export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @Get()
    async getMetrics() {
        return this.metricsService.getMetrics();
    }

    @Post("/logi")
    async startLogi(user_id: string) {
        return this.metricsService.startLlogi(user_id);
    }
    @Post("/endlogi")
    async endtLogi(user_id: string) {
        return this.metricsService.endlogi(user_id);
    }
}

 