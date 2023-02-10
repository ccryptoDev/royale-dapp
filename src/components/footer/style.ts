import styled from "styled-components";
import { Theme } from "../../utils";

export const FooterContainer = styled.div`
  color: white;
  padding: 50px 0;
  background-color: ${Theme.primaryPageBg};
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  @media (max-width: 600px) {
    padding: 50px 20px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Icon = styled.div`
  margin: 0 20px;
  transition: 300ms all;

  @media (max-width: 600px) {
    margin: 20px 0;
  }

  :hover {
    transform: translateY(-10px);
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  img {
    width: 75px;
  }
`;

export const LinkText = styled.div`
  margin-top: 10px;
  color: ${Theme.linkColor};
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  text-transform: uppercase;
`;
