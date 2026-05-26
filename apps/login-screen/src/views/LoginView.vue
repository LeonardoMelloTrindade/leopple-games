<template>
  <main class="login-container">
    <section class="login-banner">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
        alt="Ilustração Login"
      />
    </section>

    <section class="login-content">
      <div class="login-box">
        <h1 class="login-title">LOGIN</h1>

        <form>
          <div class="form-group">
            <label for="email">Usuário</label>
            <input
              id="email"
              type="email"
              class="form-control"
              placeholder="@mail.com"
            />
          </div>

          <div class="form-group">
            <label for="password">Senha</label>
            <input
              id="password"
              type="password"
              class="form-control"
              placeholder="********"
            />
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" /> Lembrar de mim
            </label>
            <a href="#" class="forgot-password">Esqueceu a senha?</a>
          </div>
          <button type="submit" class="btn-login">Entrar</button>
          <p class="signup-text">
            Não tem uma conta? <a href="#">Cadastrar-se</a>
          </p>

          <div class="divider"><span>Ou entrar com</span></div>

          <div class="social-login">
            <button type="button" class="social-button google">
              <i class="fa-brands fa-google" />
            </button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.login-container {
  width: 100%;
  max-width: 1100px;
  min-height: 650px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.login-banner {
  background: #17a8e5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-banner img {
  width: 100%;
  max-width: 450px;
  object-fit: contain;
}

.login-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: #fafafa;
}

.login-box {
  width: 100%;
  max-width: 360px;
}

.login-title {
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  color: #1b1b3a;
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: #1d1d1d;
}

.form-control {
  width: 100%;
  height: 48px;
  border: 1px solid transparent;
  background: #eef3f7;
  border-radius: 10px;
  padding: 0 16px;
  font-size: 0.95rem;
  transition: 0.3s ease;
  outline: none;
}

.form-control:focus {
  border-color: #17a8e5;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(23, 168, 229, 0.15);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #444;
}

.forgot-password {
  font-size: 0.9rem;
  color: $light-color-text-secondary;
  text-decoration: none;
  transition: 0.3s;
}

.btn-login {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background: #17a8e5;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn-login:hover {
  background: #0b8bc2;
  transform: translateY(-1px);
}

.signup-text {
  text-align: center;
  margin-top: 22px;
  font-size: 0.95rem;
  color: gray;
}

.signup-text a {
  color: $light-color-text-secondary;
  text-decoration: none;
  font-weight: 500;
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 32px 0 24px;
  color: gray;
  font-size: 0.9rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #ddd;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.social-button {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid #e5e5e5;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  cursor: pointer;
  transition: 0.3s ease;
}

.social-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.google {
  color: #ea4335;
}

/* RESPONSIVO */
@media (max-width: 900px) {
  .login-container {
    grid-template-columns: 1fr;
    max-width: 500px;
  }

  .login-banner {
    min-height: 280px;
    padding: 32px;
  }

  .login-banner img {
    max-width: 260px;
  }

  .login-content {
    padding: 40px 28px;
  }
}

@media (max-width: 480px) {
  body {
    padding: 16px;
  }

  .login-content {
    padding: 32px 20px;
  }

  .login-title {
    font-size: 1.8rem;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
  }

  .social-login {
    gap: 16px;
  }
}
</style>
