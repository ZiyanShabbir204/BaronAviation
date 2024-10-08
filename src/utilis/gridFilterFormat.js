import {  getGridStringOperators,getGridDateOperators,getGridNumericOperators } from '@mui/x-data-grid';
 export const stringFilterOperators = getGridStringOperators().filter(({ value }) =>
    ['equals' ,'contains','startsWith','endsWith' ].includes(value),
  );

  export const dateFilterOperators = getGridDateOperators().filter(({ value }) =>
    ['is' ,'not','after','before' ].includes(value),
  );
  export const numericFilterOperators = getGridNumericOperators().filter(({ value }) =>
    ['=' ,'>','<','>=','<=' ].includes(value),
  );
