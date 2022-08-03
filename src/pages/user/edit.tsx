import Layout from '../../layouts/Layout';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const EditProfile = () => {
    const [userImage, setUserImage] = useState([]);
    const [projectImage, setProjectImage] = useState([]);

    return (
        <div className="mt-[8rem] bg-ourWhite">
            <div>profile edit</div>
        </div>
    );
};

EditProfile.Layout = Layout;
export default EditProfile;
