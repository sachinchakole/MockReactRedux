import { Action, Reducer } from 'redux';
import { CourseVM } from '../server/CourseVM';
import { IAppThunkAction as AppThunkAction } from './';



export interface ICourseState {
    courses: CourseVM;
    isSubmitting: boolean;
}

export interface ISubmitCourseAction {
    type: 'SUBMIT_COURSE',
    payload: CourseVM,
}
export interface IResetCourseAction {
    type: 'RESET_COURSE',
   
}
export interface ISuccesCourseAction {
    type: 'SUCCESS_COURSE',
    payload: { result:CourseVM }
}
export interface ICourseFailedAction {
    type: 'FAILED_COURSE',
    payload: {
        status: string;
    }
}
type KnowAction = ISubmitCourseAction | ISuccesCourseAction | IResetCourseAction | ICourseFailedAction ;

export const actionCreators = {
    resetForm: () => (dispatch: any, getState: any) => {
        (() => {
            dispatch({ type: 'RESET_COURSE' });
        })();
    },
    submitForm: (model: CourseVM): AppThunkAction<KnowAction> => (dispatch, getState) => {
        (async () => {
           
            dispatch({ type: 'SUBMIT_COURSE', payload: model });
            let response = await fetch(`api/SampleData/CourseData`,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify(model)
                }) as Response;

            if (response.ok) {
                const data = response.json();
               data.then(d => {
                   dispatch({ type: 'SUCCESS_COURSE', payload: { result: d } });

                   dispatch({ type: 'RESET_COURSE'});

               });
                

            }    
                
        })();
    },
  

};

const newForm = { name: '', email: ''};
const unloadedState: ICourseState = { isSubmitting: false, courses: newForm };

export const reducer: Reducer<ICourseState> = (state: ICourseState, action: KnowAction) => {
    switch (action.type) {
    case 'SUBMIT_COURSE':
            return { courses: action.payload, isSubmitting: true, result: undefined};
    case 'RESET_COURSE':
            return { courses: newForm, isSubmitting: false, result: undefined };
    case 'SUCCESS_COURSE':
            return { courses: unloadedState.courses, isSubmitting: false, result: action.payload.result };
    case 'FAILED_COURSE':
            return { courses: state.courses, isSubmitting: false, result: action.payload.status };
    default:
        // The following line guarantees that every action in the KnownAction union has been covered by a case above
        const exhaustiveCheck: never = action;
    }
    return state || unloadedState;
};