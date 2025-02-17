import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "./index.css";

class Signup extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        isRegistered: false
    }

    handleName = event => this.setState({ name: event.target.value })
    handleEmail = event => this.setState({ email: event.target.value })
    handlePassword = event => this.setState({ password: event.target.value })

    onSubmitUser = async (event) => {
        const { email, name, password } = this.state
        event.preventDefault()
        const userDetails = { email, name, password }
        const url = 'https://finalnotebackend-3.onrender.com/signup'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(url, options);

        if (response.ok) {
            this.setState({ isRegistered: true });
        } else {
            console.error('Signup failed:', response.status);
            response.json().then(errorData => {
                console.error('Error details:', errorData);
            });
        }

    }

    render() {
        const { name, email, password, isRegistered } = this.state;

        if (isRegistered) {
            return <Redirect to="/login" />;
        }

        return (
            <div className='signup-page'>
                <div className='sign-card'>
                    <h1 className='note-title'>Notes</h1>
                    <form className='form-container' onSubmit={this.onSubmitUser} >
                        <label className='label' >Name</label>
                        <input type="text" className='user-input-container' placeholder='Enter your Name' value={name} onChange={this.handleName} />
                        <label className='label' >Email</label>
                        <input type="text" className='user-input-container' placeholder='Enter your Email' value={email} onChange={this.handleEmail} />
                        <label className='label' >Password</label>
                        <input type="password" className='user-input-container' placeholder='Enter your Password' value={password} onChange={this.handlePassword} />
                        <button type="submit" className='signupBtn'>SignUp</button>
                    </form>
                    <p className='ac-p'>Already have an account?<a href="/login" className='ac-l'>
                        Login
                    </a></p>
                </div>
            </div>
        )
    }
}

export default Signup
