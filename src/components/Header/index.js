"use client";
import Link from "next/link";
import Logo from "./Logo";
import {
  GithubIcon,
  LinkedinIcon,
  MoonIcon,
  SunIcon,
  EmailIcon,
} from "../Icons";
import siteMetadata from "/src/utils/siteMetaData";
import { useThemeSwitch } from "../Hooks/useThemeSwitch";
import { useState, useEffect } from "react";
import { cx } from "/src/utils";
import supabase from "/src/server/supabaseClient";

const Header = () => {
  const [mode, setMode] = useThemeSwitch();
  const [click, setClick] = useState(false);
  const [visitorCount, setVisitorCount] = useState({
    totalCount: 0,
    todayCount: 0,
  });

  useEffect(() => {
    // 방문자 수 증가 및 가져오기
    const incrementVisitorCount = async () => {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식의 현재 날짜
      const { data, error } = await supabase.rpc("increment_visitor_count", {
        visit_date: today,
      });
      if (error) {
        console.error("Failed to increment visitor count:", error);
      } else if (data && data.length > 0) {
        // 데이터가 배열로 반환되는 경우 첫 번째 요소를 사용
        setVisitorCount({
          totalCount: data[0].totalcount,
          todayCount: data[0].todaycount,
        });
      }
    };

    incrementVisitorCount();
  }, []);

  const toggle = () => {
    setClick(!click);
  };

  return (
    <header className="w-full p-4 px-5 sm:px-10 flex items-center justify-between">
      <Logo />
      <div className="flex items-center">
        <button
          className="inline-block sm:hidden z-50 ml-4"
          onClick={toggle}
          aria-label="Hamburger Menu"
        >
          <div className="w-6 cursor-pointer transition-all ease duration-300">
            <div className="relative">
              <span
                className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
                style={{
                  transform: click
                    ? "rotate(-45deg) translateY(0)"
                    : "rotate(0deg) translateY(6px)",
                }}
              >
                &nbsp;
              </span>
              <span
                className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
                style={{
                  opacity: click ? 0 : 1,
                }}
              >
                &nbsp;
              </span>
              <span
                className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
                style={{
                  transform: click
                    ? "rotate(45deg) translateY(0)"
                    : "rotate(0deg) translateY(-6px)",
                }}
              >
                &nbsp;
              </span>
            </div>
          </div>
        </button>
      </div>

      <nav
        className="w-max py-2 px-4 sm:px-6 border border-solid border-dark rounded-full font-medium capitalize items-center flex sm:hidden flex-col
  fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50
  transition-all ease duration-300"
        style={{
          top: click ? "1rem" : "-10rem",
        }}
      >
        <div className="flex items-center justify-between w-full mt-1">
          <div className="flex items-center">
            <Link href="/" className="mr-2 text-sm">
              Home
            </Link>
            <Link href="/about" className="mx-2 text-sm">
              About
            </Link>
            <a
              href={siteMetadata.github}
              rel="noopener noreferrer"
              className="inline-block w-5 h-5 mx-2"
              aria-label="Check my profile on Github"
              target="_blank"
            >
              <GithubIcon className="hover:scale-125 transition-all ease duration-200" />
            </a>
            <a
              href={siteMetadata.email}
              rel="noopener noreferrer"
              className="inline-block w-5 h-5 mx-2"
              aria-label="Reach out to me via Email"
              target="_blank"
            >
              <EmailIcon className="hover:scale-125 transition-all ease duration-200" />
            </a>
            <a
              href={siteMetadata.linkedin}
              rel="noopener noreferrer"
              className="inline-block w-5 h-5 mx-2"
              aria-label="Reach out to me via LinkedIn"
              target="_blank"
            >
              <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
            </a>
          </div>
          <div className="ml-2 flex justify-center items-center w-10 h-10">
            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className={cx(
                "w-8 h-8 flex items-center justify-center rounded-full p-2",
                mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
              )}
              aria-label="theme-switcher"
            >
              {mode === "light" ? (
                <MoonIcon className="fill-dark w-5 h-5" />
              ) : (
                <SunIcon className="fill-dark w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full text-center mb-1">
          <span className="text-gray-900 text-sm text-center block font-pretendard font-semibold">
            Total Visitors: {visitorCount.totalCount}
            &nbsp;&nbsp; Today: {visitorCount.todayCount}
          </span>
        </div>
      </nav>

      <nav
        className="w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize items-center hidden sm:flex
  fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50 flex-row justify-between"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-2">
            <Link href="/" className="text-sm">
              Home
            </Link>
            <Link href="/about" className="text-sm">
              About
            </Link>
            <a
              href={siteMetadata.github}
              rel="noopener noreferrer"
              className="inline-block w-5 h-5"
              aria-label="Check my profile on Github"
              target="_blank"
            >
              <GithubIcon className="hover:scale-125 transition-all ease duration-200" />
            </a>
            <a
              href={siteMetadata.email}
              rel="noopener noreferrer"
              className="inline-block w-5 h-5"
              aria-label="Reach out to me via Email"
              target="_blank"
            >
              <EmailIcon className="hover:scale-125 transition-all ease duration-200" />
            </a>
            <a
              href={siteMetadata.linkedin}
              rel="noopener noreferrer"
              className="inline-block w-5 h-5"
              aria-label="Reach out to me via LinkedIn"
              target="_blank"
            >
              <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
            </a>
          </div>
          <div className="text-gray-900 text-center">
            <span className="block text-m font-pretendard font-semibold">
              Total Visitors: {visitorCount.totalCount}&nbsp;&nbsp;&nbsp; Today:{" "}
              {visitorCount.todayCount}
            </span>
          </div>
        </div>
        <div className="ml-2 flex justify-center items-center w-16 h-16">
          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className={cx(
              "w-10 h-10 flex items-center justify-center rounded-full p-2",
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            )}
            aria-label="theme-switcher"
          >
            {mode === "light" ? (
              <MoonIcon className="fill-dark w-6 h-6" />
            ) : (
              <SunIcon className="fill-dark w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
