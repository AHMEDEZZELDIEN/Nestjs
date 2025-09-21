import { Injectable } from '@nestjs/common';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { readFileSync } from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { OllamaEmbeddings } from '@langchain/ollama';

@Injectable()
export class LangchainService {
  constructor(private prismaService: PrismaService) {}

  async getAllDocuments(): Promise<any> {
    return await this.prismaService.$queryRaw`
      SELECT id, content, meta_data, embeddings::text as embeddings, "createdAt", "updatedAt"
      FROM "vectorDocument"
      ORDER BY "createdAt" DESC
    `;
  }

  async saveDocument(): Promise<void> {
    const filePath = join(
      process.cwd(),
      'src',
      'documents',
      'scrimba-info.txt',
    );
    const text = readFileSync(filePath, 'utf-8');
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
      separators: ['\n\n', '\n', ' ', ''],
    });

    const embeddings = new OllamaEmbeddings({
      model: 'mxbai-embed-large',
      baseUrl: 'http://127.0.0.1:11434',
    });

    const docs = await splitter.createDocuments([text]);
    const docEmbeddings = await embeddings.embedDocuments(
      docs.map((doc) => doc.pageContent),
    );

    // Use transaction for better performance and atomicity
    await this.prismaService.$transaction(async (tx) => {
      for (let i = 0; i < docs.length; i++) {
        const doc = docs[i];
        const embedding = docEmbeddings[i];

        await tx.$executeRaw`
          INSERT INTO "vectorDocument" (id, content, meta_data, embeddings, "createdAt", "updatedAt")
          VALUES (
            gen_random_uuid(),
            ${doc.pageContent},
            ${JSON.stringify(doc.metadata)}::jsonb,
            ${`[${embedding.join(',')}]`}::vector,
            NOW(),
            NOW()
          )
        `;
      }
    });
  }
}
