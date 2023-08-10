import React, { memo } from 'react';
import 'regenerator-runtime/runtime';
import { Camera } from '../../../types/Premise';
import ReactHlsPlayer from 'react-hls-player';
import { testId } from '../../../testing/testId';

export interface Props {
  cctv: Camera;
}
const CCTVPlayer: React.FC<Props> = memo(({ cctv }) => {
  return (
    <div className="cctv-container">
      {/* @ts-ignore*/}
      <ReactHlsPlayer
        id={`cctv-${cctv.id}`}
        src={cctv.streamUrl}
        autoPlay={true}
        controls={true}
        width="100%"
        height="auto"
        muted
        data-testid={testId.cctvPlayer}
      />
    </div>
  );
});
export default CCTVPlayer;
