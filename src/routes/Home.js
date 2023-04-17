import { useEffect, useState } from "react";
import { dbService } from "fbase";
import Nweet from "component/Nweet";

import NweetFactory from "component/NweetFactory";

const Home = ({userObj}) => {
    
    const [nweets, setNweets] = useState([]);
    
    // const getNweets = async () => {
    //     const nweets = await dbService.collection("nweet").get();
    //     nweets.forEach((doc)=>{
    //         const nweetObj = {
    //             ...doc.data(),
    //             id: doc.id,
    //             createId: userObj.uid,
    //         };
    //         setNweets((prev) => [nweetObj, ...prev]);
    //     });
    // }

    useEffect(()=>{
        //getNweets();
        dbService.collection("nweet").onSnapshot((snapshot)=>{
            const nweetArr = snapshot.docs.map((doc)=>({
                id: doc.id, 
                ...doc.data(),
            }));
            setNweets(nweetArr);
        })
    },[]);

    return (
        <div className="container">
            <NweetFactory userObj = {userObj}/>
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet)=>(
                    <Nweet 
                        nweet={nweet}
                        key={nweet.id}
                        isOwner={nweet.createId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;