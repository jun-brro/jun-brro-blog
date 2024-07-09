"use client";
import { useState } from "react";
import Header from "./Header";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

export default function HeaderWrapper() {
  const [isLogin, setIsLogin] = useState(true); // 로그인 또는 회원가입 폼 제어를 위한 상태
  const [showModal, setShowModal] = useState(false); // 모달 창 표시를 제어하는 상태

  const closeModal = () => {
    setShowModal(false);
  };

  const openLoginModal = () => {
    setIsLogin(true);
    setShowModal(true);
  };

  const openSignupModal = () => {
    setIsLogin(false);
    setShowModal(true);
  };

  return (
    <>
      <Header
        openLoginModal={openLoginModal}
        openSignupModal={openSignupModal}
      />
      {showModal &&
        (isLogin ? (
          <LoginForm setIsLogin={setIsLogin} closeModal={closeModal} />
        ) : (
          <SignupForm setIsLogin={setIsLogin} closeModal={closeModal} />
        ))}
    </>
  );
}
