import {Card, CardGrid, Group, Header, PopoutWrapper} from "@vkontakte/vkui";
import {HTMLAttributesWithRootRef} from "@vkontakte/vkui/src/types";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";


export interface BasePopoutWrapperProps extends HTMLAttributesWithRootRef<HTMLDivElement> {
    header?: string
    alignX?: 'left' | 'center' | 'right';
    alignY?: 'top' | 'center' | 'bottom';
    useWrapperClick?: boolean
}

export const BasePopoutWrapper = (
  {
    header,
    alignY = 'center',
    alignX = 'center',
    useWrapperClick = true,
    children,
    ...restProps
  }: BasePopoutWrapperProps) =>
{
    const routeNavigator = useRouteNavigator()

    const onClickPopoutWrapper = () => {
        if (useWrapperClick) {
            void routeNavigator.hidePopout();
        }
    }

    return (
      <PopoutWrapper
        onClick={onClickPopoutWrapper}
        alignX={alignX}
        alignY={alignY}
      >
          <Group mode="card">
              <CardGrid size="l">
                  <Card
                    mode="outline"
                  >
                      <Header
                        mode="primary"
                        multiline={true}
                      >
                          {header}
                      </Header>
                  </Card>
                  <Card
                    mode="outline"
                  >
                      {children}
                  </Card>
              </CardGrid>
          </Group>
      </PopoutWrapper>
    );
}