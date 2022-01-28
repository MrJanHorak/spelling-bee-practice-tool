import React from 'react'
import '../../styles/AvatarSelection.css'

// Assets
import bear from '../../assets/avatars/bear.png'
import cat from '../../assets/avatars/cat.png'
import deer from '../../assets/avatars/deer.png'
import fox from '../../assets/avatars/fox.png'
import koala from '../../assets/avatars/koala.png'
import monkey from '../../assets/avatars/monkey.png'
import panda from '../../assets/avatars/panda.png'
import raccoon from '../../assets/avatars/raccoon.png'
import wolf from '../../assets/avatars/wolf.png'

const AvatarSelection = (props) => {

  return (
    <div className="popup-container">
      <div className="popup-menu">
        <div className="popup-header">
          <h3>Select Your Avatar</h3>
          <button id="close-button" onClick={props.handlePopup}>X</button>
        </div>
        <img src={props.formData.avatar} alt="animal-avatar"></img>
        <div className="bottom-ui">
          <select onChange={(e) => props.handleChange(e)} name="avatar" value={props.formData.avatar}>
            <option value={cat}>Cat</option>
            <option value={bear}>Bear</option>
            <option value={monkey}>Monkey</option>
            <option value={koala}>Koala</option>
            <option value={fox}>Fox</option>
            <option value={deer}>Deer</option>
            <option value={raccoon}>Raccoon</option>
            <option value={panda}>Panda</option>
            <option value={wolf}>Wolf</option>
          </select>
          <button onClick={props.handlePopup} type="button">Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default AvatarSelection