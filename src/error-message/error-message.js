import { Alert, Space } from 'antd';
import './error-message.css';

function ErrorMessage({ message }) {
  return (
    <Space
      direction="vertical"
      style={{
        width: '50%',
      }}
    >
      <Alert message="Error" description={message} type="error" showIcon />
    </Space>
  );
}
export default ErrorMessage;