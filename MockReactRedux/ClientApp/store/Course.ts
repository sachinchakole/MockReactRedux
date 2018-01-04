import { Action, Reducer } from 'redux';

export interface ICourseState {
    courses: ICourses[];
}
export interface ICourses {
    title: string;
}

export interface ICreateCourseAction {
    type:'CREATE_COURSE';
}

type KnowAction = ICreateCourseAction;

export const actionCreators = {
    create: () => <ICreateCourseAction>{ type: 'CREATE_COURSE' },
};

const unloadedState: ICourseState = { courses: [] };

export const reducer: Reducer<ICourseState> = (state: ICourseState, creatAction: Action) => {
    const action = creatAction as KnowAction;
    switch (action.type) {
        case 'CREATE_COURSE':
            return {courses: state.courses};
        default:
            const exhaustiveCheck: never = action;
    }
    return state;   
}