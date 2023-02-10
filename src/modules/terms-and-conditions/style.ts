import styled from "styled-components";
import { Theme } from "../../utils";

export const TermsPage = styled.div`
  min-height: 100vh;
  background-color: ${Theme.primaryPageBg};
`;

export const TermsContainer = styled.div`
  width: 90%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 100px 0;

  h2 {
    color: ${Theme.linkColor};
    text-align: center;
  }

  p {
    color: ${Theme.textColorPrimary};
    font-size: 16px;
    line-height: 18px;
    margin-top: 15px;
  }

  h3 {
    color: ${Theme.linkColor};
    text-align: left;
    padding: 30px 0 20px 0;
  }
`;
