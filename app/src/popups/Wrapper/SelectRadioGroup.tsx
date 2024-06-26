import {
    FormItem,
    FormLayout,
    Radio,
    RadioGroup,
} from "@vkontakte/vkui";
import {BasePopoutWrapper, BasePopoutWrapperPropsInterface} from "./BasePopoutWrapper";
import {useTranslation} from "react-i18next";
import {AnyFunction} from "@vkontakte/vkui/src/types";

export interface SelectRadioGroupItemInterface {
    id: string,
    title: string,
    description?: string,
    defaultChecked?: boolean
}
export interface SelectRadioGroupPropsInterface extends BasePopoutWrapperPropsInterface {
    radioItems: SelectRadioGroupItemInterface[],
    onSelectValue: AnyFunction
}
export const SelectRadioGroup = (
  {
    onSelectValue,
    radioItems,
    ...restProps
  }: SelectRadioGroupPropsInterface) =>
{
    const { t} = useTranslation();

    const radioClickHandler = (value: string) => {
        onSelectValue(value);
    }

    return (
      <BasePopoutWrapper
        {...restProps}
        header={t('MESSAGE_HEADER_SELECT')}
        useWrapperClick={false}
      >
          <FormLayout>
              <FormItem>
                  <RadioGroup>
                      {
                          radioItems.map((item) => {
                              return (
                                <Radio
                                  key={item.id}
                                  name="selectRadio"
                                  value={item.id}
                                  disabled={false}
                                  defaultChecked={item?.defaultChecked}
                                  description={item?.description}
                                  onClick={(event) => {
                                      radioClickHandler(event.currentTarget.value);
                                  }}
                                >
                                    {item.title}
                                </Radio>
                              )
                          })
                      }
                  </RadioGroup>
              </FormItem>
          </FormLayout>
      </BasePopoutWrapper>
    );
}