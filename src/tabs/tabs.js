import { Tabs } from 'antd';

function TabsBar({ currentTab, onTabChange }) {
  const onChange = (key) => {
    onTabChange(key);
  };
  const items = [
    {
      key: 'search',
      label: 'Search',
    },
    {
      key: 'rated',
      label: 'Rated',
    },
  ];

  return <Tabs defaultActiveKey="search" activeKey={currentTab} items={items} onChange={onChange} />;
}

export default TabsBar;
