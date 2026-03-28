import { sauceDemoUsers } from './users';
import { getEnvValue } from '../../../utils/testDataUtils';

export function getStandardSauceDemoUser() {
  return {
    username: getEnvValue(sauceDemoUsers.standard.usernameEnvKey),
    password: getEnvValue(sauceDemoUsers.standard.passwordEnvKey)
  };
}