import * as React from 'react';
interface IFormError {
    message: string;
}
interface IFormErrorProps {
    errors?: ReadonlyArray<IFormError>;
}
declare const FormError: React.FunctionComponent<IFormErrorProps>;
export { FormError, IFormError, IFormErrorProps };
