import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({nweet, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweet.text);

    const onDeleteClick = async(e) => {
        const ok = window.confirm("진짜 삭제?");
        if(ok){
            await dbService.doc(`nweet/${nweet.id}`).delete();
            await storageService.refFromURL(nweet.attachmentUrl).delete();
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev);
    
    const onSubmit = (e) => {
        e.preventDefault();
        dbService.doc(`nweet/${nweet.id}`).update({
            text: newNweet
        });
        setEditing(false);
    }
    
    const onChange = (e) => {
        const {
            target: {value},
        } = e;
        setNewNweet(value);
    }

    return (
        <>
            {editing ? 
                <div>
                    <form onSubmit={onSubmit}>
                        <input 
                            value={newNweet} 
                            required 
                            onChange={onChange}
                        />
                        <input type={'submit'} value={'Update Nweet'}/>
                    </form>
                    <button onClick={toggleEditing}>cancle</button>
                </div>
            : 
                <div>
                    <h4>{nweet.text}</h4>
                    {nweet.attachmentUrl && (
                        <img src={nweet.attachmentUrl} width={"50px"} height={"50px"}/>
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </div>
            }
        </>
    )
}

export default Nweet;