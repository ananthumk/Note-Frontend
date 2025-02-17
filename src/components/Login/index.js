import {Component} from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import './index.css'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleEmail = event => this.setState({email: event.target.value})
    handlePassword = event => this.setState({password: event.target.value})

    onSubmitLoginForm = async (event) => {
        event.preventDefault()
        const { email, password } = this.state
        const userDetails = { email, password }
    
        try {
            const response = await fetch('https://finalnotebackend-3.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userDetails)
            });
    
           
            if (!response.ok) {
                
                const errorData = await response.json();
                console.error('Login failed:', errorData.message || 'Unknown error');
                return; 
            }
    
           
            const data = await response.json();
            const jwt = (data.token)
    
           
            Cookies.set('jwtToken', jwt, { expires: 30 });
            console.log('Login successful', data);
            <Redirect to="/" />
    
    
        } catch (error) {
            console.error('Failed to fetch:', error);
        }
    }
    

    render() {
        const {email, password} = this.state
        return (
            <div className="notes-app-container">
                <div className="login-container">
                    <h1>Notes</h1>
                    <form className="form-container" onSubmit={this.onSubmitLoginForm}>
                        <div className="input-container">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={this.handleEmail}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={this.handlePassword}
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    <p>Don't have an account? <a href="/signup">Signup</a></p>
                </div>
            </div>
        )
    }
}

export default Login
