// import React, { Component } from 'react';
// import ReactHLS from 'react-hls';
// import config from 'react-global-configuration';
// import StreamInfo from './StreamInfo';
// import TipContainer from './TipContainer'; 

// class VideoContainer extends Component {

//   source() {
//     return `http://${config.get('serverIp')}:8935/stream/${this.props.streamId}.m3u8`
//   }

//   render() {
//     return(
//       <div className='left-container'>
//         <div className="video-container">
//           <ReactHLS url={this.source()} />
//         </div>
//         {/* <TipContainer />
//         <StreamInfo streamId={this.props.streamId}/> */}
//       </div>
//     )
//   }
// }

// export default VideoContainer

import React from 'react'
import ReactHLS from 'react-hls';

function VideoContainer({streamURL}) {
    return(
            <div className='left-container'>
              <div className="video-container">
                <ReactHLS url={streamURL}/>
              </div>
            </div>
          )
}

export default VideoContainer