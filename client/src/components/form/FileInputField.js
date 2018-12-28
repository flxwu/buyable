import React, { useState } from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const FileInputField = ({ label }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const selectedFilesList = () => {
    if (selectedFiles.length > 0) {
      return (
        <div>
          {selectedFiles.map(file => {
            let blobURL = URL.createObjectURL(file);
            return (
              <img
                key={file.name}
                src={blobURL}
                alt={file.name}
                width="100"
                height="100"
              />
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Box align="center">
      <Label htmlFor="file">Choose Images</Label>
      <FileInput
        type="file"
        name="file"
        id="file"
        onChange={evt =>
          setSelectedFiles(
            Array.from(evt.target.files).filter(file =>
              file.name.match(/(jpg)|(png)/)
            )
          )
        }
        multiple
        accept="image/png, image/jpeg"
      />
      {selectedFilesList()}
    </Box>
  );
};

const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const Label = styled.label`
  font-size: 18px;
  display: inline-block;
  background: #7e4ddb;
  border-radius: 18px;
  width: fit-content;
  padding: 4px 22px;
  font-weight: bold;
  color: white;
  border: 2px solid #7e4ddb;

  :hover {
    cursor: pointer;
    box-shadow: 0px 0px 0px 2px #7e4ddb;
  }
`;

export default FileInputField;
