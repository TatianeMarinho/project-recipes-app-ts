import { useState } from 'react';
import { INICIAL_LOGIN } from '../../types/types';

function Login() {
  const [inputs, setInputs] = useState(INICIAL_LOGIN);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  console.log(inputs);

  const isvalidButton = () => {
    const emailRegex = /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const emailIsValid = emailRegex.test(inputs.email);
    const paswordRegex = /^.{7,}$/;
    const paswordIsValid = paswordRegex.test(inputs.password);
    return emailIsValid && paswordIsValid;
  };

  return (
    <div>
      <h2>LOGIN</h2>
      <form action="submit">
        <input
          type="text"
          name="email"
          id="email-input"
          placeholder="Email"
          value={ inputs.email }
          onChange={ handleInputChange }
          data-testid="email-input"
        />
        <input
          type="text"
          name="password"
          id="password-input"
          placeholder="Password"
          value={ inputs.password }
          onChange={ handleInputChange }
          data-testid="password-input"
        />
        <button
          id="login-submit-btn"
          disabled={ !isvalidButton() }
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>

    </div>
  );
}
export default Login;
