import { useState } from 'react';
import styled from 'styled-components';
import chatInputBtn from '../assets/chat-inputbtn.png';
import smile from '../assets/smileface.png';
import headerLogo from '/header-logo.png';
import userImg from '/user-img.png';
import OpenAI from 'openai';

import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const sendMessage = async () => {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You must answer in Korean. You are a communication.' },
          { role: 'user', content: question },
        ],
      });

      setMessages(response.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <ChatHeader>
        <div className='inner'>
          <img
            src={headerLogo}
            alt=''
            className='header-logo'
            onClick={() => {
              navigate('/');
            }}
          />
          <img src={userImg} alt='' className='user-img' />
        </div>
      </ChatHeader>
      <ChatLog>
        {messages.map((msg, index) => (
          // eslint-disable-next-line react/jsx-key
          <UserMessage sender={msg.sender}>
            <img src={smile} alt='' />
            <Message key={index} sender={msg.sender}>
              {msg.text}
            </Message>
          </UserMessage>
        ))}
      </ChatLog>
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
    </Container>
  );
};

const ChatHeader = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  height: 60px;
  width: calc(100% - 40px);
  z-index: 1;
  top: 0;
  * {
    white-space: nowrap;
  }
  background-color: #f6f4fc;
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img.header-logo {
      height: 24px;
      width: auto;
    }
    img.user-img {
      width: 36px;
      height: 36px;
    }
    img:hover {
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 720px) {
    width: 100%;
  }
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
    display: ${({ sender }) => (sender === 'user' ? 'none' : 'block')};
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
    width: 36px;
    height: 36px;
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
