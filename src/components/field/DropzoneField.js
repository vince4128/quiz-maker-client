import React from 'react';
import DropZone from 'react-dropzone';

const renderImagePreview = imageFile => {
    return imageFile.map(({name, preview, size}) => {
        return (<li key="imagePreview">        
            <img
                style={{display:"block", margin:"auto"}}
                src={preview}
                alt={name}
                height="auto"
                width="200px"
            />
            <p className="m-dropzone__info">{name} - {size} bytes</p>
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
            className="m-dropzone"
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
            <div className="m-dropzone__tip">
                <h3>Clik or drag img here</h3>
            </div>            
        )}
        </DropZone>
        {touched && error && <div style={{ color: "red" }}>{error}</div>}
    </div>
)