/**
 * Created by leichen on 09/02/2018.
 */
import { createSelector } from 'reselect';

const selectTest = state => state.get('user');

const makeSelectTest = () => createSelector(selectTest, testState => testState.get('userinfo'));

export { selectTest, makeSelectTest };
