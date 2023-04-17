import { authService } from "fbase";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onClickLogout = () => {
        authService.signOut();
        history.push("/");
        refreshUser();
    }

    // const getMyNweets = async () => {
    //     console.log(userObj.uid)
    //     const nweets = await dbService.collection("nweets").where("createId", "==", userObj.uid).orderBy("createdAt").get();
    //     console.log(nweets.docs);
    // }

    // useEffect(()=>{
    //     getMyNweets();
    // }, []);

    const onChange = (e) => {
        const {target:{value}} = e;
        setNewDisplayName(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    type={'text'} 
                    onChange={onChange}
                    placeholder={'DisplayName'}
                    value = {newDisplayName}
                    className="formInput"
                />
                <input 
                    type={'submit'} 
                    value={'Update Profile'}
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onClickLogout}>
                Log Out
            </span>
        </div>
    )
}
export default Profile;