import * as React from "react";
import {Card, CardGrid, PopoutWrapper, Spinner} from "@vkontakte/vkui";
import {CardLoading} from "../components/Common/CardLoading/CardLoading";

export const SpinnerPopoutWrapper = () => {
  return (
    <PopoutWrapper>
      <CardLoading/>
    </PopoutWrapper>
  );
};