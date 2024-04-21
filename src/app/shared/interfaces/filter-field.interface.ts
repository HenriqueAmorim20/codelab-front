import { EFieldType } from '../enums/field-type.enum';

export interface ILabelValue {
  label: string;
  value: number;
}

export interface IFilterField {
  type: EFieldType;
  class: string;
  label: string;
  formControlName: string;
  placeholder: string;
  options?: Promise<ILabelValue[]>;
  mask?: any;
}
