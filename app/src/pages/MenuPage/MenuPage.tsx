import React, {FC, memo} from 'react'
import {Group, ModalCardBase, NavIdProps, Panel, Placeholder, useAdaptivityWithJSMediaQueries} from "@vkontakte/vkui";
import './MenuPage.css'
import {LeftMenu} from "../../components/Common/LeftMenu/LeftMenu";
import {Icon56MentionOutline} from "@vkontakte/icons";

export const MenuPage: FC<NavIdProps> = memo((props: NavIdProps) => {

  const { isDesktop } = useAdaptivityWithJSMediaQueries()

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <Group className="MenuPage">
        {!isDesktop &&
          <LeftMenu/>
        }
        {isDesktop &&
          <Placeholder icon={<Icon56MentionOutline />}>
            Выберите меню слева
          </Placeholder>
        }
      </Group>
    </Panel>
  )
})

MenuPage.displayName = 'MenuPage'