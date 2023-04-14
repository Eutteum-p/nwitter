import { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import Nweet from "component/Nweet";
import {v4 as uuidv4} from "uuid";

const Home = ({userObj}) => {
    
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState(null);

    const getNweets = async () => {
        const nweets = await dbService.collection("nweet").get();
        nweets.forEach((doc)=>{
            const nweetObj = {
                ...doc.data(),
                id: doc.id,
                createId: userObj.uid,
            };
            setNweets((prev) => [nweetObj, ...prev]);
        });
    }

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
    
    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if(attachment){
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(attachment,"data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createdAt: new Date(),
            createId: userObj.uid,
            attachmentUrl
        }
        await dbService.collection("nweet").add(nweetObj);
        setNweet("");
        setAttachment(null);
    }
    
    const onChange = (e) => {
        const {target:{value}} = e;
        setNweet(value);
    }
    
    const onFileChange = (e) => {
        console.log(e.target);
        const {target:{files}} = e;
        if(files.length < 1) {
            setAttachment(null);
            return;
        }
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = ((finishedEvent)=>{
            const {currentTarget:{result}} = finishedEvent
            setAttachment(result);
        });
        reader.readAsDataURL(file);
        //e.target.files = [];
    }

    const onClearAttachment = () => setAttachment(null);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={onChange}
                    type={"text"} 
                    placeholder="What`s on your mind?" 
                    maxLength={120}
                    value={nweet}
                />
                <input type={'file'} accept={'image/*'} onChange={onFileChange} />
                <input type={'submit'} value={"nweet"}/>
                {attachment && 
                    (
                        <div>
                            <img src={attachment} width={"50px"} height={"50px"}/>
                            <button onClick={onClearAttachment} >Clear</button>
                        </div>
                    )
                }
                
            </form>
            <div>
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