import { IPost } from './components/Profile/Post/Post';
import renderEntireTree from './render';

export const STATE = {
  users: [
    {
      name: 'Ann',
      id: 'X65SPP0CM6',
    },
    {
      name: 'Michael',
      id: '6XYOC5yy7I',
    },
    {
      name: 'Tonya',
      id: 'BGTP5M4599',
    },
    {
      name: 'Oleg',
      id: 'RQ4D130E0R',
    },
    {
      name: 'Farid',
      id: 'RIUz5UXPQD',
    },
  ],
  messages: [
    {
      friendID: 'X65SPP0CM6',
      messages: [
        {
          messageID: 'KDLSD99S5FV',
          isFriendsMessage: true,
          friendName: 'Ann',
          messageDate: new Date('December 01, 2021 13:24:00'),
          messageText: 'Hi',
        },
        {
          messageID: 'DF94NC423AP',
          isFriendsMessage: false,
          friendName: 'Ann',
          messageDate: new Date('December 01, 2021 13:25:09'),
          messageText: 'Hi!',
        },
        {
          messageID: 'FSDKSLD9R30LJ',
          isFriendsMessage: true,
          friendName: 'Ann',
          messageDate: new Date('December 01, 2021 13:27:51'),
          messageText: 'How is it going',
        },
        {
          messageID: 'NVXCNVM090KSC',
          isFriendsMessage: false,
          friendName: 'Ann',
          messageDate: new Date('December 01, 2021 13:29:01'),
          messageText: 'Fine. What about you?',
        },
        {
          messageID: 'ZXVNVERF02KZL',
          isFriendsMessage: true,
          friendName: 'Ann',
          messageDate: new Date('December 01, 2021 13:32:28'),
          messageText: 'I am pretty good',
        },
      ],
    },
    {
      friendID: '6XYOC5yy7I',
      messages: [
        {
          messageID: 'KDLSD9ADS9S5FV',
          isFriendsMessage: true,
          friendName: 'Michael',
          messageDate: new Date('December 01, 2021 13:24:00'),
          messageText: 'HEEEY WAZZZUP',
        },
        {
          messageID: 'DF94NZZCC423AP',
          isFriendsMessage: false,
          friendName: 'Michael',
          messageDate: new Date('December 01, 2021 13:25:09'),
          messageText: 'Hi!',
        },
        {
          messageID: 'FSDKSLDGTR9R30LJ',
          isFriendsMessage: true,
          friendName: 'Michael',
          messageDate: new Date('December 01, 2021 13:27:51'),
          messageText: 'How is it going',
        },
        {
          messageID: 'NVXCNVM456090KSC',
          isFriendsMessage: false,
          friendName: 'Michael',
          messageDate: new Date('December 01, 2021 13:29:01'),
          messageText: 'Fine. What about you?',
        },
        {
          messageID: 'ZXVNVHVERF02KZL',
          isFriendsMessage: true,
          friendName: 'Michael',
          messageDate: new Date('December 01, 2021 13:32:28'),
          messageText: 'I am pretty good',
        },
      ],
    },
  ],
  posts: [] as IPost[],
};


export const setPost = (_post:IPost) => {
  STATE.posts = [...STATE.posts, _post];
  renderEntireTree(STATE);
};

