function Login() {
  return (
    <div>
      <h2>LOGIN</h2>
      <form action="submit">
        <input
          type="text"
          id="email-input"
          placeholder="Email"
          data-testid="email-input"
        />
        <input
          type="text"
          id="password-input"
          placeholder="Password"
          data-testid="password-input"
        />
        <button
          id="login-submit-btn"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>

    </div>
  );
}
export default Login;
