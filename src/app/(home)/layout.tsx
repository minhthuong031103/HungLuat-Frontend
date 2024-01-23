'use client';

import { SidebarWrapper } from '@/components/sidebar/sidebar';
import { useUserState } from '@/context/UserProvider';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';

const layout = ({ children }) => {
  const { useCheckNotLoggedIn, loading } = useAuth();
  useCheckNotLoggedIn();
  console.log('🚀 ~ layout ~ loading:', loading);
  if (loading) return null;

  return <section className="flex ">{children}</section>;
};

export default layout;
