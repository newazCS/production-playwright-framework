import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseClient {
  constructor(protected request: APIRequestContext) {}

  async get(url: string, options: Record<string, any> = {}): Promise<APIResponse> {
    return await this.request.get(url, options);
  }

  async post(url: string, data: Record<string, any> = {}, options: Record<string, any> = {}): Promise<APIResponse> {
    return await this.request.post(url, {
      data,
      ...options
    });
  }

  // async put(url: string, data: Record<string, any> = {}, options: Record<string, any> = {}): Promise<APIResponse> {
  //   return await this.request.put(url, {
  //     data,
  //     ...options
  //   });
  // }

  // async delete(url: string, options: Record<string, any> = {}): Promise<APIResponse> {
  //   return await this.request.delete(url, options);
  // }

  async put(url: string, data: any, options: any = {}) {
  return await this.request.put(url, {
    data,
    ...options
  });
}

async delete(url: string, options: any = {}) {
  return await this.request.delete(url, options);
}
}