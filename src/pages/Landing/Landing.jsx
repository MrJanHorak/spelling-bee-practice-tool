import React from "react";

//services

//assets
import "../../styles/Landing.css";

const Landing = ({ user }) => {
  return (
    <div id="landing-page">
      <h2>Spelling Bee Practice App</h2>
      <div className="flashcard">
        <p>
          This tool is designed to help prepare for a spelling bee.
          <br />
          <br />
          Making use of a special font "Lexend" designed to reduce cognitive
          noise and and increase character recognition, using visual and
          audio tools in the study mode to help learn the words, this tool was
          designed to help <b><i>all</i></b> students improve their spelling.
          <br />
          <br />
          This is not a finished product. There are still several things being
          worked on and bugs that need to be figured out. Here a list of items I hope to cover in a the next few weeks:
          <ul>
            <li>graphical display of progress</li>
            <li>settings to change the voice</li>
            <li>tracking words user struggles most with</li>
            <li>personal profile settings of background color and fot color</li>
            <li>parent/teacher access</li>
            <li>QR-code login for younger children</li>
          </ul>
          Please give it a try, send me feedback, or feel free to join in and colaborate and code along.
          <br/><br/>
          <b>test user:</b><br/>
          <b>login: </b> firstgrader@testuser.test <b>Password: </b>firstgrader<br/>
          <br/>
          <b>test admin user:</b><br/>
          <b>login: </b> testadmin@testuser.test <b>Password: </b>testadmin
        </p>
      </div>
    </div>
  );
};

export default Landing;
