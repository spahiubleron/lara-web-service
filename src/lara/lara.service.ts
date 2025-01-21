import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Credentials, Translator } from '@translated/lara';

@Injectable()
export class LaraService implements OnModuleInit {
  private translator: Translator;
  private supportedLanguages: Set<string>;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const accessKeyId = this.configService.get<string>('LARA_ACCESS_KEY_ID');
    const accessKeySecret = this.configService.get<string>('LARA_ACCESS_KEY_SECRET');

    if (!accessKeyId || !accessKeySecret) {
      throw new Error(
        'Missing LARA credentials. Please ensure LARA_ACCESS_KEY_ID and LARA_ACCESS_KEY_SECRET are set in your environment variables.'
      );
    }

    const credentials = new Credentials(accessKeyId, accessKeySecret);
    this.translator = new Translator(credentials);
    
    const languages = await this.translator.getLanguages();
    this.supportedLanguages = new Set(languages);
  }

  getTranslator(): Translator {
    if (!this.translator) {
      throw new Error('Translator not initialized. Make sure environment variables are properly set.');
    }
    return this.translator;
  }

  async translateTexts(texts: string[], sourceLang: string, targetLang: string): Promise<string[]> {
    const translator = this.getTranslator();
    const response = await translator.translate(texts, sourceLang, targetLang);
    return response.translation;
  }

  isLanguageSupported(language: string): boolean {
    return this.supportedLanguages.has(language);
  }

  getSupportedLanguages(): string[] {
    return Array.from(this.supportedLanguages);
  }
}
