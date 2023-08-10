import { Premise } from '../../../types/Premise';

export const mockedPremisesResponse: Premise[] = [
  {
    id: '1',
    name: 'Floor 1',
    cameras: [
      {
        id: '63c0cf4cbb90b139dd6f6804',
        streamUrl: 'https://s2.livecam-pro.live/cam056/tracks-v1/mono.m3u8',
        name: 'Camera 1',
        incidents: [
          {
            id: '63c0cf4cbb90b139dd6f6805',
            name: 'Stranger detected',
            ignored: false,
            dateCreated: '2023-07-26T11:13:42.908Z',
            cameraId: '63c0cf4cbb90b139dd6f6804',
          },
          {
            id: '63c0cf4cbb90b139dd6f6905',
            name: 'Stranger 2 detected',
            ignored: false,
            dateCreated: '2023-07-27T11:13:42.908Z',
            cameraId: '63c0cf4cbb90b139dd6f6804',
          },
          {
            id: '63c0cf4cbb90b139dd6f7805',
            name: 'Dog detected',
            ignored: true,
            dateCreated: '2023-05-15T11:12:42.908Z',
            cameraId: '63c0cf4cbb90b139dd6f6804',
          },
          {
            id: '63c0cf4cbb90b139dd6f8805',
            name: 'Cat detected',
            ignored: false,
            guardId: '63c0cf4cbb90b139dd6f6804',
            dateCreated: '2023-05-15T11:13:42.908Z',
            cameraId: '63c0cf4cbb90b139dd6f6804',
          },
        ],
      },
      {
        id: '73c0cf4cbb90b139dd6f6804',
        streamUrl: 'https://s2.livecam-pro.live/cam036/tracks-v1/mono.m3u8',
        name: 'Camera 2',
        incidents: [
          {
            id: '63c0cf4cbb90b139dd6f6805',
            name: 'Dog detected',
            ignored: true,
            dateCreated: '2023-05-15T11:13:42.908Z',
            cameraId: '73c0cf4cbb90b139dd6f6804',
          },
        ],
      },
      {
        id: '83c0cf4cbb90b139dd6f6804',
        streamUrl: 'https://s2.livecam-pro.live/cam070/tracks-v1/mono.m3u8',
        name: 'Camera 3',
        incidents: [
          {
            id: '63c0cf4cbb90b139dd6f6805',
            name: 'Cat detected',
            ignored: false,
            guardId: '63c0cf4cbb90b139dd6f6804',
            dateCreated: '2023-05-15T11:13:42.908Z',
            cameraId: '83c0cf4cbb90b139dd6f6804',
          },
        ],
      },
      {
        id: '93c0cf4cbb90b139dd6f6804',
        streamUrl: 'https://s2.livecam-pro.live/cam007/tracks-v1/mono.m3u8',
        name: 'Camera 4',
        incidents: [
          {
            id: '63c0cf4cbb90b139dd6f6805',
            name: 'Mouse detected',
            ignored: false,
            dateCreated: '2023-07-27T11:13:42.908Z',
            cameraId: '93c0cf4cbb90b139dd6f6804',
          },
          {
            id: '63c0cf4cbb90b139dd6f6815',
            name: 'Cat detected',
            ignored: false,
            dateCreated: '2023-07-27T11:15:42.908Z',
            cameraId: '93c0cf4cbb90b139dd6f6804',
          },
          {
            id: '63c0cf4cbb90b139dd6f6825',
            name: 'Dog detected',
            ignored: false,
            dateCreated: '2023-07-26T11:15:42.908Z',
            cameraId: '93c0cf4cbb90b139dd6f6804',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Floor 2',
    cameras: [
      {
        id: '63c0cf4cbb90b139dd6f6805',
        streamUrl: 'https://s2.livecam-pro.live/cam008/tracks-v1/mono.m3u8',
        name: 'Camera 5',
        incidents: [
          {
            id: '63c0cf4cbb90b139dd6f6805',
            name: 'Stranger detected',
            ignored: true,
            dateCreated: '2023-05-15T11:13:42.908Z',
            cameraId: '63c0cf4cbb90b139dd6f6805',
          },
        ],
      },
      {
        id: '73c0cf4cbb90b139dd6f6805',
        streamUrl: 'https://s2.livecam-pro.live/cam040/tracks-v1/mono.m3u8',
        name: 'Camera 6',
        incidents: [
          {
            id: '63c0cf4cbb90b139dd6f6805',
            name: 'Dog detected',
            ignored: false,
            guardId: '63c0cf4cbb90b139dd6f6805',
            dateCreated: '2023-05-15T11:13:42.908Z',
            cameraId: '73c0cf4cbb90b139dd6f6805',
          },
        ],
      },
      {
        id: '83c0cf4cbb90b139dd6f6805',
        streamUrl: 'https://s2.livecam-pro.live/cam036/tracks-v1/mono.m3u8',
        name: 'Camera 7',
        incidents: [
          {
            id: '63c0cf4cbb90b139dd6f6805',
            name: 'Cat detected',
            ignored: false,
            dateCreated: '2023-07-27T11:13:42.908Z',
            cameraId: '83c0cf4cbb90b139dd6f6805',
          },
        ],
      },
      {
        id: '93c0cf4cbb90b139dd6f6805',
        streamUrl: 'https://s2.livecam-pro.live/cam023/tracks-v1/mono.m3u8',
        name: 'Camera 8',
        incidents: [],
      },
    ],
  },
];
