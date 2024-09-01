import { LoginForm } from "../../components/activity/LoginForm.jsx";

export function Login() {
    return (
      <div className="bg-authentication grid">
            <div className="max-w-7xl mx-auto p-5 grid content-center">
                <LoginForm />
            </div>
      </div>
    );
}

export default Login;