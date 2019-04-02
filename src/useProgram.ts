import { useState, useCallback, useEffect } from "react";
import { getCumulativeStates } from "./getCumulativeStates";
import {
  ILessonSetup,
  ILessonCommands,
  IProgramState
} from "./components/types";

export const useProgram = ({
  getProgram,
  lesson,
  timeBetweenCommands
}: {
  lesson: ILessonSetup;
  getProgram: (commands: ILessonCommands) => void;
  timeBetweenCommands: number;
}) => {
  const [commandIndex, setCommandIndex] = useState(0);
  const [success, setSuccess] = useState(null as boolean | null);
  const [cumulativeStates, setCumulativeStates] = useState(
    [] as IProgramState[]
  );
  const [programCancel, setProgramCancel] = useState(
    null as NodeJS.Timeout | null
  );
  const [{ running, done }, setRunningAndDone] = useState({
    running: false,
    done: false
  });
  useEffect(() => {
    const { cumulativeStates, success } = getCumulativeStates({
      getProgram,
      lesson
    });
    setCommandIndex(0);
    setCumulativeStates(cumulativeStates);
    setSuccess(success);
  }, [lesson, getProgram]);

  const start = useCallback(() => {
    if (!cumulativeStates) {
      return () => {};
    }
    let nextCommandIndex = commandIndex;
    setRunningAndDone({ running: true, done: false });
    const cancelWhenDone = setInterval(() => {
      nextCommandIndex++;
      if (nextCommandIndex >= cumulativeStates.length) {
        clearInterval(cancelWhenDone);
        setRunningAndDone({ running: false, done: true });
        return () => {};
      }
      setCommandIndex(nextCommandIndex);
    }, timeBetweenCommands);
    setProgramCancel(cancelWhenDone);
    return () => {
      clearInterval(cancelWhenDone);
    };
  }, [cumulativeStates, timeBetweenCommands, commandIndex]);

  const reset = useCallback(() => {
    if (!cumulativeStates) {
      return;
    }
    if (programCancel) {
      clearInterval(programCancel);
    }
    setCommandIndex(0);
    setRunningAndDone({ running: false, done: false });
  }, [programCancel, cumulativeStates]);

  return {
    programState: cumulativeStates && cumulativeStates[commandIndex],
    commands: cumulativeStates
      ? cumulativeStates.map(x => x.fromCommand || "")
      : [],
    commandIndex,
    reset: running || done ? reset : null,
    start: !running && !done ? start : null,
    success: done && success,
    failure: done && !success
  };
};
