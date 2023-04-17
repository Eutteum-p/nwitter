import { HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "component/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({refreshUser, isLogin, userObj}) => {
    return(
        <Router>
            {isLogin && (<Navigation userObj={userObj}/>)}
            <Switch>
                {isLogin? (
                    <div
                        style={{
                        maxWidth: 890,
                        width: "100%",
                        margin: "0 auto",
                        marginTop: 80,
                        display: "flex",
                        justifyContent: "center",
                        }}
                    >
                        <Route exact path = "/">
                            <Home userObj={userObj}/>
                        </Route>
                        <Route exact path = "/Profile">
                            <Profile refreshUser={refreshUser} userObj={userObj}/>
                        </Route>
                    </div>
                ) : (
                    <>
                        <Route>
                            <Auth exact path = "/"/>
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    )
}

export default AppRouter;