import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Formik, Field } from 'formik';
import Login from '../Login';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Login', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays validation errors for invalid email and password', async () => {
    const wrapper = shallow(<Login />);
    const formikWrapper = wrapper.find(Formik);

    await act(async () => {
      await formikWrapper.props().onSubmit({ email: '', password: '' });
      wrapper.update();
    });

  });


//   it('navigates to "/feed" on successful login', async () => {
//     const mockNavigate = jest.fn();
//     const wrapper = shallow(<Login />);
//    //  wrapper.find(Login).instance().navigate = mockNavigate; // Mocking the navigate function

//     const formikWrapper = wrapper.find(Formik);

//     await act(async () => {
//       await formikWrapper.props().onSubmit({ email: 'test@example.com', password: 'password' });
//       wrapper.update();
//     });

//     expect(mockNavigate).toHaveBeenCalledWith('/feed');
//   });


});