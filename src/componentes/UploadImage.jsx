import React, { useRef } from 'react';
import { getDownloadURL, uploadBytesResumable, ref as refStorage } from 'firebase/storage';
import { storage } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileImage, editUser, setSpinner } from '../actions';
import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';


const Uploadimage = (props) => {

    const inputFileRef = useRef();
    const uploadButton = useRef();
    const { profileImage } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleBtnClick = () => {
        inputFileRef.current.click();
    }

    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    }

    const uploadFiles = (file) => {
        if (!file) return;
        const storageRef = refStorage(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => { },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        dispatch(setProfileImage(url));
                        const newImage = {
                            ...props.user,
                            image: url
                        }
                        dispatch(editUser(props.user.id, newImage));
                        dispatch(setSpinner());
                    }
                    )
            }
        )
    };

    function handelFileChange(e) {
        dispatch(setSpinner());
        uploadButton.current.click();
    }

    return (
        <div>
            <div className='imageProfileContainer'>
                <div className="imageCircle">
                    {props.image ? <img className="imageCircle" src={profileImage} alt="imagen de silueta" /> : <img className="imageCircle" src={props.user.image} alt="imagen de silueta" />}
                    <div className='buttonProfileContainer'>
                    <Button
                        variant="error"
                        startIcon={<UploadIcon />}
                        onClick={handleBtnClick}
                    />
                    </div>
                   
                </div>
            </div>

            <form onSubmit={formHandler}>
                <input className="avatarInput" type="file" accept="image/png,image/jpeg" ref={inputFileRef}
                    onChange={(e) => { handelFileChange(e) }} />
                <button className="avatarInput" type='submit' ref={uploadButton}>Upload</button>
            </form>
        </div>
    );
}

export default Uploadimage;
