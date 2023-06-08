import { FunctionInterpolation } from '@emotion/react';

import { Theme } from '@mui/material';
import { SpacingArgument } from '@mui/system/createTheme/createSpacing';
import { get, mapValues } from 'lodash';
import { baseTheme } from '@/const/defaultTheme';

type ThemeCssInterpolationFunction = FunctionInterpolation<{ theme: Theme }>;
const rec =
  (prefix?: string) =>
  (childNode: any, key: string): any => {
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof childNode === 'function') {
      return (...params: any[]): ThemeCssInterpolationFunction =>
        ({ theme }) => {
          return get(theme, path)(...params);
        };
    }

    if (typeof childNode !== 'object') {
      return (({ theme }) => get(theme, path)) as ThemeCssInterpolationFunction;
    }

    return mapValues(childNode, rec(path));
  };

// Can't map overloaded functions as of TS 4.7.4 (https://github.com/microsoft/TypeScript/issues/29732)
interface MuiSpacing<T> {
  (): T;
  (value: number): T;
  (topBottom: SpacingArgument, rightLeft: SpacingArgument): T;
  (top: SpacingArgument, rightLeft: SpacingArgument, bottom: SpacingArgument): T;
  (top: SpacingArgument, right: SpacingArgument, bottom: SpacingArgument, left: SpacingArgument): T;
}

type DeepMapTheme<T> = {
  [Key in keyof T]: T[Key] extends (...params: any[]) => any
    ? (...params: Parameters<T[Key]>) => ThemeCssInterpolationFunction
    : Exclude<T[Key], undefined> extends Record<string, any>
    ? DeepMapTheme<T[Key]>
    : ThemeCssInterpolationFunction;
};

type MuiCssInterpolationHelper = DeepMapTheme<Theme> & {
  spacing: MuiSpacing<ThemeCssInterpolationFunction>;
};

export const muiHelper = mapValues(baseTheme, rec()) as MuiCssInterpolationHelper;
