import './LeftMenu.css'
import React, {FC, memo} from "react";
import {
  Accordion,
  ActionSheet,
  ActionSheetItem,
  Button,
  CellButton,
  Group,
  Header, MiniInfoCell,
  NavIdProps,
  Panel,
  SimpleCell, Spacing
} from "@vkontakte/vkui";
import {Icon20MessageOutline, Icon20WorkOutline} from "@vkontakte/icons";

/** Блок для отображения сетки товаров */
export const LeftMenu: FC<NavIdProps> = memo((props: NavIdProps) => {

  const data: any[] = [];

  for(let i=1; i <= 100; i++) {
    data.push({
      id: 'id_' + i,
      title: 'Left Menu ' + i
    })
  }

  return (
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
  )
})

LeftMenu.displayName = 'LeftMenu'