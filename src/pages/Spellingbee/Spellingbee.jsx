import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";

// Services
import { getAllWords } from "../../services/wordService";
import { getProfileById } from "../../services/profileService";

const Spellingbee = ({ user }) => {

  const { speak } = useSpeechSynthesis();

  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [allWords, setAllWords] = useState();
  const [click, setClick] = useState(0);
  const [profile, setProfile] = useState();

  let spellingWord = [];

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileData = await getProfileById(user.profile);
        setProfile(profileData);
      } catch (error) {
        throw error;
      }
    };
    getProfile();
  }, [user.profile]);

  useEffect(() => {
    if (profile?.grade) {
      const getWords = async () => {
        try {
          const allWordData = await getAllWords();
          const studyList = allWordData.filter(
            (word) => word.gradeLevel === profile.grade
          );
          setAllWords(studyList);
        } catch (error) {
          throw error;
        }
      };
      getWords();
    }
  }, [profile, user.profile]);

  if (allWords) {
    if (click >= allWords.length) {
      spellingWord = [];
      setClick(0);
    }
    if (click < allWords.length) {
    }
    spellingWord = allWords[click];
  }

  const word = () => {
    setMessage("this is the next word to spell.", spellingWord.word);
    speak({ text: spellingWord.word });
  };

  const definition = () => {
    setMessage("you asked for the definition of the word.");
    speak({ text: spellingWord.definition });
  };

  const chris = () => {
    setMessage("Chris, I just wanted to say, I think you are awesome!");
    speak({ text: "Chris, I just wanted to say, I think you are awesome!" });
  };

  const hello = () => {
    setMessage("Hi there!");
    speak({ text: "Hi there!" });
  };

  const nextWord = () => {
    setMessage("Moving on to the next word");
    setClick(click + 1);
    setValue("You have asked for the next word.");
    speak({ text: "You have asked for the next word. The next word is:" });
    speak({ text: spellingWord.word });
  };

  const commands = [
    {
      command: "reset",
      callback: () => resetTranscript(),
    },
    {
      command: "repeat the word please",
      callback: () => {
        word()
        resetTranscript()
      }
    },
    {
      command: "could I have the definition please",
      callback: () => {definition()
      resetTranscript()
      }
    },
    {
      command: "chris",
      callback: () => {
        chris()
        resetTranscript()
      }
    },
    {
      command: "Hello",
      callback: () => hello(),
    },
    {
      command: "clear",
      callback: () => resetTranscript(),
    },
    {
      command: "next word please",
      callback: () => {
        nextWord()
        resetTranscript()
      }
    },
  ];

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });



  useEffect(() => {
    console.log("use effect");
    if (finalTranscript !== "") {
      console.log("Got final result:", finalTranscript);
      const checkSpelling = () => {
        console.log("transcript: ", transcript)
        if (transcript === spellingWord.word){
          speak({ text: "Yay! That is correct!" })
        } else {
          speak({ text: "I am sorry, that is not correct." })
        }
      }
      checkSpelling()
    }
  }, [interimTranscript, finalTranscript, value, speak, spellingWord.word, transcript])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }

  const listenContinuously = () => {
    console.log("listening");
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB",
    });
  };



  return (
    <>
      <p>Spelling Bee Mode</p>
      <div>
        <div id="current commands">
          <p><b>Current speach commands:</b>
          <br /><br />
          <b> reset: </b> resets transcript
          <br />
          <br />
          <b> repeat the word please: </b>repeats the word
          <br />
          <br />
          <b> could I have the definition please: </b>gives the definition of the word
          <br />
          <br />
          <b> hello: </b>a test phrase that has remained in the code.
          <br />
          <br />
          <b> clear: </b>same as reset.
          <br />
          <br />
          <b> next word please: </b>currently acts as the next button function
          <br />
          <br />
          </p>
        </div>
        <div>
          <span>listening: {listening ? " on" : " off"}</span>
          <div>
            <button type="button" onClick={resetTranscript}>
              Reset
            </button>
            <button type="button" onClick={listenContinuously}>
              Listen
            </button>
            <button type="button" onClick={SpeechRecognition.stopListening}>
              Stop
            </button>
          </div>
        </div>
        <div>
          <b>Message set in command function: </b>
          {message}
        </div>
        <br />
        <br />
        <div>
          <b>On going LIVE transcript of all spoken words: </b>
          <span>{transcript}</span>
        </div>
      </div>
    </>
  );
};

export default Spellingbee;
