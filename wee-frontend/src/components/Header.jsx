import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userImg from '/user-img.png';

// eslint-disable-next-line react/prop-types
const Header = ({ onLoginClick, isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <div className='inner'>
        <HeaderContainer>
          <span className='header-logo' onClick={() => navigate('/')}>
            <img src='src\assets\header-logo.svg' alt='' />
            <h3>AI 위클래스</h3>
          </span>
          <span className='header-nav'>
            <span className='header-nav-introduce' onClick={() => navigate('/')}>
              서비스소개
            </span>
            {isLoggedIn ? (
              <UserButton onClick={() => navigate('/profile')}>
                {/* 유저 이미지 및 이름 표시 */}
                <UserImage src={userImg} />
              </UserButton>
            ) : (
              <button className='header-login' onClick={onLoginClick}>
                로그인
              </button>
            )}
          </span>
        </HeaderContainer>
      </div>
    </StyledHeader>
  );
};

const HeaderContainer = styled.div`
  * {
    white-space: nowrap;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-nav {
    display: flex;
    align-items: center;
    gap: 30px;
    span {
      font-weight: 400;
      font-size: 14px;
      &:hover {
        cursor: pointer;
      }
    }
    button {
      width: 80px;
      height: 28px;
      background-color: #8161df;
      color: #fff;
      border-radius: 5px;
      font-weight: 500;
      font-size: 12px;
    }
  }
  .header-logo {
    display: flex;
    gap: 10px;
    &:hover {
      cursor: pointer;
    }
    h3 {
      font-weight: 800;
      color: #8161df;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  z-index: 50;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid rgb(238, 238, 238);
  box-shadow: rgba(0, 0, 0, 0.08) 0px -2px 16px;
`;

const UserButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export default Header;
