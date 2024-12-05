import { Controller, Get, Post } from "@nestjs/common";
import { MetricsService } from "./metrics.service";


@Controller('metrics')

export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @Get()
    async getMetrics() {
        return this.metricsService.getMetrics();
    }

   @Post()
    async postMetrics() {
        return this.metricsService.postMetrics();
    }

    @Post("/logi")
    async startLogi() {
        return this.metricsService.startLlogi();
    }
    @Post("/endlogi")
    async endtLogi() {
        return this.metricsService.endlogi();
    }
}

 