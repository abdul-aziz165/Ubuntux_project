import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Signup.css"; 

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost/ubuntuX_backend/signup.php", {
                username,
                email,
                password
            });

            if (response.data.message) {
                alert(response.data.message);
                navigate("/"); 
            } else {
                setError(response.data.error);
            }
        } catch (err) {
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <a href="/">Login</a></p>
            </div>
        </div>
    );
}

export default Signup;
