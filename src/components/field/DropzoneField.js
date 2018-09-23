import React from 'react';
import DropZone from 'react-dropzone';

const renderImagePreview = imageFile => {
    return imageFile.map(({name, preview, size}) => {
        return (<li key="imagePreview">        
            <img
                style={{display:"block", margin:"auto", paddingTop:"10%"}}
                src={preview}
                alt={name}
                height="50px"
                width="50px"
            />
            <span>{name} - {size} bytes</span>
        </li>)
    });
};

export default ({
    handleOnDrop,
    input,
    imageFile,
    label,
    meta: {error, touched}
}) => (
    <div>
        <DropZone
            accept="image/jpeg, image/png, image/gif, image/bmp"
            multiple={ false }
            onDrop={handleOnDrop}
            onChange={file => input.onChange(file)}
        >
        {imageFile && imageFile.length > 0 ? (
            <ul>
                {renderImagePreview(imageFile)}
            </ul>
        ):(
            <div>
                <div><h1>???</h1></div>
                <div>Clik or drag img here</div>
            </div>            
        )}
        </DropZone>
        {touched && error && <div style={{ color: "red" }}>{error}</div>}
    </div>
)