import Form from '../Form/Form';
import Jokes from '../Jokes/Jokes';

export default [
  {
    name: "Login",
    render: Form('Login')
  },
  {
    name: "Register",
    render: Form('Register')
  },
  {
    name: "Jokes",
    render: Jokes
  },
]