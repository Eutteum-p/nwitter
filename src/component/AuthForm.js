import { authService } from "fbase";
import { useState } from "react";

const AuthForm = () => {

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

    return(<>
        <form onSubmit={onSubmit} className="container">
            <input 
                name={'email'}
                type={'email'}
                placeholder={'Email'} 
                required
                value={email}
                onChange={onChange}
                className="authInput"
            />
            <input 
                name={'password'}
                type={'password'} 
                placeholder={'Password'} 
                required
                value={password}
                onChange={onChange}
                className="authInput"
            />
            <input type={'submit'} value={newAccount ? 'create account' : 'Login'} className="authInput authSubmit" />
            {error && <span className="authError">{error}</span>}
        </form>
        <span onClick={toggleAccount} className="authSwitch"> 
            {newAccount ? "sign in" : "create"}
        </span>
    </>);
}

export default AuthForm;