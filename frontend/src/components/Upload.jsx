import { IKContext, IKUpload } from 'imagekitio-react';
import React from 'react'
import { useRef } from 'react';
import { toast } from 'react-toastify';

const authenticator = async () => {
    try {
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-image-auth`);
        if (!response.ok) {               
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
};

const Upload = ({ setData, setProgress, children, type }) => {

    const uploadBtnRef = useRef(null)

  const onSuccess = (res) => {
    console.log("Upload successful:", res);
    toast.success("Image uploaded successfully");
    setData(res);
  };

  const onError = (err) => {
    console.error("Upload failed:", err);
    toast.error("Image upload failed");
  };

  const onUploadProgress = (progress) => {
    console.log("Upload progress:", progress);
    setProgress(Math.round(progress.loaded / progress.total * 100));
  };

  return (
        <IKContext publicKey={import.meta.env.VITE_public_key} urlEndpoint={import.meta.env.VITE_urlEndpoint} authenticator={authenticator}>
          <IKUpload
            useUniqueFileName
            onSuccess={onSuccess}
            onError={onError}
            onUploadProgress={onUploadProgress}
            className='hidden'
            ref={uploadBtnRef}
            accept={`${type}/*`}
          />

          <div className="cursor-pointer" onClick={()=> uploadBtnRef.current?.click()} >
            {children}
          </div>


        </IKContext>
  )
}

export default Upload