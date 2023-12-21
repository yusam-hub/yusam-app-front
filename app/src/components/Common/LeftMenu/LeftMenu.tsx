import './LeftMenu.css'
import React, {FC, memo} from "react";
import {
  CellButton,
  Group,
  NavIdProps, useAdaptivityWithJSMediaQueries,
} from "@vkontakte/vkui";
import {Menu, MenuProps} from "antd";
import { SubMenu, MenuItem } from 'rc-menu';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const LeftMenu: FC<NavIdProps> = memo((props: NavIdProps) => {

  const { isDesktop } = useAdaptivityWithJSMediaQueries()

  const items: MenuItem[] = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Item 1', null, null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
      getItem('Item 2', null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),

    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
  ];

  const onClick: MenuProps['onClick'] = ({ key, keyPath, domEvent } : any) => {
    console.log('click prop', key, keyPath);
  };

  console.log("test")
  return (
    <Group className="LeftMenu" {...props}>

      <Menu onClick={onClick} style={isDesktop ? { width: 285 } : { width: '100%' }} mode="inline" items={items} />

    </Group>
  )
})

LeftMenu.displayName = 'LeftMenu'