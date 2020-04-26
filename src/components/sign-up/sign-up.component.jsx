import React from 'react';
import FormInput from '../form-input/form-input.component';

import {auth, createUserProfileDocument} from '../../firebase/firebase.util';

import './sign-up.styles.scss';
import CustomButon from '../custom-button/custom-button.component';

class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            displayName: '',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();

        const {displayName,email,password,confirmPassword} = this.state;

        if(password !== confirmPassword ){
            alert('Password dont match');
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password);

            await createUserProfileDocument(user,{displayName});

            this.setState({
                displayName: '',
                email:'',
                password:'',
                confirmPassword:''

            })
        }catch(error){
            console.log(error);
        }
    }

    handleChange = e =>{
        const {name, value} = e.target;

        this.setState({ [name]: value })
    }

    render(){
        const {displayName,email,password,confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I don't have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    label='name'
                    required>

                    </FormInput>
                    
                    <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='email'
                    required>

                    </FormInput>

                    <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    label='password'
                    required>

                    </FormInput>

                    <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label='Confirm Password'
                    required>

                    </FormInput>
                    
                    <CustomButon type='submit'> SIGN UP </CustomButon>
                </form>
            </div>
        )
    }
}

export default SignUp;