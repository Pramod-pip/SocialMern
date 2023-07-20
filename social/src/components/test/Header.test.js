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

 
  it('submits the form and calls getFeedData on form submit', async () => {
    const postMock = jest.spyOn(axios, 'post');
    postMock.mockResolvedValueOnce({});
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(postMock).toHaveBeenCalled();
    postMock.mockRestore();
  });
});
