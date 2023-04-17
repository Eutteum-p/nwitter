import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <div className="nweet">
            {editing ? (
                <>
                    <div>
                        <form onSubmit={onSubmit} className="container nweetEdit">
                            <input 
                                value={newNweet} 
                                required 
                                autoFocus
                                onChange={onChange}
                                className="formInput"
                            />
                            <input type={'submit'} value={'Update Nweet'} className="formBtn"/>
                        </form>
                    </div>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                </>
            ) : (
                <div>
                    <h4>{nweet.text}</h4>
                    {nweet.attachmentUrl && (
                        <img src={nweet.attachmentUrl} />
                    )}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </div>
            )
            }
        </div>
    )
}

export default Nweet;