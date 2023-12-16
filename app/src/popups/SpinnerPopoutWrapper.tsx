import * as React from "react";
import {Card, PopoutWrapper, Spinner} from "@vkontakte/vkui";

export const SpinnerPopoutWrapper = () => {
  return (
    <PopoutWrapper>
      <Card
        mode="outline-tint"
      >
        <div style={{ height: 100, width: 100 }}>
          <Spinner size="large" />
        </div>
      </Card>
    </PopoutWrapper>
  );
};