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
import siteMetadata from "@/src/utils/siteMetaData";
import { useThemeSwitch } from "../Hooks/useThemeSwitch";
import { useState, useEffect } from "react";
import { cx } from "@/src/utils";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "../../context/AuthContext";

const supabase = createClientComponentClient();

const Header = ({ openLoginModal, openSignupModal }) => {
  const [mode, setMode] = useThemeSwitch();
  const [click, setClick] = useState(false);
  const [nickname, setNickname] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchNickname = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();
        if (error) {
          console.error(error);
        } else {
          setNickname(data.username);
        }
      }
    };

    fetchNickname();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const toggle = () => {
    setClick(!click);
  };

  return (
    <header className="w-full p-4 px-5 sm:px-10 flex items-center justify-between">
      <Logo />
      <div className="flex items-center">
        {user ? (
          <>
            <span className="text-gray-900 dark:text-white mr-4">
              Hello, {nickname}!
            </span>
            <Link
              href="/admin"
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Admin
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 ml-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={openLoginModal}
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Login
            </button>
            <button
              onClick={openSignupModal}
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 ml-4"
            >
              Sign Up
            </button>
          </>
        )}
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
        className="w-max py-2 px-4 sm:px-6 border border-solid border-dark rounded-full font-medium capitalize items-center flex sm:hidden
  fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50
  transition-all ease duration-300"
        style={{
          top: click ? "1rem" : "-5rem",
        }}
      >
        <Link href="/" className="mr-2 text-sm">
          Home
        </Link>
        <Link href="/about" className="mx-2 text-sm">
          About
        </Link>
        <Link href="/contact" className="mx-2 text-sm">
          Contact
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
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={cx(
            "w-5 h-5 ease ml-2 flex items-center justify-center rounded-full p-1",
            mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
          )}
          aria-label="theme-switcher"
        >
          {mode === "light" ? (
            <MoonIcon className={"fill-dark"} />
          ) : (
            <SunIcon className={"fill-dark"} />
          )}
        </button>
      </nav>

      <nav
        className="w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize items-center hidden sm:flex
  fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50"
      >
        <Link href="/" className="mr-4">
          Home
        </Link>
        <Link href="/about" className="mx-4">
          About
        </Link>
        <Link href="/contact" className="mx-4">
          Contact
        </Link>
        <a
          href={siteMetadata.github}
          rel="noopener noreferrer"
          className="inline-block w-6 h-6 mx-4"
          aria-label="Check my profile on Github"
          target="_blank"
        >
          <GithubIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={siteMetadata.email}
          rel="noopener noreferrer"
          className="inline-block w-6 h-6 mx-4"
          aria-label="Reach out to me via Email"
          target="_blank"
        >
          <EmailIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={siteMetadata.linkedin}
          rel="noopener noreferrer"
          className="inline-block w-6 h-6 mx-4"
          aria-label="Reach out to me via Email"
          target="_blank"
        >
          <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={cx(
            "w-6 h-6 ease ml-6 flex items-center justify-center rounded-full p-1",
            mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
          )}
          aria-label="theme-switcher"
        >
          {mode === "light" ? (
            <MoonIcon className={"fill-dark"} />
          ) : (
            <SunIcon className={"fill-dark"} />
          )}
        </button>
      </nav>

      <div className="hidden sm:flex items-center">
        {user ? (
          <>
            <span className="text-gray-900 dark:text-white mr-4">
              Hello, {nickname}!
            </span>
            <Link
              href="/admin"
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Admin
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 ml-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={openLoginModal}
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Login
            </button>
            <button
              onClick={openSignupModal}
              className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 ml-4"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
