import styled, { css } from 'styled-components';
import { Form } from 'antd';
import { media } from '@/styles/themes/constants';

interface FormItemProps {
  $isSuccess?: boolean;
  $successText?: string;
}

export const BaseFormItem = styled(Form.Item)<FormItemProps>`
  .ant-form-item-label > label {
    color: var(--primary-color);
  }

  .ant-input-group-addon:first-of-type {
    width: 5rem;
    color: var(--primary-color);
    font-weight: 600;

    .anticon,
    svg {
      font-size: 1.25rem;
    }

    @media only screen and ${media.md} {
      width: 5.5rem;
      font-size: 1.125rem;
    }

    @media only screen and ${media.xl} {
      font-size: 1.5rem;
    }
  }

  .ant-input-suffix .ant-btn {
    width: unset;
    height: unset;
    padding: 0;
    line-height: 1;
  }

  .ant-form-item-explain-error {
    display: flex;
    margin: 0.5rem 0;
    line-height: 1;

    &:before {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      margin: 0 0.25rem;
      color: var(--text-secondary-color);
      font-size: 0.5rem;
      background: var(--error-color);
      border-radius: 50%;
      content: 'X';
    }

    &:not(:first-of-type) {
      display: none;
    }
  }

  ${(props) =>
    props.$isSuccess &&
    css`
      .ant-input {
        &,
        &:hover {
          border-color: var(--success-color);
        }
      }

      .ant-form-item-control-input {
        display: block;

        &::after {
          color: var(--success-color);
          content: '✓ ${props.$successText}';
        }
      }
    `}

  &.ant-form-item-has-feedback .ant-form-item-children-icon {
    display: none;
  }

  .ant-picker-suffix {
    font-size: 1rem;
  }

  .ant-select-arrow {
    top: 50%;
    width: unset;
    height: unset;
    font-size: 1rem;
  }

  &.ant-form-item-has-error .ant-input,
  &.ant-form-item-has-error .ant-input-affix-wrapper,
  &.ant-form-item-has-error .ant-input:hover,
  &.ant-form-item-has-error .ant-input-affix-wrapper:hover {
    border-color: var(--error-color);
  }

  &.ant-form-item-has-success.ant-form-item-has-feedback .ant-input,
  &.ant-form-item-has-success.ant-form-item-has-feedback .ant-input-affix-wrapper,
  &.ant-form-item-has-success.ant-form-item-has-feedback .ant-input:hover,
  &.ant-form-item-has-success.ant-form-item-has-feedback .ant-input-affix-wrapper:hover {
    border-color: var(--success-color);
  }
`;
