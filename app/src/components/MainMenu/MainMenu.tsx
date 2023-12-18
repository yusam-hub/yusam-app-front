import React, { FC, memo, useCallback, useRef } from 'react'


import './MainMenu.css'
import {
  Button,
  ButtonGroup,
  HorizontalCell,
  HorizontalScroll,
  PanelHeader, Separator,
  useAdaptivityWithJSMediaQueries
} from "@vkontakte/vkui";
import {useAppSelector} from "../../store";
import {selectShopName} from "../../store/shop.reducer";
import {Icon24Attach} from "@vkontakte/icons";

export const MainMenu: FC = memo(() => {
  const shopName = useAppSelector(selectShopName)
  const { isDesktop } = useAdaptivityWithJSMediaQueries()
  return (
    <>
      <div className="MainMenu">
        {!isDesktop &&
          <PanelHeader separator={false}>MainMenu {shopName}</PanelHeader>
        }
        <HorizontalScroll>
          <div style={{ display: 'flex' }}>
            <HorizontalCell size="m">
              <Button size="m" appearance="accent" mode="tertiary" before={<Icon24Attach />}>
                Menu 1
              </Button>
            </HorizontalCell>
            <HorizontalCell size="m">
              <Button size="m" appearance="accent" mode="tertiary" before={<Icon24Attach />}>
                Menu 2
              </Button>
            </HorizontalCell>
            <HorizontalCell size="m">
              <Button size="m" appearance="accent" mode="tertiary" before={<Icon24Attach />}>
                Menu 3
              </Button>
            </HorizontalCell>
            <HorizontalCell size="m">
              <Button size="m" appearance="accent" mode="tertiary" before={<Icon24Attach />}>
                Menu 4
              </Button>
            </HorizontalCell>
            <HorizontalCell size="m">
              <Button size="m" appearance="accent" mode="tertiary" before={<Icon24Attach />}>
                Menu 5
              </Button>
            </HorizontalCell>
            <HorizontalCell size="m">
              <Button size="m" appearance="accent" mode="tertiary" before={<Icon24Attach />}>
                Menu 6
              </Button>
            </HorizontalCell>
            <HorizontalCell size="m">
              <Button size="m" appearance="accent" mode="tertiary" before={<Icon24Attach />}>
                Menu 7
              </Button>
            </HorizontalCell>
            <HorizontalCell size="m">
              <Button size="m" appearance="accent" mode="tertiary" before={<Icon24Attach />}>
                Menu 8
              </Button>
            </HorizontalCell>
            <HorizontalCell size="m">
              <Button size="m" appearance="accent" mode="tertiary" before={<Icon24Attach />}>
                Menu 9
              </Button>
            </HorizontalCell>
            <HorizontalCell size="m">
              <Button size="m" appearance="accent" mode="tertiary" before={<Icon24Attach />}>
                Menu 10
              </Button>
            </HorizontalCell>
            <HorizontalCell size="m">
              <Button size="m" appearance="accent" mode="tertiary" before={<Icon24Attach />}>
                Menu 11
              </Button>
            </HorizontalCell>
            <HorizontalCell size="m">
              <Button size="m" appearance="accent" mode="tertiary" before={<Icon24Attach />}>
                Menu 12
              </Button>
            </HorizontalCell>
          </div>
        </HorizontalScroll>
        <Separator/>
      </div>
    </>
  )
})

MainMenu.displayName = 'MainMenu'
