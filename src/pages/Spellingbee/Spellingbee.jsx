import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";

// Services
import { getAllWords } from "../../services/wordService";
import { getProfileById } from "../../services/profileService";

import "../../styles/SpellingBeeMode.css";

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

  const listenContinuously = () => {
    console.log("listening");
    setMessage("I am listening again.", spellingWord.word);
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB",
    });
  };

  const word = async () => {
    SpeechRecognition.stopListening();
    setMessage("this is the next word to spell.", spellingWord.word);
    setTimeout(() => {
      listenContinuously();
    }, 1500);
    speak({ text: spellingWord.word });
    resetTranscript();
  };

  const definition = () => {
    SpeechRecognition.stopListening();
    setMessage("you asked for the definition of the word.");
    setTimeout(() => {
      listenContinuously();
    }, 7000);
    speak({ text: spellingWord.definition });
    resetTranscript();
  };

  const hello = () => {
    SpeechRecognition.stopListening();
    setMessage("Hi there!");
    setTimeout(() => {
      listenContinuously();
    }, 1500);
    speak({ text: "Hi there!" });
    resetTranscript();
  };

  const nextWord = () => {
    SpeechRecognition.stopListening();
    setClick(click + 1);
    setValue("You have asked for the next word.");
    setTimeout(() => {
      listenContinuously();
    }, 5500);
    speak({ text: "You have asked for the next word. The next word is:" });
    speak({ text: allWords[click + 1].word });
    resetTranscript();
  };

  const commands = [
    {
      command: "reset",
      callback: () => resetTranscript(),
    },
    {
      command: "please repeat the word",
      callback: () => word(),
    },
    {
      command: "may I have the definition please",
      callback: () => definition(),
    },
    {
      command: "hello",
      callback: () => hello(),
    },
    {
      command: "clear",
      callback: () => resetTranscript(),
    },
    {
      command: "may I have the next word please",
      callback: () => nextWord(),
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
    const commandList = [
      "please repeat the word",
      "may I have the definition please",
      "may I have the next word please",
      "hello",
      "clear",
      "reset",
    ];

    if (finalTranscript !== "") {
      if (!commandList.includes(finalTranscript)) {
        const checkSpelling = () => {
          console.log("transcript: ", finalTranscript);
          if (finalTranscript.toLowerCase() === spellingWord.word) {
            SpeechRecognition.stopListening();
            setTimeout(() => {
              SpeechRecognition.startListening({
                continuous: true,
                language: "en-GB",
              });
            }, 2500);
            speak({ text: "Yay! That is correct!" });
            resetTranscript();
          } else {
            SpeechRecognition.stopListening();
            setTimeout(() => {
              SpeechRecognition.startListening({
                continuous: true,
                language: "en-GB",
              });
            }, 2500);
            console.log("not correct!");
            speak({ text: "I am sorry, that is not correct." });
            resetTranscript();
          }
        };
        checkSpelling();
      }
    }
  }, [
    interimTranscript,
    finalTranscript,
    value,
    spellingWord.word,
    speak,
    resetTranscript,
  ]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }

  const startSpellingBee = () => {
    console.log("starting");
    speak({ text: "Hello " + user.name + "welcome to the Spelling bee!" });
    speak({ text: "The first word for today is: " + allWords[click].word });
  };

  return (
    <div id="spellingBeeMode-page">
      <h1>Spelling Bee Mode</h1>

      <div className="form-container">
        <div>
          <span>listening: {listening ? " on" : " off"}</span>
          <div>
            <button type="button" onClick={resetTranscript}>
              Reset
            </button>
            <button type="button" onClick={startSpellingBee}>
              Start
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
      <div className="form-container">
        <h2>
          <b>speech commands:</b>
        </h2>
        <div id="list">
          <ul>
            <li>
              <b>Please repeat the word?</b>
            </li>
            <li>
              <b>May I have the definition please?</b>
            </li>
            <li>
              <b>May I have the next word please?</b>
            </li>
            <li>
              <b>Hello!</b>
            </li>
            <li>
              <b>Reset</b>
            </li>
            <li>
              <b>Clear.</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Spellingbee;
