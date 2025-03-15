import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

function Login({ setAuth }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://ubuntuxx.infinityfreeapp.com/login.php", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
    
            const data = await response.json();
            if (data.success) {
                localStorage.setItem("isAuthenticated", "true"); 
                setAuth(true);
                navigate("/historycontent");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Server error. Please try again later.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>UbuntuX</h1>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>
        </div>
    );
}

export default Login;
