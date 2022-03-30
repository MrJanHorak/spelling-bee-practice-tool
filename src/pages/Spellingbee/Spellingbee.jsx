import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";

const Spellingbee = (props) => {
  const [value, setValue] = useState("");
  const { speak } = useSpeechSynthesis();
  const [message, setMessage] = useState("");

  const word = () => {
    setMessage("I will show/say the next word.");
    setValue("I will show/say the next word");
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
