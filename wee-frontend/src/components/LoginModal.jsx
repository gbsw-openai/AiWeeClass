import styled, { keyframes } from 'styled-components';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleModal = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Overlay>
      <ModalContainer style={isLogin ? { height: '380px' } : { height: '480px' }}>
        <h2>{isLogin ? '로그인' : '회원가입'}</h2>
        <form>
          <div className='label'>아이디</div>
          <input type='text' required />
          <div className='label'>비밀번호</div>
          <input type='password' required />
          {!isLogin && (
            <>
              <div className='label'>비밀번호 확인</div>
              <input type='password' required />
            </>
          )}
          <ButtonBox>
            <span onClick={toggleModal}>{isLogin ? '회원가입하기' : '로그인하기'}</span>
            <div className='btn-right'>
              <button type='submit' className='modal-login'>
                {isLogin ? '로그인' : '회원가입'}
              </button>
              <button onClick={onClose} className='modal-close'>
                닫기
              </button>
            </div>
          </ButtonBox>
        </form>
      </ModalContainer>
    </Overlay>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeOut} 0.2s ease-out;
`;

const ModalContainer = styled.div`
  transition: all 0.2s ease-out;
  background: white;
  padding: 20px;
  border-radius: 30px;
  width: 700px;
  height: 450px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.2s ease-out;
  form {
    .label {
      margin-top: 20px;
    }
    input {
      border: 1px solid #e9e9e9;
      background-color: #eee;
      width: 600px;
      height: 50px;
      margin-top: 10px;
      border-radius: 10px;
      &:focus {
        outline: 1.5px solid #8161df;
        background-color: #f1edff;
      }
    }
  }
`;

const ButtonBox = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  span {
    cursor: pointer;
    color: #8161df;
    &:hover {
      text-decoration: underline;
    }
  }
  .btn-right {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  button {
    text-align: center;
    width: 98px;
    height: 40px;
    border-radius: 10px;
    color: #fff;
  }
  .modal-close {
    background-color: #e8e3f8;
    color: #000;
  }
  .modal-login {
    font-weight: 600;
    background-color: #8161df;
  }
`;

export default LoginModal;
