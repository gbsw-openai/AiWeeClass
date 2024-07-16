import { useState } from 'react';
import styled from 'styled-components';
import chatInputBtn from '../assets/chat-inputbtn.png';
import smile from '../assets/smileface.png';
import OpenAI from 'openai';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { deleteCookie, getCookie } from '../services/cookieUtils';
import LoginModal from '../components/LoginModal';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie('accessToken'));
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAnimating, setAnimating] = useState(false);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const sendMessage = async () => {
    const newUserMessage = {
      sender: 'user',
      text: question,
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    try {
      setQuestion('');
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              '당신은 한국어만 사용할 수 있습니다. 당신은 학생들을 위한 심리 안정 상담원입니다. 학생들이 자신의 친구관계나 진로, 학교 적응 및 심리·정서적 안정을 위한 개인상담, 자존감 향상 등 고민을 털어놓을때 당신은 그들을 누구보다 아끼고 존중하며 달래주어야합니다. 만약 사용자가 이와 관계없는 가식적인 이야기를 할 경우 그 이야기를 이어나가지 않고 거부의사를 표현하며 심리상담 얘기를 이어가주세요.',
          },
          { role: 'user', content: question },
        ],
      });

      const aiMessage = {
        sender: 'ai',
        text: response.choices[0].message.content,
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openLoginModal = () => {
    setAnimating(false);
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setAnimating(true);
    setLoginModalOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('로그아웃 완료');
    deleteCookie('accessToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleLoginButtonClick = () => {
    openLoginModal();
  };

  return (
    <Container>
      <Header onLoginClick={openLoginModal} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <ChatLog>
        {messages.map((msg, index) => (
          <UserMessage sender={msg.sender} key={index}>
            <img src={smile} alt='' />
            {msg.sender === 'user'}
            <Message sender={msg.sender}>{msg.text}</Message>
          </UserMessage>
        ))}
      </ChatLog>
      {!isLoggedIn && (
        <DisabledMessage>
          로그인 후 이용하실 수 있습니다.
          <DisabledButton onClick={handleLoginButtonClick}>로그인하기</DisabledButton>
        </DisabledMessage>
      )}
      {isLoggedIn && (
        <StyledInput>
          <input
            type='text'
            placeholder='고민을 자유롭게 얘기해주세요.'
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
          />
          <img src={chatInputBtn} alt='' className='chat-input-btn' onClick={sendMessage} />
        </StyledInput>
      )}
      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onLoginSuccess={handleLoginSuccess}
          className={isAnimating ? 'fade-out' : ''}
        />
      )}
    </Container>
  );
};
const DisabledMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.8rem;
  font-weight: bold;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const DisabledButton = styled.button`
  border-radius: 10px;
  width: 400px;
  height: 50px;
  font-size: 1.2rem;
  color: #fff;
  font-weight: 500;
  background-color: #8161df;
`;

const ChatLog = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  border-radius: 10px;
  padding: 0 20px;
  padding-top: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  gap: 20px;
`;

const UserMessage = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: ${({ sender }) => (sender === 'user' ? 'flex-end' : 'flex-start')};
  img {
    display: ${({ sender }) => (sender === 'ai' ? 'block' : 'none')};
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;

const Message = styled.span`
  display: inline-block;
  min-width: 60px;
  text-align: left;
  position: relative;
  padding: 10px 15px;
  color: ${({ sender }) => (sender === 'user' ? '#fff' : '#000')};
  background-color: ${({ sender }) => (sender === 'user' ? '#8161df' : '#fff')};
  box-shadow: rgba(115, 90, 186, 0.1) 0px 4px 10px;
  border-radius: 15px;
  margin: 5px;
  max-width: 80%;
  line-height: 25px;
  font-size: 1rem;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f6f4fc;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.div`
  position: fixed;
  bottom: 0;
  margin-bottom: 40px;
  width: 1000px;
  height: 60px;
  background-color: #fff;
  border: 2px solid #8161df;
  border-radius: 999px;
  padding-left: 20px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  input {
    width: 90%;
    height: 100%;
    padding-left: 20px;
  }
  .chat-input-btn {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    transition: all 0.2s ease;
    &:hover {
      filter: brightness(0.9);
      transform: scale(1.01);
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 1080px) {
    width: 90%;
  }
`;

export default Chat;
