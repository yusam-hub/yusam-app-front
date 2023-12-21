import React from 'react'
import {useAdaptivityWithJSMediaQueries, PanelHeader} from '@vkontakte/vkui'

import {DesktopHeader} from "../DesktopHeader/DesktopHeader";
import {HTMLAttributesWithRootRef} from "@vkontakte/vkui/src/types";

export const CommonHeader = (
  {
    children,
    ...restProps
  }: HTMLAttributesWithRootRef<HTMLDivElement>) =>
{
  const { isDesktop } = useAdaptivityWithJSMediaQueries()

  return (
    <>
      {isDesktop && (
        <DesktopHeader {...restProps}>{children}</DesktopHeader>
      )}
      {!isDesktop && (
        <PanelHeader {...restProps}>{children}</PanelHeader>
      )}
    </>
  )
}


