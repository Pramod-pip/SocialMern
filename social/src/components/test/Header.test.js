import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import axios from 'axios';
import Header from '../Header';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios');

describe('Header', () => {
  let wrapper;
  const getFeedDataMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Header getFeedData={getFeedDataMock} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the Facebook logo', () => {
    const logo = wrapper.find('img');
    expect(logo.exists()).toBe(true);
    expect(logo.prop('alt')).toBe('facebook');
  });

  it('renders the correct number of header options', () => {
    const headerOptions = wrapper.find('.header__option');
    expect(headerOptions).toHaveLength(5);
    expect(headerOptions.at(0).find(HomeIcon).exists()).toBe(true);
    expect(headerOptions.at(1).find(FlagIcon).exists()).toBe(true);
    expect(headerOptions.at(2).find(SubscriptionsIcon).exists()).toBe(true);
    expect(headerOptions.at(3).find(StorefrontIcon).exists()).toBe(true);
    expect(headerOptions.at(4).find(SupervisedUserCircleIcon).exists()).toBe(true);
  });

  it('opens the modal on AddIcon click', () => {
    expect(wrapper.find('Modal').prop('open')).toBe(false);
    wrapper.find('IconButton').simulate('click');
    expect(wrapper.find('Modal').prop('open')).toBe(true);
  });

  it('closes the modal on Modal onClose', () => {
    wrapper.find('IconButton').simulate('click');
    expect(wrapper.find('Modal').prop('open')).toBe(true);
    wrapper.find('Modal').simulate('close');
    expect(wrapper.find('Modal').prop('open')).toBe(false);
  });

  it('updates the message state on TextField change', () => {
    const textField = wrapper.find('TextField');
    const event = { target: { value: 'Test message' } };
    textField.simulate('change', event);
    expect(wrapper.find('TextField').prop('value')).toBe('Test message');
  });

  it('updates the files state on file input change', () => {
    const fileInput = wrapper.find('input[type="file"]');
    const event = {
      target: {
        files: [
          { name: 'file1.jpg' },
          { name: 'file2.jpg' },
        ],
      },
    };
    fileInput.simulate('change', event);
    expect(wrapper.find('input[type="file"]').prop('multiple')).toBe(true);
    expect(wrapper.state('files')).toHaveLength(2);
    expect(wrapper.state('files')[0].name).toBe('file1.jpg');
    expect(wrapper.state('files')[1].name).toBe('file2.jpg');
  });

  it('submits the form and calls getFeedData on form submit', async () => {
    const postMock = jest.spyOn(axios, 'post');
    postMock.mockResolvedValueOnce({});
    wrapper.setState({ message: 'Test message' });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(postMock).toHaveBeenCalled();
    expect(getFeedDataMock).toHaveBeenCalled();
    postMock.mockRestore();
  });
});
