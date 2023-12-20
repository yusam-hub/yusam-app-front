import './LeftMenu.css'
import React, {FC, memo} from "react";
import {
  Accordion,
  ActionSheet,
  ActionSheetItem,
  Button,
  CellButton,
  Group,
  Header,
  NavIdProps,
  Panel,
  SimpleCell
} from "@vkontakte/vkui";

/** Блок для отображения сетки товаров */
export const LeftMenu: FC<NavIdProps> = memo((props: NavIdProps) => {

  const [openId, setOpenId] = React.useState<any>('test');

  const data = [
    {
      id: 1,
      title: 'Как сменить номер телефона?',
    },
    {
      id: 2,
      title: 'Как изменить пароль?',
    },
    {
      id: 3,
      title: 'Как усилить защиту аккаунта?',
    },
    {
      id: 4,
      title: 'Как сменить номер телефона?',
    },
    {
      id: 5,
      title: 'Как изменить пароль?',
    },
    {
      id: 6,
      title: 'Как усилить защиту аккаунта?',
    },
    {
      id: 7,
      title: 'Как сменить номер телефона?',
    },
    {
      id: 8,
      title: 'Как изменить пароль?',
    },
    {
      id: 9,
      title: 'Как усилить защиту аккаунта?',
    },
    {
      id: 10,
      title: 'Как усилить защиту аккаунта?',
    },
    {
      id: 11,
      title: 'Как усилить защиту аккаунта?',
    },
    {
      id: 12,
      title: 'Как усилить защиту аккаунта?',
    },
    {
      id: 13,
      title: 'Как усилить защиту аккаунта?',
    },
    {
      id: 14,
      title: 'Как усилить защиту аккаунта?',
    },
    {
      id: 15,
      title: 'Как усилить защиту аккаунта?',
    },
  ];

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <Group className="LeftMenu">

        {
          data.map(({ id, title }) => (
            <CellButton
              key={id}
              multiline={true}
              onClick={() => {
                console.log("test")
              }}
            >
              {title}
            </CellButton>
          ))
        }
      </Group>
    </Panel>
  )
})

LeftMenu.displayName = 'LeftMenu'