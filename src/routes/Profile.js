import { authService } from "fbase";

const Profile = () => {

    const onClickLogout = () => {
        authService.signOut();
    }

    return (
        <>
            <button onClick={onClickLogout} >Log out</button>
        </>
    )
}
export default Profile;