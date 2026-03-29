import { APIRequestContext, APIResponse } from '@playwright/test';
import { allure } from 'allure-playwright';

export class BaseClient {
  constructor(protected request: APIRequestContext) {}

  async get(url: string, options: Record<string, any> = {}): Promise<APIResponse> {
    this.validateUrl(url);

    const response = await this.request.get(url, options);
    await this.attachToAllure('GET', url, null, response);

    return response;
  }

  async post(
    url: string,
    data: Record<string, any> = {},
    options: Record<string, any> = {}
  ): Promise<APIResponse> {
    this.validateUrl(url);

    const response = await this.request.post(url, {
      data,
      ...options
    });

    await this.attachToAllure('POST', url, data, response);

    return response;
  }

  async put(
    url: string,
    data: Record<string, any> = {},
    options: Record<string, any> = {}
  ): Promise<APIResponse> {
    this.validateUrl(url);

    const response = await this.request.put(url, {
      data,
      ...options
    });

    await this.attachToAllure('PUT', url, data, response);

    return response;
  }

  async delete(url: string, options: Record<string, any> = {}): Promise<APIResponse> {
    this.validateUrl(url);

    const response = await this.request.delete(url, options);
    await this.attachToAllure('DELETE', url, null, response);

    return response;
  }

  private async attachToAllure(
    method: string,
    url: string,
    requestBody: any,
    response: APIResponse
  ) {
    try {
      const responseText = await response.text();

      allure.attachment(`${method} Request`, JSON.stringify({
        url,
        body: requestBody
      }, null, 2), 'application/json');

      allure.attachment(`${method} Response`, responseText, 'application/json');
    } catch (e) {
      // ignore parsing issues
    }
  }

  private validateUrl(url: string): void {
    if (!url || typeof url !== 'string') {
      throw new Error(`Invalid URL: ${url}`);
    }
  }
}