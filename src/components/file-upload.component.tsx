import { FC, useState } from 'react';
import { Alert, Uploader } from 'rsuite';
import { FileType } from 'rsuite/lib/Uploader';
import { setItems } from '~/store/actions.store';
import { useStore } from '~/store/provider.store';

const styles = {
  width: '100%',
  height: '100%',
};

const FileUpload: FC = () => {
  const [file, setFile] = useState<FileType | null>(null);
  const [, dispatch] = useStore();

  return (
    <Uploader
      className="w-full mb-3"
      draggable
      multiple={false}
      fileList={file ? [file] : []}
      autoUpload={false}
      fileListVisible={false}
      onChange={async (files) => {
        if (files.length === 0) {
          return;
        }

        debugger;
        const result = (await files[0].blobFile?.text()) || '[]';

        try {
          const json = JSON.parse(result);
          dispatch(setItems(json));
        } catch (e) {
          Alert.error('Invalid JSON.');
          return;
        }

        setFile(null);
      }}
      accept="application/json"
    >
      <div style={styles}>
        Click or Drag files to this area to upload
      </div>
    </Uploader>
  );
};

export default FileUpload;
