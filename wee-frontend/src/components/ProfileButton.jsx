/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const ProfileButton = ({ isLoggedIn, onLoginClick, onLogout }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const menu = document.getElementById('profile-menu');
    if (menu) {
      menu.classList.toggle('show');
    }
  };

  return (
    <StyledProfileButton>
      {isLoggedIn ? (
        <>
          <img src='/user-icon.png' alt='User Profile' onClick={handleProfileClick} />
          <ProfileMenu id='profile-menu'>
            <li
              onClick={() => {
                navigate('/');
              }}
            >
              홈으로
            </li>
            <li
              onClick={() => {
                navigate('/chat');
              }}
            >
              상담하기
            </li>
            <li onClick={onLogout}>로그아웃</li>
          </ProfileMenu>
        </>
      ) : (
        <button className='header-login' onClick={onLoginClick}>
          로그인
        </button>
      )}
    </StyledProfileButton>
  );
};

const showMenuAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const hideMenuAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const ProfileMenu = styled.ul`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  list-style: none;
  padding: 10px 0;
  opacity: 0;
  transform: translateY(-10px);
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  &.show {
    animation-name: ${showMenuAnimation};
    opacity: 1;
    transform: translateY(0);
  }
  &.hide {
    animation-name: ${hideMenuAnimation};
    opacity: 0;
    transform: translateY(-10px);
  }
  li {
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
    a {
      text-decoration: none;
      color: #333;
    }
  }
`;

const StyledProfileButton = styled.div`
  position: relative;
  cursor: pointer;
  width: auto;
  height: 36px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    &:hover,
    &:focus {
      filter: brightness(0.9);
    }
  }
`;

export default ProfileButton;
