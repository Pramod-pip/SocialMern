import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Post from '../Post';
import { Avatar } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NearMeIcon from '@mui/icons-material/NearMe';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Slider from 'react-slick';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-slick', () => jest.fn(() => null));

describe('Post', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Post
        profilePic="profile.jpg"
        image={['image1.jpg', 'image2.jpg']}
        username="testuser"
        timestamp="2022-01-01T12:00:00Z"
        message="Hello, Jest!"
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the Avatar component with the correct props', () => {
    const avatar = wrapper.find(Avatar);
    expect(avatar.exists()).toBe(true);
    expect(avatar.prop('src')).toBe('profile.jpg');
    expect(avatar.prop('className')).toBe('post__avatar');
  });

  it('renders the username and timestamp correctly', () => {
    expect(wrapper.find('h3').text()).toBe('testuser');
    expect(wrapper.find('p').at(0).text()).toBe('2022-01-01T12:00:00Z');
  });

  it('renders the message correctly', () => {
    expect(wrapper.find('.post__bottom').text()).toBe('Hello, Jest!');
  });



  it('renders the correct number of image slides', () => {
    const imageSlides = wrapper.find('.image-slider-container').find('div');
    expect(imageSlides).toHaveLength(3);
  });

  it('renders the post options icons correctly', () => {
    const postOptions = wrapper.find('.post__options').find('.post__option');
    expect(postOptions).toHaveLength(4);

    expect(postOptions.at(0).find(ThumbUpIcon).exists()).toBe(true);
    expect(postOptions.at(0).find('p').text()).toBe('Like');

    expect(postOptions.at(1).find(ChatBubbleOutlineIcon).exists()).toBe(true);
    expect(postOptions.at(1).find('p').text()).toBe('Comment');

    expect(postOptions.at(2).find(NearMeIcon).exists()).toBe(true);
    expect(postOptions.at(2).find('p').text()).toBe('Share');

    expect(postOptions.at(3).find(AccountCircleIcon).exists()).toBe(true);
    expect(postOptions.at(3).find(ExpandMoreIcon).exists()).toBe(true);
  });
});