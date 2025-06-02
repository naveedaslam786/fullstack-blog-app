import {
  Layout,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
} from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BellOutlined,
  PlusOutlined,
  FolderOpenOutlined,
  FileAddOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = () => {
  const user = useUser();

  return (
    <Sider
      width={240}
      style={{
        background: '#fff',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '16px',
        borderRight: '1px solid #f0f0f0',
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#397af8',
          padding: '8px 13px',
          height: '6vh',
        }}
      >
        <img src="/qdb-logo.png" alt="Logo" width={60} />
        <span style={{ cursor: 'pointer', fontSize: 24, color: '#fff' }}>
          &#9776;
        </span>
      </div>

      {/* User Info */}
      {user && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Avatar
            size={64}
            src={`https://i.pravatar.cc/150?img=${user.id}`}
            style={{ marginBottom: 8 }}
          />
          <Text style={{ display: 'block',fontWeight:400 }}>
            Hello, <br />
            <strong>{user.name}</strong>  <DownOutlined />
          </Text>
          <Button
            type="primary"
            size="small"
            style={{
              marginTop: 8,
              backgroundColor: '#397af8',
              border: 'none',
              width: '80%',
              height: 32,
              fontWeight:500
            }}
          >
            Live metrics
          </Button>
        </div>
      )}

      {/* Dashboards Section */}
      <div style={{ padding: '16px 16px 0' }}>
        <Text  style={{ fontWeight: '600', fontSize: 14  }}>
          Dashboards
        </Text>
      </div>
      <Menu mode="inline" defaultSelectedKeys={['dashboard']}>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />} style={{ fontWeight: '400' }}>
          <Link to="/">Overview</Link>
        </Menu.Item>
        <Menu.Item key="calendar" icon={<CalendarOutlined />}style={{ fontWeight: '400' }}>
          <Link to="/calendar">Calendar</Link>
        </Menu.Item>
        <Menu.Item key="schedule" icon={<FileAddOutlined />}style={{ fontWeight: '400' }}>
          <Link to="/schedule">Schedule Actions</Link>
        </Menu.Item>
        <Menu.Item key="alarms" icon={<BellOutlined />} style={{ fontWeight: '400' }}>
          <Link to="/alarms">Live Alerts</Link>
        </Menu.Item>
      </Menu>

      <Divider style={{ margin: '8px 0' }} />

      {/* Blogs Section */}
      <div style={{ padding: '0 16px' }}>
        <Text  style={{ fontWeight: '600', fontSize: 14 }}>
          Blogs
        </Text>
      </div>
      <Menu mode="inline">
        <Menu.Item key="blogs-all" icon={<FileTextOutlined />} style={{ fontWeight: '400' }}>
          <Link to="/blogs">All</Link>
        </Menu.Item>
        <Menu.Item key="blogs-latest" icon={<PlusOutlined />} style={{ fontWeight: '400' }}>
          <Link to="/blogs/latest">Latest</Link>
        </Menu.Item>
        <Menu.Item key="blogs-archived" icon={<FolderOpenOutlined />} style={{ fontWeight: '400' }}>
          <Link to="/blogs/archived">Archived</Link>
        </Menu.Item>
      </Menu>



      {/* Documentation */}
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          
          <Text strong>Documentation</Text>
        </span>
        <DownOutlined />
      </div>

      {/* Divider After Documentation */}
      <Divider style={{ margin: '8px 0' }} />

      {/* Reports */}
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    
          <Text strong>Reports</Text>
        </span>
        <DownOutlined />
      </div>

      {/* Divider After Reports */}
      <Divider style={{ margin: '8px 0' }} />

      {/* Need Help? */}
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
     
          <Text strong>Need Help?</Text>
        </span>
        <DownOutlined />
      </div>
      <Divider style={{ margin: '8px 0' }} />
    </Sider>
  );
};

export default Sidebar;
