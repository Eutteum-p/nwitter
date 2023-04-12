import { authService, firebaseInstance } from "fbase";
import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {target: {name, value}} = e;
        
        if(name === 'email'){
            setEmail(value);

        } else if(name==='password') {
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            let data;
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch(e){
            console.log(e);
            setError(e.message);
        }
    }
    
    const toggleAccount = () => setNewAccount((prev)=>!prev);

    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider;
        if(name==='google'){
            provider = new firebaseInstance.auth.GoogleAuthProvider();

        }else if(name ==='github'){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name={'email'}
                    type={'text'}
                    placeholder={'Email'} 
                    required
                    value={email}
                    onChange={onChange}
                />
                <input 
                    name={'password'}
                    type={'password'} 
                    placeholder={'Password'} 
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type={'submit'} value={newAccount ? 'create account' : 'Login'} />
                <span onClick={toggleAccount} > {newAccount ? "sign in" : "create"}</span>
                <p>
                    {error}
                </p>
            </form>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with google</button>
                <button name="github" onClick={onSocialClick}>Continue with github</button>
            </div>
        </div>
    )
}

export default Auth;