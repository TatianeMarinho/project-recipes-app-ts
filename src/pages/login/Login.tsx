import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_LOGIN } from '../../types/types';
import useLocalStorage from '../../hooks/useLocalStorage';
import ContextRecipesApp from '../../context/user-context';

function Login() {
  const [inputs, setInputs] = useState(INITIAL_LOGIN);
  const { email, password } = inputs;
  const navigate = useNavigate();
  const { updateValue } = useLocalStorage('user', JSON.stringify(inputs));
  const { setLogin } = useContext(ContextRecipesApp);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
    setLogin({ email });
  };

  const isValidButton = () => {
    const emailRegex = /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const emailIsValid = emailRegex.test(email);
    const paswordRegex = /^.{7,}$/;
    const paswordIsValid = paswordRegex.test(password);
    return emailIsValid && paswordIsValid;
  };

  const handleSubmit = () => {
    navigate('/meals');
    const newValue = { email };
    updateValue(JSON.stringify(newValue));
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
          value={ email }
          onChange={ handleInputChange }
          data-testid="email-input"
        />
        <input
          type="text"
          name="password"
          id="password-input"
          placeholder="Password"
          value={ password }
          onChange={ handleInputChange }
          data-testid="password-input"
        />
        <button
          type="button"
          id="login-submit-btn"
          disabled={ !isValidButton() }
          data-testid="login-submit-btn"
          onClick={ handleSubmit }
        >
          Enter
        </button>
      </form>

    </div>
  );
}
export default Login;
