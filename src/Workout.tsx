import exercises from './config/exercises';
import './Workout.css';

// just doing amrap for now
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

const exerciseHeading: string = 'AMRAP';
const exerciseSubHeading: string = 'As many reps as possible - in 20 minutes.';

function getRandomWeightedExercise(exercises: Exercise[]): Exercise {
  const cumulativeWeights: Array<number> = [];
  for (let i = 0; i < exercises.length; i++) {
    cumulativeWeights[i] = exercises[i].likelihood + (cumulativeWeights[i - 1] || 0);
  }
  const random = Math.random() * cumulativeWeights[cumulativeWeights.length - 1];
  for (let i = 0; i < cumulativeWeights.length; i++) {
    if (random < cumulativeWeights[i]) {
      return exercises[i];
    }
  }
  return exercises[exercises.length - 1];
}

function getNRandomExercises(num: number, exercises: Array<Exercise>) {
  const selectedExercises: Array<Exercise> = [];
  console.log('here we go', exercises);//TODO make sure stops when no more exercises
  while (selectedExercises.length < num/*  && exercises.length */) {
    const selectedExercise: Exercise = getRandomWeightedExercise(exercises);
    selectedExercises.push(selectedExercise);
    //todo replace the below with selecting an index not an object as this is needless
    const indexOfSelected = selectedExercises.findIndex(ex => ex.name === selectedExercise.name);
    exercises.splice(indexOfSelected, 1);
  }
  return selectedExercises;
}

const selectedExercises = getNRandomExercises(4, exercises);
const exData = selectedExercises.map(ex => {
  const range = ex.max - ex.min;
  
  // Calculate 35% and 65% of the range
  const lowerBound = ex.min + 0.35 * range;
  const upperBound = ex.min + 0.65 * range;
  
  // Generate a random number between lowerBound and upperBound
  const reps = Math.round(lowerBound + Math.random() * (upperBound - lowerBound));
  return {name: ex.name, reps};
});

const workoutData = exData;

function Workout () {
  return (
    <div className="Workout">
      <h2>workout!</h2>
      <h3>Today's workout: {exerciseHeading}</h3>
      <p>Today's workout: {exerciseSubHeading}</p>
      <hr/>
      <table>
        <thead>
          <tr>
            <th>Exercise</th><th>Reps</th>
          </tr>
        </thead>
        <tbody>
          {workoutData.map((ex, index) => (
            <tr key={index}>
              <td>{ex.name}</td>
              <td>{ex.reps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workout;