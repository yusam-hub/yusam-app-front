import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {
    Button,
    ButtonGroup,
    Card,
    CardGrid,
    FormItem,
    FormLayout,
    Group,
    Header,
    PopoutWrapper, Radio, RadioGroup, RadioProps,
    SimpleCell,
    Spacing
} from "@vkontakte/vkui";
import {BasePopoutWrapper, BasePopoutWrapperProps} from "./BasePopoutWrapper";
import {useTranslation} from "react-i18next";
import i18n from "../../i18n";
import {AnyFunction} from "@vkontakte/vkui/src/types";

export interface SelectRadioGroupProps extends BasePopoutWrapperProps {
    buttonPositiveText?: string,
    buttonNegativeText?: string,
    onSelect: AnyFunction
}
export const SelectRadioGroup = (
  {
    buttonPositiveText = i18n.t('BUTTON.OK'),
    buttonNegativeText = i18n.t('BUTTON.CANCEL'),
      onSelect,
    ...restProps
  }: SelectRadioGroupProps) =>
{
    const routeNavigator = useRouteNavigator()
    const { t} = useTranslation();

    const radioClickHandler = (value: string) => {
        console.log("event.name", value);
        onSelect(value);
    }
    return (
      <BasePopoutWrapper
        {...restProps}
        header={t('MESSAGE.HEADER_SELECT')}
        useWrapperClick={false}
      >
          <FormLayout>
              <FormItem>
                  <Spacing size={10}/>
                  <RadioGroup>
                      <Radio
                         name="selectRadio"
                         value="title1"
                         disabled={false}
                         defaultChecked={false}
                         description="Description 1"
                         onClick={(event) => {
                             radioClickHandler(event.currentTarget.value);
                         }}
                      >
                          Title 1
                      </Radio>
                      <Radio
                        name="selectRadio"
                        value="title2"
                        disabled={false}
                        defaultChecked={false}
                        description="Description 2"
                        onClick={(event) => {
                            radioClickHandler(event.currentTarget.value);
                        }}
                      >
                          Title 2
                      </Radio>
                  </RadioGroup>
                  <Spacing size={10}/>
              </FormItem>
          </FormLayout>
      </BasePopoutWrapper>
    );
}