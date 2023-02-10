import styled from "styled-components"
import { Theme } from "../../utils";

export const RewardRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 17px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const RewardType = styled.div`
  width: 60px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: ${Theme.textColorPrimary};
  text-align: left;

  @media (max-width: 800px) {
    text-align: center;
  }
`;

export const RewardDash = styled.div`
  width: 4px;
  height: 2px;
  margin-left: 5px;
  background-color: ${Theme.textColorPrimary};

  @media (max-width: 800px) {
    margin-top: 10px;
    margin-left: 0;
  }
`;

export const RewardAmount = styled.div`
  margin-left: 20px;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  color: ${Theme.textColorPrimary};

  @media (max-width: 800px) {
    margin-top: 10px;
    margin-left: 0;
  }
`;