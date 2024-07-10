import styled from 'styled-components';
import chatLogo from '../assets/chat-logo.png';

const Chat = () => {
  return (
    <Container>
      <SectionLeft>
        <img src={chatLogo} width={'285px'} height={'164px'} alt='' />
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
  padding-top: 70px;
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const SectionRight = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #f6f4fc;
`;

export default Chat;
