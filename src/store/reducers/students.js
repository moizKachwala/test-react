import {createReducer} from '../../util';
import * as actions from '../actions/students';

const initialStatusState = {
    error: false,
    errorMessage: null,
    pending: false,
};

const initialState = {
    data: [],
    selectedStudent: null,
    list: {
        ...initialStatusState,
    },
    create: {
        ...initialStatusState,
    },
    update: {
        ...initialStatusState,
    },
};

export default createReducer(initialState, {
    [actions.STUDENTS_LIST_PENDING]: (state) => ({ 
        ...state, 
        list: {
            pending: true,
        },
    }),
    [actions.STUDENTS_LIST_FULFILLED]: (state, students) => ({
        ...state,
        list: {
            ...initialStatusState,
        },
        data: students,
    }),
    [actions.STUDENTS_LIST_REJECTED]: (state, errorMessage) => ({
        ...state,
        list: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),

    [actions.STUDENTS_CREATE_PENDING]: (state) => ({ 
        ...state, 
        create: {
            pending: true,
        },
    }),
    [actions.STUDENTS_CREATE_FULFILLED]: (state) => ({
        ...state,
        create: {
            ...initialStatusState,
        }
    }),
    [actions.STUDENTS_CREATE_REJECTED]: (state, errorMessage) => ({
        ...state,
        create: {
            ...initialStatusState,
            error: true,
            errorMessage,
        },
    }),
    [actions.STUDENTS_SELECTED]: (state, payload) => ({
        ...state, selectedStudent: payload
    }),
});
