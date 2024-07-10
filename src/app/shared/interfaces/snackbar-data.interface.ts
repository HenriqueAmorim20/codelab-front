import { ESnackbarType } from '../enums/snackbar-type.enum';

export interface ISnackbarData {
  type: ESnackbarType;
  message: string;
}
