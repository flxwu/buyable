import React, { useState } from 'react';

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ImageUploadField = ({ api, label, ...props }) => {
  const [files, setFiles] = useState([]);
  FilePond.setOptions({
    server: {
      process: api,
      fetch: null,
      revert: null
    }
  });

  return (
    <div className="App">
      {/* Pass FilePond properties as attributes */}
      <FilePond
        files={files}
        allowMultiple={true}
        maxFiles={6}
        labelIdle={`<b>${label}</b> <br>Drag & Drop your images or <span class="filepond--label-action"> Browse on your computer</span>`}
        onupdatefiles={fileItems =>
          setFiles(fileItems.map(fileItem => fileItem.file))
        }
      />
    </div>
  );
};

export default ImageUploadField;
