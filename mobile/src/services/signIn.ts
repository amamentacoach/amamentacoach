import api from 'services/api';

export enum LoginStatus {
  AccountNotAuthorized,
  FailedToConnect,
  IncorrectLogin,
  Success,
}

interface LoginResponse {
  status: LoginStatus;
  token: string;
}

// Loga uma mãe no sistema.
export async function signIn(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const login = {
    token: '',
    status: LoginStatus.FailedToConnect,
  };

  try {
    const request = await api.post('/login', {
      email,
      senha: password,
    });
    login.token = request.data.token;
    login.status = LoginStatus.Success;
  } catch (error: any) {
    switch (error.response?.status) {
      case 401:
        login.status = LoginStatus.IncorrectLogin;
        break;
      case 404:
        login.status = LoginStatus.AccountNotAuthorized;
        break;
      default:
        break;
    }
  }
  return login;
}
