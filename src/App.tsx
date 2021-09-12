import { FC } from 'react';
import Code from '~/components/code.component';
import Detail from '~/components/detail.component';
import FileUpload from '~/components/file-upload.component';
import List from '~/components/list.component';
import { StoreProvider } from '~/store/provider.store';

const App: FC = () => {
  return (
    <StoreProvider>
      <div className="max-w-7xl m-auto mt-4">
        <FileUpload></FileUpload>
        <Code></Code>
        <List></List>
        <Detail></Detail>
      </div>
    </StoreProvider>
  );
};

export default App;
