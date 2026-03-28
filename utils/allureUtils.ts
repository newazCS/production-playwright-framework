import * as allure from 'allure-js-commons';

export async function step<T>(
  name: string,
  body: () => Promise<T>
): Promise<T> {
  return await allure.step(name, body);
}

export async function attachJson(
  name: string,
  data: unknown
): Promise<void> {
  await allure.attachment(
    name,
    JSON.stringify(data, null, 2),
    'application/json'
  );
}

export async function attachText(
  name: string,
  data: string
): Promise<void> {
  await allure.attachment(name, data, 'text/plain');
}