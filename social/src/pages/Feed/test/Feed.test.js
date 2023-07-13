import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Feed from '../Feed';
import Post from '../../../components/Post';
import Header from '../../../components/Header';
import { getFeeds } from '../../../apis/FeedAPI';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../../apis/FeedAPI', () => ({
  getFeeds: jest.fn(),
}));

describe('Feed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Feed />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the Header component', () => {
    expect(wrapper.find(Header).exists()).toBe(true);
  });

  

  it('fetches feed data on component mount', async () => {
    const mockFeedData = [
      {
        feed_profile: 'profile.jpg',
        feed_message: 'Hello World',
        feed_email: 'user@example.com',
        feed_images: ['image1.jpg', 'image2.jpg'],
      },
    ];

    getFeeds.mockResolvedValue(mockFeedData);

    await act(async () => {
      wrapper = shallow(<Feed />);
    });

    expect(getFeeds).toHaveBeenCalled();
    expect(wrapper.find(Post)).toHaveLength(0);
  });

  it('renders the correct number of Post components', async () => {
    const mockFeedData = [
      {
        feed_profile: 'profile1.jpg',
        feed_message: 'Post 1',
        feed_email: 'user1@example.com',
        feed_images: ['image1.jpg'],
      },
      {
        feed_profile: 'profile2.jpg',
        feed_message: 'Post 2',
        feed_email: 'user2@example.com',
        feed_images: ['image2.jpg', 'image3.jpg'],
      },
    ];

    getFeeds.mockResolvedValue(mockFeedData);

    await act(async () => {
      wrapper = shallow(<Feed />);
    });

    expect(wrapper.find(Post)).toHaveLength(0);
  });
});
