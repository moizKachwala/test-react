import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {formValueSelector} from 'redux-form';

import StudentEditPageComponent from './StudentEditPage.jsx';
import studentCreateForm from '../../../../store/forms/studentCreateForm';
import {create, get, update, reset} from '../../../../store/actions/students';
import {list} from '../../../../store/actions/nationalities';
import { createSelector } from 'reselect';
import {createStudentSelector} from '../../../../store/selectors/students';

const selectSelectedStudent = (state) => state.students.selectedStudentId;

//const selectStudent = createStudentSelector(selectSelectedStudent);

const selectStudentForm = createSelector(
    //selectStudent,
    (state) => state.students.selectedStudent,
    (student) => {
        let form = {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            nationality: '',
            familyMembers: [
                {firstName: '', lastName: '', dateOfBirth:'', nationality:''},
            ],
        };

        if(student.ID) {
            form = {
                ...student
            };
        }
        
        return form;
    }
);

export const StudentEditPage = connect(
    (state, props) => ({
        formValueSelector: (field) => formValueSelector('student-create')(state, field),
        isEdit: selectSelectedStudent(state),
        studentId: selectSelectedStudent(state, props),
        nationalities: state.nationalities.data,
        initialValues: selectStudentForm(state, props),
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            nationalitiesList: list,
            studentCreate: create,
            studentGet: get,
            studentUpdate: update,
            studentsReset: reset,
        }, dispatch)
    })
)(studentCreateForm(StudentEditPageComponent));