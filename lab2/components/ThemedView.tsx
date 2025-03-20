import styled from "styled-components/native";

const ThemedView = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding: ${(props) => props.padding || "20px"};
`;

export default ThemedView;
