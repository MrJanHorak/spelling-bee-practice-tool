import React, { useCallback, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import { useSpeechSynthesis } from "react-speech-kit";

// Services
import { getAllWords } from "../../services/wordService";
import { getProfileById } from "../../services/profileService";

//assets
import "../../styles/SpellingBeeMode.css";

const appId = process.env.REACT_APP_SPEECHLY_API_KEY;
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Spellingbee = ({ user }) => {
  const { speak } = useSpeechSynthesis();

  const [message, setMessage] = useState("");
  const [allWords, setAllWords] = useState();
  const [click, setClick] = useState(0);
  const [profile, setProfile] = useState();

  let spellingWord = [];

  const shuffleArr = (array) => {
    console.log("i'm shuffeling the words");
    for (let i = array.length - 1; i > 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      [array[i], array[rand]] = [array[rand], array[i]];
    }
  };

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
          shuffleArr(studyList);
          setAllWords(studyList);
        } catch (error) {
          throw error;
        }
      };
      getWords();
    }
  }, [profile, user.profile]);

  if (allWords) {
    if (click === 0) {
      spellingWord = allWords[click];
    }
    if (click > 0 && click < allWords.length) {
      spellingWord = allWords[click];
    }
  }

  const listenContinuously = useCallback(async () => {
    console.log("listening");
    setMessage("I am listening again.");
    await SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  }, []);

  const word = () => {
    SpeechRecognition.stopListening();
    setMessage("You asked to hear the word again.");
    setTimeout(() => {
      listenContinuously();
    }, 1500);
    speak({ text: spellingWord.word });
    resetTranscript();
  };

  const definition = () => {
    SpeechRecognition.stopListening();
    setMessage("You asked for the definition of the word.");
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
    setMessage("You asked for the next word.");
    if (click < allWords.length - 1) {
      setClick(click + 1);
      setTimeout(() => {
        listenContinuously();
      }, 5500);
      speak({ text: "You have asked for the next word. The next word is:" });
      speak({ text: allWords[click + 1].word });
      resetTranscript();
    } else {
      speak({
        text: "That was the last word. To start over please press start!",
      });
      setClick(0);
    }
  };

  const stop = () => {
    SpeechRecognition.stopListening();
    setMessage("I am no longer listening.");
    speak({ text: "I am no longer listening." });
    resetTranscript();
  };

  const commands = [
    {
      command: "RESET",
      callback: () => resetTranscript(),
    },
    {
      command: "PLEASE REPEAT THE WORD",
      callback: () => word(),
    },
    {
      command: "MAY I HAVE THE DEFINITION PLEASE",
      callback: () => definition(),
    },
    {
      command: "HELLO",
      callback: () => hello(),
    },
    {
      command: "CLEAR",
      callback: () => resetTranscript(),
    },
    {
      command: "MAY I HAVE THE NEXT WORD PLEASE",
      callback: () => nextWord(),
    },
    {
      command: "PLEASE STOP LISTENING",
      callback: () => stop(),
    },
  ];

  const {
    // interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  const guessedWord = useCallback(() => {
    SpeechRecognition.stopListening();
    if (click < allWords.length - 1) {
      setClick(click + 1);
      setMessage("Congratulations! \n That was correct!");
      setTimeout(() => {
        listenContinuously();
      }, 9500);
      speak({
        text: `Congratulations!! You have spelled ${allWords[click].word} correctly! Get ready for the next word. The next word is:`,
      });
      speak({ text: allWords[click + 1].word });
      resetTranscript();
    } else {
      setClick(0);
      setMessage("You have finished the spelling bee!");
      speak({
        text: "Congratulations!! You have completed the spelling bee! If you want to go again, please press start!",
      });
    }
  }, [allWords, click, listenContinuously, speak, resetTranscript]);

  useEffect(() => {
    console.log("transcript: ", finalTranscript.toLowerCase());
    const commandList = [
      "PLEASE REPEAT THE WORD",
      "MAY I HAVE THE DEFINITION PLEASE",
      "MAY I HAVE THE NEXT WORD PLEASE",
      "HELLO",
      "CLEAR",
      "RESET",
      "PLEASE STOP LISTENING",
    ];

    if (finalTranscript !== "") {
      if (!commandList.includes(finalTranscript)) {
        const checkSpelling = () => {
          console.log(
            "transcript: ",
            finalTranscript.toLowerCase().replace(/\s+/g, "")
          );
          if (
            finalTranscript.toLowerCase().replace(/\s+/g, "") ===
            spellingWord.word
          ) {
            SpeechRecognition.stopListening();
            resetTranscript();
            guessedWord();
          } else {
            SpeechRecognition.stopListening();
            setTimeout(() => {
              SpeechRecognition.startListening({
                continuous: true,
                language: "en-GB",
              });
            }, 2500);
            console.log("not correct!");
            setMessage("I am sorry.\n That is not correct.");
            speak({ text: "I am sorry, that is not correct." });
            resetTranscript();
          }
        };
        checkSpelling();
      }
    }
  }, [
    // interimTranscript,
    finalTranscript,
    spellingWord.word,
    speak,
    resetTranscript,
    guessedWord,
  ]);

  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return null;
  // }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }

  const startSpellingBee = () => {
    setMessage("Welcome! You have started the spelling bee!");
    setTimeout(() => {
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-GB",
      });
    }, 6000);
    speak({ text: "Hello " + user.name + "welcome to the Spelling bee!" });
    speak({ text: "The first word for today is: " + allWords[click].word });
  };

  return (
    <div id="spellingBeeMode-page">
      <div className="form-container" id="speak">
        <div>
          <span>
            <h3>
              <b>listening: {listening ? " on" : " off"}</b>
            </h3>
          </span>
          <div>
            {/* <button type="button" onClick={resetTranscript}>
              Reset
            </button> */}
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
        <br />
        <div>
          {/* <b>Message: </b><br /> */}
          {message}
        </div>
        <br />
        {/* <div>
          <b>On going LIVE transcript of all spoken words: </b>
          <span>{transcript}</span>
        </div> */}
      </div>
      <div className="form-container" id="voice-commands">
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
              <b>Please stop listening.</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Spellingbee;
