'use client'

import React from 'react'
import { Sidebar } from './sidebar.styles'
import { CollapseItems } from './collapse-items'
import { useSidebarContext } from '../layout/layout-context'
import { ScrollArea } from '../ui/scroll-area'
import { CommonSvg } from '@/assets/CommonSvg'
export const SidebarWrapper = () => {
  const { collapsed, setCollapsed } = useSidebarContext()

  return (
    <div className="h-full z-[10] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <ScrollArea
        className={Sidebar({
          collapsed: collapsed
        })}
      >
        <div className={Sidebar.Header()}>{CommonSvg.dashicon()}</div>
        <div className="flex flex-col justify-between h-full">
          {/* <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={router.pathname === '/'}
              href="/"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={router.pathname === '/accounts'}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={router.pathname === '/payments'}
                title="Payments"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={['Banks Accounts', 'Credit Cards', 'Loans']}
                title="Balances"
              />
              <SidebarItem
                isActive={router.pathname === '/customers'}
                title="Customers"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={router.pathname === '/products'}
                title="Products"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={router.pathname === '/reports'}
                title="Reports"
                icon={<ReportsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={router.pathname === '/developers'}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={router.pathname === '/view'}
                title="View Test Data"
                icon={<ViewIcon />}
              />
              <SidebarItem
                isActive={router.pathname === '/settings'}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={router.pathname === '/changelog'}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div> */}
          <div className={Sidebar.Body()}>
            <CollapseItems
              icon={CommonSvg.manage()}
              items={[
                { name: 'Quản lý căn hộ' },
                { name: 'Quản lý phòng', link: '/1' },
                { name: 'Danh sách khách trọ', link: '/2' },
                { name: 'Quản lý biểu mẫu', link: '/3' }
              ]}
              title="Quản lý phòng"
            />
            <CollapseItems
              icon={CommonSvg.dashboard()}
              items={[
                { name: 'Quản lý chi', link: '/4' },
                { name: 'Thống kê', link: '/5' }
              ]}
              title="Thống kê"
            />
            <CollapseItems
              icon={CommonSvg.stack()}
              items={[]}
              title="Quản lý hệ thống"
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
