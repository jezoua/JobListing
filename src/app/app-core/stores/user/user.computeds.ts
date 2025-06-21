import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { UserState } from './user.store';
import { on } from '@ngrx/signals/events';
import { UserEvents } from './user.events';
import { computed } from '@angular/core';

export function withUserComputed() {
  return signalStoreFeature(
    type<{ state: UserState }>(),
    withComputed((state) => {
      return {
        applied_jobs: computed(() => {
          return state.applied_jobs();
        }),
      };
    }),
  );
}
