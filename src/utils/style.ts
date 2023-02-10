import { Field } from "formik";
import styled from "styled-components";
import { Theme } from "./theme";
import { GradientBorder } from "../images";

export const PrimaryButton = styled.button`
  width: 160px;
  height: 40px;
  background: ${Theme.buttonPrimaryBg};
  color: ${Theme.buttonPrimaryColor};
  box-shadow: ${Theme.buttonBoxShadowPrimary};
  border-radius: ${Theme.buttonBorderRadius};
  border: 0;
  font-weight: 600;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms;

  :disabled {
    cursor: not-allowed;
    background: ${Theme.disabledButton};
    box-shadow: 0px 0px;
  }
`;

export const SecondaryButton = styled.button`
  width: 160px;
  height: 40px;
  background: transparent;
  border: 1px solid ${Theme.linkColor};
  color: ${Theme.linkColor};
  filter: drop-shadow(0px 0px 10px rgba(45, 210, 255, 0.4));
  border-radius: ${Theme.elementBorderRadius};
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;

  :disabled {
    cursor: not-allowed;
  }
`;

export const PrimaryInput = styled(Field)`
  width: 160px;
  height: 40px;
  background: ${Theme.primaryPageBg};
  border: 1px solid ${Theme.primaryPageBg};
  box-sizing: border-box;
  border-radius: ${Theme.componentBorderRadius};
  padding: 6px 10px;
  font-size: 14px;
  line-height: 19px;
  text-transform: uppercase;
  color: ${Theme.textColorPrimary};
  transition: 300ms all;

  :focus {
    border: 1px solid ${Theme.linkColor};
  }
`;

export const PrimaryText = styled.div`
	height: 40px;
	background: ${Theme.buttonSecondaryBg};
	border: 1px solid ${Theme.borderPrimary};
	box-sizing: border-box;
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	line-height: 20px;
	text-align: center;
	letter-spacing: 0.01em;
`;

export const PrimaryGradientButton = styled.button`
	background-repeat: no-repeat;
	color: ${Theme.buttonPrimaryColor};
	border-radius:${Theme.elementBorderRadius};

	:disabled {
		cursor: not-allowed;
		background: #0A0F12;
		box-shadow: 0px 0px;
		border-radius:${Theme.elementBorderRadius};
	}
`;

export const SecondaryGradientButton = styled.button`
	background: conic-gradient(from 180deg at 50% 50%, #FFFFFF 0deg, #000000 51.64deg, #FFFFFF 79.77deg, #000000 141.65deg, #FFFFFF 194.15deg, #000000 254.15deg, #FFFFFF 286.03deg, #000000 331.03deg, #FFFFFF 360deg), conic-gradient(from 180deg at 50% 50%, #FFFFFF 0deg, #000000 51.64deg, #FFFFFF 79.77deg, #000000 141.65deg, #FFFFFF 194.15deg, #000000 254.15deg, #FFFFFF 286.03deg, #000000 331.03deg, #FFFFFF 360deg), radial-gradient(95% 95% at 36.4% 1.4%, #F7D4CB 0%, #FFFAE2 20.64%, rgba(255, 186, 255, 0.850701) 42.07%, #FFD5B7 62.26%, #FFFEE2 80.49%, #79A2F2 100%);
	background-blend-mode: screen, difference, normal;
	mix-blend-mode: normal;
	box-shadow: 2px 2px 0px rgba(66, 80, 92, 0.82);
	border-radius: 6px;
	cursor: pointer;
	border: 0;
	color: ${Theme.sidebarBg};

	a {
		text-decoration: none;
		color: #263339;
	}

	span {
		font-weight: bold;
		font-size: 16px;
		line-height: 0px;
		text-align: center;
		-webkit-letter-spacing: 0.01em;
		-moz-letter-spacing: 0.01em;
		-ms-letter-spacing: 0.01em;
		letter-spacing: 0.01em;
		display: inline-grid;
		grid-template-areas: "text";
		place-items: center;

		span {
			background: black;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			-webkit-text-stroke: 0.01em rgba(0, 0, 0, 0.6);
			/* FUn fact - letter-spacing messes with the ability of the
			gradient to cover all the text :( */
		}

		& > *,
		&::before,
		&::after {
			grid-area: text;
		}

		&::before,
		&::after {
			content: attr(data-text);
			color: #fff;
		}

		&::before {
			-webkit-text-stroke: 0.21em white;
			background: no-repeat linear-gradient(white, white) 15% 50% / 85% 60%;

			/* Original failed attempt */
			/* letter-spacing: -0.04em; */
			/* transform: scale(1.12) translateX(-0.02em) translateY(0.002em); */
			/* text-shadow: 0.002em 0.002em 0.02em rgba(0, 0, 0, 0.75); */
			/* -webkit-text-stroke: 0.001em rgba(0, 0, 0, 0.6); */
		}

		&::after {
			text-shadow: 0.07em 0.08em 0.05em rgba(0, 0, 0, 0.75),
			-0.07em -0.05em 0.05em rgba(0, 0, 0, 0.75);
			z-index: -2;
		}
	}

	:disabled {
		cursor: not-allowed;
		background: ${Theme.buttonSecondaryBg};
		box-shadow: 0px 0px;
		border-radius:${Theme.elementBorderRadius};

		span {
			color: ${Theme.sidebarBg};
		}
	}
`;