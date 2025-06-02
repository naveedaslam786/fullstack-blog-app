import { useEffect, useState } from 'react';
import { Card, Tabs, List, Typography, Pagination, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { TabPane } = Tabs;
const { Title, Text, Link } = Typography;
const { Option } = Select;

interface Post {
  id: number;
  title: string;
  body: string;
  date?: string;
  author?: string;
  image?: string;
}

const Blogs = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState<string | undefined>();
  const pageSize = 4;
  const navigate = useNavigate();

  // Helper function to map title to specific image
  const getImageByTitle = (title: string) => {
    switch (title) {
      case "Are you ready to buy a new modern home...":
        return "/home.jpg";
      case "The world is at your door step...":
        return "/door.jpg";
      case "Starting a business in Qatar...":
        return "/business.jpg";
      case "Digitising your access to industrial banking...":
        return "/digital.jpg";
      default:
        return "/images/default.jpg";
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/users/1/posts')
      .then(res => {
        const enriched = res.data.map((p: any, index: number) => ({
          ...p,
          date: 'July 28, 2022',
          author: index % 2 === 0 ? 'Admin' : 'Guest',
          image: getImageByTitle(p.title),
        }));
        setPosts(enriched);
      })
      .catch(err => console.error(err));
  }, []);

  const filteredPosts = () => {
    let data = [...posts];

    if (activeTab === 'latest') data = data.slice(0, 4);
    else if (activeTab === 'archived') data = data.slice(4);

    if (filterValue) {
      data = data.filter(post =>
        post.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        post.author?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return data;
  };

  const paginatedPosts = filteredPosts().slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/circle.png" alt="Blog Icon" width={36} height={36} style={{ marginBottom: 14, objectFit: 'contain' }} />
          <div>
            <Title level={3} style={{ margin: 0 }}>All Blog posts</Title>
            <Text type="secondary">Qatar Development Bank</Text>
          </div>
        </div>

        {/* Custom Dropdown */}
        <Select
          placeholder="Filter/Sortby"
          onChange={(value) => {
            setFilterValue(value);
            setCurrentPage(1);
          }}
          style={{
            width: 140,
            border: '1px solid #d9d9d9',
            borderRadius: 8,
            paddingLeft: 8,
            flexDirection: "row-reverse"
          }}
          suffixIcon={<DownOutlined style={{ fontSize: 12, color: '#555' }} />}
          bordered={false}
          allowClear
        >
          <Option value="archived">All</Option>
          <Option value="latest">Latest</Option>
          <Option value="archived">Archived</Option>
        </Select>
      </div>

      {/* Card with Tabs */}
      <Card>
        <Tabs
          defaultActiveKey="all"
          onChange={(key) => {
            setActiveTab(key);
            setCurrentPage(1);
          }}
        >
          <TabPane tab="All Posts" key="all">
            <BlogList posts={paginatedPosts} navigate={navigate} />
          </TabPane>
          <TabPane tab="Latest Posts" key="latest">
            <BlogList posts={paginatedPosts} navigate={navigate} />
          </TabPane>
          <TabPane tab="Archived" key="archived">
            <BlogList posts={paginatedPosts} navigate={navigate} />
          </TabPane>
        </Tabs>

        {/* Centered Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredPosts().length}
            onChange={page => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </Card>
    </div>
  );
};

const BlogList = ({ posts, navigate }: { posts: Post[]; navigate: any }) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={posts}
      renderItem={post => (
        <List.Item key={post.id} style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}  onClick={() => navigate(`/posts/${post.id}`)}>
          
          <div style={{ display: 'flex', gap: 16 }}>
            <img
              src={post.image || '/images/default.jpg'}
              alt="Post Thumbnail"
              style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title level={5} style={{ margin: 0 }}>{post.title}</Title>
                <Text type="secondary">{post.date}</Text>
              </div>
              <Text>{post.body.substring(0, 100)}...</Text>
              <div>
                <Link>Read more</Link>
              </div>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default Blogs;
