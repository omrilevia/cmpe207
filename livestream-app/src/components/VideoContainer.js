import React, { Component } from 'react';
import ReactHLS from 'react-hls';
import config from 'react-global-configuration';

class VideoContainer extends Component {

  source() {
    return `http://${config.get('serverIp')}:8935/stream/ab14b499.m3u8`
  }

  render() {
    return(
      <div className='left-container'>
        <div className="video-container">
          <ReactHLS url={this.source()} />
        </div>
        
      </div>
    )
  }
}

export default VideoContainer