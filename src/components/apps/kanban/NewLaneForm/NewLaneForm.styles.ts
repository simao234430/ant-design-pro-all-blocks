import styled from 'styled-components';
import { BaseButtonsForm } from '@/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { BaseButtonsGroup } from '@/components/common/forms/components/BaseButtonsGroup/BaseButtonsGroup';
import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, media } from '@/styles/themes/constants';

export const Form = styled(BaseButtonsForm)`
  width: 16rem;
  border-radius: ${BORDER_RADIUS};
  background-color: var(--background-color);
  padding: 1.25rem 1rem;
`;

export const FooterButtons = styled(BaseButtonsGroup)`
  margin-top: 1rem;
  margin-bottom: 0.625rem;
`;

export const FormInput = styled(BaseButtonsForm.Item)`
  @media only screen and ${media.xl} {
    margin-bottom: 1.5rem;
  }

  font-weight: ${FONT_WEIGHT.medium};
  max-height: 1.25rem;
  & .ant-input {
    padding: 0;
    font-weight: inherit;
    font-size: ${FONT_SIZE.md};
  }
  & .ant-input::placeholder {
    color: var(--text-light-color);
  }
  & .ant-form-item-control-input {
    min-height: auto;
  }
`;
