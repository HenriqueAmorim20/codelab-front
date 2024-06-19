import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export type TCanDeactivate = Observable<boolean> | Promise<boolean> | boolean;

export interface CanComponentDeactivate {
  canDeactivate: () => TCanDeactivate;
}

export const pendingChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component,
): TCanDeactivate => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
