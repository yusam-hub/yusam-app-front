import './DesktopHeader.css'
import React from "react";
import {
  Header,
  Separator,
  Spacing, useAdaptivityWithJSMediaQueries,
} from "@vkontakte/vkui";
import {HTMLAttributesWithRootRef} from "@vkontakte/vkui/src/types";

export const DesktopHeader = (
  {
    children,
    ...restProps
  }: HTMLAttributesWithRootRef<HTMLDivElement>) =>
{
  return (
    <div className={'DesktopHeader'}>
      <Header size="large">
        <div {...restProps}>
          <span>{children}</span>
        </div>
        <Spacing size={8} />
      </Header>
      <Separator/>
    </div>
  )
}

