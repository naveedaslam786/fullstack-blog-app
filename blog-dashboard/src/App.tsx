import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import AppRoutes from './routes/AppRoutes';
import { GlobalStyle } from './styles/GlobalStyle';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <HeaderBar />
          <Content style={{ padding: '24px' }}>
            <AppRoutes />
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
