'use client';

import { CommonSvg } from '@/assets/CommonSvg';
import React from 'react';
import { useSidebarContext } from '../layout/layout-context';
import { ScrollArea } from '../ui/scroll-area';
import { CollapseItems } from './collapse-items';
import { Sidebar } from './sidebar.styles';
export const SidebarWrapper = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div className="h-full z-[10] sticky top-0 ">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <ScrollArea
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>{CommonSvg.dashicon()}</div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <CollapseItems
              icon={CommonSvg.manage()}
              items={[
                { name: 'Quản lý căn hộ', link: '/' },
                { name: 'Quản lý phòng', link: '/rooms' },
                { name: 'Danh sách khách trọ', link: '/customers' },
                { name: 'Quản lý biểu mẫu', link: '/forms' },
              ]}
              title="Quản lý phòng"
            />
            <CollapseItems
              icon={CommonSvg.dashboard()}
              items={[
                { name: 'Quản lý thu', link: '/income' },
                { name: 'Quản lý chi', link: '/pay' },
                { name: 'Thống kê', link: '/5' },
              ]}
              title="Thống kê"
            />
            <CollapseItems
              icon={CommonSvg.stack()}
              items={[{ name: 'Quản lý nhân viên', link: '/users' }]}
              title="Quản lý hệ thống"
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
