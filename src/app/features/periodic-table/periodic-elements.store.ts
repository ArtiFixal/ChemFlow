import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { PeriodicElementService } from "../../core/services/periodic-element.service";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { debounceTime, distinctUntilChanged, finalize, pipe, switchMap, tap } from "rxjs";
import { PeriodicElement } from "../../core/models/periodic-element.model";


const INITIAL_STATE={
    periodicElements: [] as PeriodicElement[],
    query: "",
    loading: false
}

export const PERIODIC_SEARCH_DEBOUNCE_TIME=2000;

export const PeriodicElementsStore = signalStore(
    {providedIn:'root'},
    withState(INITIAL_STATE),
    withMethods((store)=>{
        const periodicService=inject(PeriodicElementService);

        return {
            search(query?:string){
                patchState(store,{query: query??""});
            },
            fetchData: rxMethod<string>(
                pipe(
                    debounceTime(PERIODIC_SEARCH_DEBOUNCE_TIME),
                    distinctUntilChanged(),
                    tap(()=>patchState(store,{loading:true})),
                    switchMap((query?) => periodicService.getPeriodicElements(query)
                                .pipe(
                                    tap(response=>patchState(store,{periodicElements:response})),
                                    // Reset loading regarless of success or error
                                    finalize(()=>patchState(store,{loading:false}))
                                )
                    )
                )
            )
        }
    }),
    withHooks((store) => ({
        onInit() {
            store.fetchData(store.query);
        }
    }))
);