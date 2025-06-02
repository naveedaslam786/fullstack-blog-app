import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Input, Form, message } from 'antd';

interface Post {
  id: number;
  title: string;
  body: string;
  image?: string;
}

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/users/1/posts`)
      .then(res => {
        const match = res.data.find((p: Post) => String(p.id) === id);
        if (match) setPost(match);
        else message.error('Post not found');
      })
      .catch(err => console.error(err));
  }, [id]);

  const onFinish = async (values: Post) => {
    try {
      const response = await axios.post(`http://localhost:5000/users/1/post/${id}`, {
        ...post,
        ...values,
      });
      setPost(response.data.post);
      setIsEditing(false);
      message.success('Post updated!');
    } catch (err) {
      console.error(err);
      message.error('Failed to update post.');
    }
  };

  const handleDelete = () => {
    message.success(`Post ${id} deleted (simulated)`);
    navigate('/blogs');
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Post Detail</h2>

      {!isEditing ? (
        <div>
          <img src={post.image || '/home.jpg'} alt="Post" style={{ width: 150, marginBottom: 16 }} />
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <Button type="primary" onClick={() => setIsEditing(true)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={handleDelete}>Delete</Button>
        </div>
      ) : (
        <Form
          initialValues={post}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>
          <Form.Item name="body" label="Body">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">Save</Button>
          <Button style={{ marginLeft: 8 }} onClick={() => setIsEditing(false)}>Cancel</Button>
        </Form>
      )}
    </div>
  );
};

export default PostDetail;
