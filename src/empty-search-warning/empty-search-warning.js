import { Alert, Space } from 'antd';
import './empty-search-warning.css';

function EmptySearchWarning() {
  return (
    <Space className="emptySearchWarning" direction="vertical">
      <Alert message="No results! Let`s try another one." type="warning" showIcon closable />
    </Space>
  );
}
export default EmptySearchWarning;
