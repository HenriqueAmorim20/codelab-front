import { AbstractControl } from '@angular/forms';

const customErrors = (
  validatorValue: Record<string, number>,
): Record<string, string> => ({
  required: `Campo obrigatório`,
  max: `Deve ser menor ou igual a ${validatorValue['max']}`,
  min: `Deve ser maior ou igual a ${validatorValue['min']}`,
  minlength: `Precisa ter no mínimo ${validatorValue['requiredLength']} caractere(s)`,
  maxlength: `Precisa ter no máximo ${validatorValue['requiredLength']} caractere(s)`,
  invalidfield: `Campo inválido`,
  email: 'Email inválido',
});

export function controlErrorMessages({ errors }: AbstractControl): string {
  if (!errors) return '';

  const firstError = Object.keys(errors).pop() as string;
  const customErrorsValues = customErrors(errors[firstError]);

  return customErrorsValues[firstError];
}
