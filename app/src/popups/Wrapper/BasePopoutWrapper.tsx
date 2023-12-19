import {Card, CardGrid, Group, Header, PanelHeader, PopoutWrapper, Spacing} from "@vkontakte/vkui";
import {HTMLAttributesWithRootRef} from "@vkontakte/vkui/src/types";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";


export interface BasePopoutWrapperPropsInterface extends HTMLAttributesWithRootRef<HTMLDivElement> {
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
  }: BasePopoutWrapperPropsInterface) =>
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
          <Card mode="outline"

          >
              {/*<Spacing size={15} />*/}
              <CardGrid
                size="l"
                style={{margin:"15px"}}
              >
                  <Card
                    mode="shadow"
                    style={{ backgroundColor:'lightgrey'}}
                  >

                      <Header
                        mode="primary"
                        multiline={true}
                      >
                          <div style={{color: 'black'}}>{header}</div>
                      </Header>
                  </Card>
                  <Card
                    mode="outline"
                  >
                      {children}
                  </Card>
              </CardGrid>
              {/*<Spacing size={15} />*/}
          </Card>
      </PopoutWrapper>
    );
}