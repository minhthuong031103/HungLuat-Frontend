'use client';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
import { headers } from 'next/headers';
import InfoUser from './info-user';

export const NavbarComponent = () => {
  return (
    <Navbar
      shouldHideOnScroll
      className="bg-gray"
      classNames={{
        wrapper: 'px-4',
      }}
    >
      <NavbarBrand>
        <p className="font-bold text-white uppercase text-lg">
          Hùng Luật Group
        </p>
      </NavbarBrand>

      <NavbarContent justify="end" className="ml-40">
        <NavbarItem>
          <InfoUser />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
