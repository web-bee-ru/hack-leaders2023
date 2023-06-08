import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { styled } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers-pro';
import { ForwardedRef, forwardRef } from 'react';
import HideableTextField from '@/components/UI/HideableTextField';

const UI_DATE_FORMAT = 'dd.MM.yyyy';
export interface DefaultDatePickerProps
  extends Omit<DatePickerProps<Date | null | undefined, Date | null>, 'renderInput'> {
  required?: boolean;
  error?: boolean;
  helperText?: string;
  onBlur?: () => void;
  mask?: string;
  HideableTextFieldProps?: HideableTextFieldProps;
  renderInput?: DatePickerProps<Date | null | undefined, Date | null>['renderInput'];
}

const StyledDatePicker = styled(DatePicker)`
  svg {
    font-size: 16px;
  }
  .MuiIconButton-root {
    margin-right: 0;
  }
` as typeof DatePicker;

const DefaultDatePicker = (
  {
    required,
    error,
    helperText,
    renderInput,
    onBlur,
    mask,
    HideableTextFieldProps,
    ...datePickerProps
  }: DefaultDatePickerProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <StyledDatePicker
      {...datePickerProps}
      mask={mask ?? '__.__.____'}
      onClose={onBlur}
      components={{ OpenPickerIcon: CalendarTodayOutlinedIcon }}
      inputFormat={datePickerProps.inputFormat ?? UI_DATE_FORMAT}
      renderInput={(params) =>
        renderInput ? (
          renderInput(params)
        ) : (
          <HideableTextField
            {...params}
            ref={ref}
            required={required}
            error={error}
            helperText={helperText}
            onBlur={onBlur}
            {...HideableTextFieldProps}
          />
        )
      }
    />
  );
};

export default forwardRef(DefaultDatePicker);
