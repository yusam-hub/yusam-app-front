import React from 'react'
import {
  useAdaptivityWithJSMediaQueries,
  PanelHeader,
  Accordion,
  Text,
  Div,
  FormLayout,
  FormLayoutGroup, FormItem, Input, Spacing
} from '@vkontakte/vkui'

import {HTMLAttributesWithRootRef} from "@vkontakte/vkui/src/types";

export const FilterForm = (
  {
    children,
    ...restProps
  }: HTMLAttributesWithRootRef<HTMLDivElement>) =>
{
  const { isDesktop } = useAdaptivityWithJSMediaQueries()
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <Accordion
      expanded={expanded}
      onChange={(e) => (e ? setExpanded(true) : setExpanded(false))}
    >
      <Accordion.Summary>Фильтр</Accordion.Summary>
      <Accordion.Content>
        <Div>
          <FormLayout>
            <FormLayoutGroup mode="vertical">
              <FormItem htmlFor="name" top="Имя">
                <Input id="name"/>
              </FormItem>
              <span style={{width: 20}}></span>
              <FormItem htmlFor="name3" top="Имя3">
                <Input id="name3"/>
              </FormItem>
              <span style={{width: 20}}></span>
              <FormItem htmlFor="name3" top="Имя3">
                <Input id="name3"/>
              </FormItem>
            </FormLayoutGroup>
          </FormLayout>
        </Div>
      </Accordion.Content>
    </Accordion>
  )
}


