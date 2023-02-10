import styled from "styled-components";
import { Theme } from "../../utils";

export const DropdownWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 40px;
`;

interface DropdownProps {
  show: boolean;
}

export const DropdownContainer = styled.div<DropdownProps>`
  width: 100%;
  height: 100%;
  background-color: ${Theme.primaryPageBg};
  border-radius: ${Theme.elementBorderRadius};
  padding: 12px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  color: #ffffff;
  position: relative;
  cursor: pointer;

  img {
    position: absolute;
    right: 10px;
    top: 15px;
    width: 10px;
    height: 10px;
    transform: ${(props) => (props.show ? "rotate(180deg)" : "rotate(0deg)")};
    transition: 300ms all;
  }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

export const Options = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${Theme.primaryPageBg};
  border-radius: ${Theme.componentBorderRadius};
  padding: 6px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 19px;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;
  border-top: 2px solid ${Theme.headerBackground};
`;
