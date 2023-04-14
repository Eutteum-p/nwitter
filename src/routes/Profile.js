import { authService } from "fbase";

const Profile = ({userObj}) => {

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