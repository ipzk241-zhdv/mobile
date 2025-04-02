import styled from "styled-components/native";

const ThemedView = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.background};
    padding: ${(props) => props.padding || "20px"};
    height: 100%;
`;

export default ThemedView;
