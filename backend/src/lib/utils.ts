import _ from 'lodash';
export const getMinTmTime = (tm) => {
  const modelColumns = global.TMS.map((it) => it.model_column_name);
  return _.min(modelColumns.map((col) => tm[col]));
};
