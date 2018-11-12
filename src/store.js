class Store {
    constructor() {
        this.state = {
            workout: []
        };
    }

    addWorkout(workoutName, weight, rep) {
        this.state.workout.push({
            name: workoutName,
            weight: weight,
            rep: rep
        })
    }

    removeWorkout(workoutName) {
        this.state.workout.splice(this.state.workout.findIndex(w => w.name == workoutName), 1);
    }

    updateWorkout(workoutName, newWeight, newRep) {
        this.state.workout.splice(
            this.state.workout.findIndex(w => w.name == workoutName),
            1,
            {
                name: workoutName,
                weight: newWeight,
                rep: newRep
            }
        );
    }
}
const store = new Store();
export default store;