import {
  Layout,
  Input,
  Avatar,
  Badge,
  Button,
  Dropdown,
  Menu,
} from "antd";
import {
  BellOutlined,
  PlusOutlined,
  UserOutlined,
  DownOutlined,
  SearchOutlined,
  MailOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { useUser } from "../hooks/useUser";

const { Header } = Layout;

const HeaderBar = () => {
  const user = useUser();

  const menu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  );

  // avatar image logic — ONLY set src when user is defined to avoid mismatch
  const avatarContent = user?.id ? (
    <Avatar
      size="large"
      src={`https://i.pravatar.cc/150?img=${user.id}`}
    />
  ) : (
    <Avatar size="large" icon={<UserOutlined />} />
  );

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
      }}
    >
      <Input
        placeholder="Type to search..."
        allowClear
        prefix={<SearchOutlined style={{ color: "#aaa" }} />}
        style={{ width: 250 }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          height: "100%",
        }}
      >
        <Button
          icon={<PlusOutlined />}
          type="text"
          style={{
            display: "flex",
            alignItems: "center",
            padding: 0,
            height: "auto",
          }}
        >
          Add
        </Button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "4px",
          }}
        >
          <Badge count={5}>
            <BellOutlined style={{ fontSize: 20 }} />
          </Badge>

          <Badge count={2} style={{ backgroundColor: "#b1c4ec" }}>
            <MailOutlined style={{ fontSize: 20 }} />
          </Badge>

          <Badge count={5} style={{ backgroundColor: "#b1c4ec" }}>
            <ProductOutlined style={{ fontSize: 20 }} />
          </Badge>
        </div>

        <Dropdown overlay={menu}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {avatarContent}
            <DownOutlined style={{ fontSize: 12, marginLeft: 4 }} />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderBar;
