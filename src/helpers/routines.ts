import {pickRandomWeight} from '../helpers/chance';
import exercises from '../config/exercises';
import '../helpers/interfaces';

// doubled, fix this
interface Exercise {
    name: string;
    min: number;
    max: number;
    canPyramid: boolean;
    likelihood: number;
  };

interface ExerciseAndRep {
  name: string;
  reps: number;
};




function getNRandomExercises(num: number, exercises: Array<Exercise>) {
  const weights = exercises.map(e => e.likelihood);
  const selectedExercises: Array<Exercise> = [];
  console.log('here we go', exercises);
  while (selectedExercises.length < num && exercises.length) {
    const index: number = pickRandomWeight(weights);
    // Splice out the weight, and the exercise for use in the selectedExercises
    selectedExercises.push(exercises.splice(index, 1)[0]);
    weights.splice(index, 1);
  }
  return selectedExercises;
}

export const createAmrap = (): Array<ExerciseAndRep> => {
  const selectedExercises: Array<Exercise> = getNRandomExercises(4, exercises);
  
  return selectedExercises.map(ex => {
    const range = ex.max - ex.min;
    
    // Calculate 35% and 65% of the range
    const lowerBound = ex.min + 0.35 * range;
    const upperBound = ex.min + 0.65 * range;
    
    // Generate a random number between lowerBound and upperBound
    const reps = Math.round(lowerBound + Math.random() * (upperBound - lowerBound));
    return {name: ex.name, reps};
  });
}

export const createPyramid = (): Array<ExerciseAndRep> => {
  const selectedExercises = getNRandomExercises(4, exercises.filter(e => e.canPyramid));
  return selectedExercises.map(e => {
    return {name: e.name, reps: 1};
  });
}