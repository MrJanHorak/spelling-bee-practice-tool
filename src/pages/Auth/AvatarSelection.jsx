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
import anteater from '../../assets/avatars/anteater.png'
import bear2 from '../../assets/avatars/bear2.png'
import buffalo from '../../assets/avatars/buffalo.png'
import chicken from '../../assets/avatars/chicken.png'
import cow from '../../assets/avatars/cow.png'
import crow from '../../assets/avatars/crow.png'
import dog from '../../assets/avatars/dog.png'
import dog2 from '../../assets/avatars/dog2.png'
import donkey from '../../assets/avatars/donkey.png'
import elephant from '../../assets/avatars/elephant.png'
import koala2 from '../../assets/avatars/koala2.png'
import leopard from '../../assets/avatars/leopard.png'
import octopus from '../../assets/avatars/octopus.png'
import owl from '../../assets/avatars/owl.png'
import panda2 from '../../assets/avatars/panda2.png'
import parrot from '../../assets/avatars/parrot.png'
import penguin from '../../assets/avatars/penguin.png'
import pig from '../../assets/avatars/pig.png'
import polarbear from '../../assets/avatars/polar-bear.png'
import racoon from '../../assets/avatars/racoon.png'
import rooster from '../../assets/avatars/rooster.png'
import seagull from '../../assets/avatars/seagull.png'
import snake from '../../assets/avatars/snake.png'
import whale from '../../assets/avatars/whale.png'

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
            <option value={anteater}>Anteater</option>
            <option value={bear}>Bear</option>
            <option value={bear2}>Bear 2</option>
            <option value={buffalo}>Buffalo</option>
            <option value={cat}>Cat</option>
            <option value={chicken}>Chicken</option>
            <option value={cow}>Cow</option>
            <option value={crow}>Crow</option>
            <option value={deer}>Deer</option>
            <option value={dog}>Dog</option>
            <option value={dog2}>Dog 2</option>
            <option value={donkey}>Donkey</option>
            <option value={elephant}>Elephant</option>
            <option value={fox}>Fox</option>
            <option value={koala}>Koala</option>
            <option value={koala2}>Koala 2</option>
            <option value={leopard}>Leopard</option>
            <option value={monkey}>Monkey</option>
            <option value={octopus}>Octopus</option>
            <option value={owl}>Owl</option>
            <option value={panda}>Panda</option>
            <option value={panda2}>Panda 2</option>
            <option value={parrot}>Parrot</option>
            <option value={penguin}>Penguint</option>
            <option value={pig}>Pig</option>
            <option value={polarbear}>Polarbear</option>
            <option value={raccoon}>Raccoon</option>
            <option value={racoon}>Raccoon 2</option>
            <option value={rooster}>Rooster</option>
            <option value={seagull}>Seagull</option>
            <option value={snake}>Snake</option>
            <option value={whale}>Whale</option>
            <option value={wolf}>Wolf</option>
          </select>
          <button onClick={props.handlePopup} type="button">Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default AvatarSelection