'use client'
import { Input, Link, Navbar, NavbarContent, NavbarBrand } from "@nextui-org/react";
import React from "react";
import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { SupportIcon } from "../icons/navbar/support-icon";
import { SearchIcon } from "../icons/searchicon";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { AcmeLogo } from "../icons/acmelogo";


interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
  <Navbar
    isBordered
    className="w-full"
    classNames={{
      wrapper: "w-full max-w-full",
    }}
  >
    {/* Logo and Text on the Left */}
    <NavbarContent justify="start">
      <NavbarBrand className="mr-4 flex items-center">
        <AcmeLogo />
        <p className="ml-1 hidden sm:block font-bold text-inherit"> Hùng Luật Group</p>
      </NavbarBrand>
    </NavbarContent>

    {/* Search Bar in the Center */}
    <NavbarContent as="div" className="items-center ">
      <Input
        startContent={<SearchIcon />}
        
        className="w-full"
        classNames={{
          mainWrapper: "w-full",
          input: "w-full",
          inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Tìm kiếm"
      />
    </NavbarContent>

    {/* Avatar on the Right */}
    <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
    
            <UserDropdown />
    </NavbarContent>
  </Navbar>
  {children}
</div>

  );
};



