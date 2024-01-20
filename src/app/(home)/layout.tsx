import { NavbarWrapper } from '@/components/navbar/navbar';
import { SidebarWrapper } from '@/components/sidebar/sidebar';
import React from 'react';

const layout = ({ children }) => {
  return (
    <section className="flex">
      <SidebarWrapper />
      <NavbarWrapper>{children}</NavbarWrapper>
    </section>
    
  );
};

export default layout;