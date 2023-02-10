import styled from "styled-components";
import { Theme } from "../../utils";
import { NetworkStatBg } from "../../images";

export const AnalyticsWrapper = styled.div`
  min-height: 100vh;
  padding-bottom: 70px;
  /* background-color: ${Theme.secondaryPageBg}; */
`;

export const BackgroundWrapper = styled.div`
  max-width: 100%;
  /* background: #010c2a; */
  position: relative;
  /* background-image: url(${NetworkStatBg.default}); */
  padding-top: 42px;

  @media (max-width: 1100px) {
    padding-top: 20px;
  }
`;