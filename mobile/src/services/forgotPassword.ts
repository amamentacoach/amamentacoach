import api from 'services/api';

// Envia um email de alteração de senha para a mãe.
export async function forgotPassword(email: string): Promise<boolean> {
  try {
    await api.post('/esqueceusenha', {
      email,
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Altera a senha de uma mãe.
export async function newPassword(password: string): Promise<boolean> {
  try {
    await api.post('/alterarsenha', {
      senha: password,
    });
    return true;
  } catch (error) {
    return false;
  }
}
