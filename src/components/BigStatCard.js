import React from "react";
import { Text, View, TouchableWithoutFeedback, Platform } from "react-native";
import { BlurView } from "@react-native-community/blur";
import styled from "styled-components/native";

import AsyncImage from "./AsyncImage";
import { colors } from "../styles/common.style";

const Wrapper = styled.View`
  box-shadow: 0px 1px 3px rgba(127, 140, 141, 0.1);
`;

const StyledBlurView = styled(BlurView)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

const StyledView = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.95);
`;

const StatCard = ({ onPress, item }) => {
  const { title, subtitle, image, statType } = item;

  return (
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <Wrapper>
        <View
          style={{
            margin: 20,
            height: 450,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: colors.lightgray,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1001,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              }}
            >
              {Platform.OS === "ios" ? (
                <StyledBlurView blurType="light" blurAmount={10} />
              ) : (
                <StyledView />
              )}

              <Text
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  fontWeight: "700",
                  fontSize: 14,
                  zIndex: 1,
                  color: "gray",
                  textTransform: "uppercase",
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                  fontWeight: "700",
                  fontSize: 22,
                }}
              >
                {subtitle}
              </Text>
            </View>
            {image && (
              <AsyncImage
                style={{ flex: 1, backgroundColor: "white" }}
                url={image}
              />
            )}
          </View>
        </View>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};

export default StatCard;
