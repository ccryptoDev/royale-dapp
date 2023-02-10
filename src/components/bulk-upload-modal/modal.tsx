import { ModalContainer, ModalWrapper, ModalBorder, CrossIconContainer, ModalHeader, ModalBody, InputTitle, CustomInput, CustomInputBox, InputBox, StatusBox, WhitelistBox, StatusBtn, ButtonField, SaveButton } from "./style";
import { CloseIcon, WhitelistBtn, UploadIcon } from "../../images";

interface Props {
  show: boolean;
  closeModal: () => void;
}

const Modal = (props: Props) => {
  const { show, closeModal } = props;

  return (
    <ModalWrapper show={show}>
      <ModalBorder>
        <ModalContainer>
          <CrossIconContainer onClick={closeModal}>
            <img src={CloseIcon.default} alt="close"/>
          </CrossIconContainer>
          <ModalHeader>Bulk upload</ModalHeader>
          <ModalBody>
            <InputTitle>
              Upload
            </InputTitle>
            <CustomInput>
              <CustomInputBox htmlFor="file-upload">
              <img src={UploadIcon.default} alt="close"/>&nbsp;&nbsp;&nbsp;Upload CSV
              </CustomInputBox>
            </CustomInput>
            <InputBox/>
            <StatusBox>Status</StatusBox>
            <WhitelistBox>
              Whitelisted
              <StatusBtn>
                <img src={WhitelistBtn.default} alt="close"/>
              </StatusBtn>
            </WhitelistBox>
          </ModalBody>
          <ButtonField>
            <SaveButton>
              <span data-text="Save">Save</span>
            </SaveButton>
          </ButtonField>
        </ModalContainer>
      </ModalBorder>
    </ModalWrapper>
  );
};

export default Modal;
