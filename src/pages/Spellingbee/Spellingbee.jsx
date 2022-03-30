import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";

// Services
import { getAllWords } from "../../services/wordService";
import { getProfileById } from "../../services/profileService";


const Spellingbee = ({ user }) => {
  const [value, setValue] = useState("");
  const { speak } = useSpeechSynthesis();
  const [message, setMessage] = useState("");
  const [allWords, setAllWords] = useState();
  const [click, setClick] = useState(0);
  const [profile, setProfile] = useState()

  let spellingWord = [];

  useEffect(() => {
    const getProfile = async () => {
      try {
      const profileData = await getProfileById(user.profile)
      setProfile(profileData)
    } catch (error) {
      throw error;
    }}
  getProfile()
},[user.profile])

useEffect(() => {
  if (profile?.grade){
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
}, [profile,user.profile]);

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
    setMessage("this is the next word to spell.", spellingWord);
    setValue(spellingWord.word);
    speak({ text: value });
  };

  const definition = () => {
    setMessage("you asked for the definition of the word.", spellingWord.definiton);
    setValue(spellingWord.definition);
    speak({ text: value });
  };

  const chris = () => {
    setMessage("Chris, I just wanted to say, I think you are awesome!");
    setValue("Chris, I just wanted to say, I think you are awesome!");
    speak({ text: value });
  };

  const hello = () => {
    setMessage("Hi there!");
    setValue("Hi there!");
    speak({ text: value });
  };

  const commands = [
    {
      command: "reset",
      callback: () => resetTranscript(),
    },
    {
      command: "word",
      callback: () => word(),
    },
    {
      command: "definition",
      callback: () => definition(),
    },
    {
      command: "chris",
      callback: () => chris(),
    },
    {
      command: "Hello",
      callback: () => hello(),
    },
    {
      command: "clear",
      callback: () => resetTranscript(),
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
    }
  }, [interimTranscript, finalTranscript]);

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
        <div>{message}</div>
        <div>
          <span>{transcript}</span>
        </div>
      </div>
    </>
  );
};

export default Spellingbee;
