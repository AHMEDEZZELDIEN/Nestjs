import { Controller, Post, Get } from '@nestjs/common';
import { LangchainService } from './langchain.service';

@Controller('api/langchain')
export class LangchainController {
  constructor(private readonly langchainService: LangchainService) {}

  @Get('documents')
  async getAllDocuments() {
    return await this.langchainService.getAllDocuments();
  }

  @Post('documents')
  async saveDocument() {
    return await this.langchainService.saveDocument();
  }
}
