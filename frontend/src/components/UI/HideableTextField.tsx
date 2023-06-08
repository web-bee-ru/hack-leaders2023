import { TextField, TextFieldProps, Theme } from '@mui/material';
import { styled, css } from '@mui/material/styles';
import classNames from 'classnames';
import { forwardRef, ForwardRefRenderFunction, useMemo } from 'react';

export type HideableTextFieldProps = TextFieldProps & {
  hideDecorations?: boolean;
  hidePlaceholder?: boolean;
  shrinkLabel?: boolean;
};

export const HideableFormControlStyles = (props: { theme: Theme }) => css`
  &.disabled {
    .MuiInputLabel-root {
      .MuiInputLabel-asterisk {
        display: none;
      }
    }

    .MuiInputBase-root {
      .MuiInputBase-input {
        -webkit-text-fill-color: ${props.theme.palette.action.active};
        &::placeholder {
          opacity: 1;
        }
      }

      &:hover fieldset {
        border-color: ${props.theme.palette.action.disabled};
      }
    }
  }

  &.decorations-hidden {
    .MuiInputLabel-root {
      color: ${props.theme.palette.action.active};
      .MuiInputLabel-asterisk {
        display: none;
      }
    }

    .MuiInputBase-root {
      .MuiInputBase-input {
        color: ${props.theme.palette.text.primary};
        -webkit-text-fill-color: ${props.theme.palette.text.primary};
        &::placeholder {
          opacity: 1;
        }
      }

      .MuiInputAdornment-root,
      .MuiAutocomplete-endAdornment {
        display: none;
      }

      .MuiChip-root {
        opacity: 1;
      }

      fieldset {
        display: none;
      }
    }
  }
`;

const StyledTextField = styled(TextField)`
  ${HideableFormControlStyles}
` as typeof TextField;

const HideableTextField: ForwardRefRenderFunction<HTMLDivElement, HideableTextFieldProps> = (
  { hideDecorations, hidePlaceholder, shrinkLabel, ...restProps },
  ref,
) => {
  const placeholder = useMemo(
    () => (hideDecorations ? 'Не указано' : restProps.placeholder ?? restProps.inputProps?.placeholder),
    [hideDecorations, restProps.inputProps?.placeholder, restProps.placeholder],
  );

  return (
    <StyledTextField
      {...restProps}
      ref={ref}
      placeholder={hidePlaceholder ? undefined : placeholder}
      disabled={hideDecorations}
      className={classNames(
        restProps.className,
        hideDecorations && 'decorations-hidden',
        restProps.disabled && 'disabled',
      )}
      InputLabelProps={{
        ...restProps.InputLabelProps,
        shrink: hideDecorations || shrinkLabel || undefined,
      }}
      inputProps={{
        ...restProps.inputProps,
        placeholder: hidePlaceholder ? undefined : placeholder,
        disabled: hideDecorations || restProps.disabled,
      }}
    />
  );
};

export default forwardRef(HideableTextField);
