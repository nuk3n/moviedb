import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './loading-indicator.css';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 40,
    }}
    spin
  />
);
function LoadingIndicator() {
  return <Spin indicator={antIcon} />;
}

export default LoadingIndicator;
