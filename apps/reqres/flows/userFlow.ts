import { APIRequestContext, expect } from '@playwright/test';
import { BaseClient } from '../../../api/clients/baseClient';
import { reqresRoutes } from '../routes/users';
import { appConfig } from '../../../config/appConfig';

export class UserFlow {
  private client: BaseClient;
  private token: string = '';
  private userId: string = '';

  constructor(request: APIRequestContext) {
    this.client = new BaseClient(request);
  }

  async login() {
    const response = await this.client.post(
      `${appConfig.reqres.api.baseUrl}${reqresRoutes.login}`,
      {
        email: process.env.REQRES_API_EMAIL,
        password: process.env.REQRES_API_PASSWORD
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REQRES_API_KEY || ''
        }
      }
    );

    const responseText = await response.text();

    expect(response.status(), `Login failed. Response body: ${responseText}`).toBe(200);

    const body = JSON.parse(responseText);
    this.token = body.token;
  }

  async createUser(name: string) {
    const response = await this.client.post(
      `${appConfig.reqres.api.baseUrl}${reqresRoutes.users}`,
      {
        name,
        job: 'QA Engineer'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          'x-api-key': process.env.REQRES_API_KEY || ''
        }
      }
    );

    const body = await response.json();
    this.userId = body.id;

    return response;
  }

  async getUsers() {
    return await this.client.get(
      `${appConfig.reqres.api.baseUrl}${reqresRoutes.users}`,
      {
        headers: {
          'x-api-key': process.env.REQRES_API_KEY || ''
        }
      }
    );
  }

  async updateUser(name: string) {
    return await this.client.put(
      `${appConfig.reqres.api.baseUrl}${reqresRoutes.users}/${this.userId}`,
      {
        name: `Updated ${name}`,
        job: 'Senior QA'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
          'x-api-key': process.env.REQRES_API_KEY || ''
        }
      }
    );
  }

  async deleteUser() {
    return await this.client.delete(
      `${appConfig.reqres.api.baseUrl}${reqresRoutes.users}/${this.userId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'x-api-key': process.env.REQRES_API_KEY || ''
        }
      }
    );
  }
}