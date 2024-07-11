import styled from 'styled-components';
import chatLogo from '../assets/chat-logo.png';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <SectionLeft>
        <img
          src={chatLogo}
          width={'285px'}
          height={'164px'}
          alt=''
          onClick={() => {
            navigate('/');
          }}
        />
        <button>+ 새 대화</button>
      </SectionLeft>
      <SectionRight></SectionRight>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const SectionLeft = styled.section`
  width: 300px;
  padding-top: 70px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  img:hover {
    cursor: pointer;
  }
  button {
    width: 223px;
    height: 40px;
    border-radius: 10px;
    background-color: #8161df;
    color: #fff;
    font-weight: 600;
  }
`;
const SectionRight = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #f6f4fc;
`;

export default Chat;
