
import { dbService, storageService } from "fbase";
import { useState } from "react";
import {v4 as uuidv4} from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState(null);

    const onSubmit = async (e) => {
        if (nweet === "") {
            return;
        }

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
    return(
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input 
                    onChange={onChange}
                    type={"text"} 
                    placeholder="What`s on your mind?" 
                    maxLength={120}
                    value={nweet}
                    className="factoryInput__input"
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            
            <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input 
                id="attach-file"
                type={'file'} 
                accept={'image/*'} 
                onChange={onFileChange} 
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img 
                        alt={'profile'} 
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
}

export default NweetFactory;