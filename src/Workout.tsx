import './Workout.css';
import {createAmrap, createPyramid} from './helpers/routines';

// just doing amrap for now

// const exerciseHeading: string = 'AMRAP';
// const exerciseSubHeading: string = 'As many reps as possible - in 20 minutes.';

const exerciseHeading: string = 'Pyramid';
const exerciseSubHeading: string = '1,2,3,4,5...up to 10 and back to 1';

// const workoutData = createAmrap();
const workoutData = createPyramid();

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