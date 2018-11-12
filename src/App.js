import React, { Component } from "react";
import store from "./store.js";
import "./App.css";
import { H1, Button, Dialog, InputGroup, FormGroup } from "@blueprintjs/core";
import WorkoutCard from "./WorkoutCard";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewWorkoutDialogOpen: false
        };
    }

    openNewWorkoutDialog = () => {
        this.setState({ isNewWorkoutDialogOpen: true });
    };
    closeNewWorkoutDialog = () => {
        this.setState({ isNewWorkoutDialogOpen: false });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <H1>Workout Tracker</H1>
                    <Button
                        intent="success"
                        text="Add a new workout"
                        onClick={this.openNewWorkoutDialog}
                    />
                    <Dialog
                        title="New Workout"
                        usePortal
                        isOpen={this.state.isNewWorkoutDialogOpen}
                        onClose={this.closeNewWorkoutDialog}
                    >
                        <FormGroup
                            helperText="Squat, Bench Press, Deadlift etc..."
                            label="Workout Name"
                            labelFor="new-workout-name"
                        >
                            <InputGroup
                                id="new-workout-name"
                                placeholder="Workout Name"
                            />
                        </FormGroup>
                        <FormGroup
                            helperText="Max 160 / Min 20"
                            label="Weight in kg"
                            labelFor="new-workout-weight"
                        >
                            <InputGroup
                                id="new-workout-weight"
                                placeholder="Current weight you are using"
                            />
                        </FormGroup>
                        <FormGroup
                            helperText="Max 12 / Min 5"
                            label="Repetitions"
                            labelFor="new-workout-rep"
                        >
                            <InputGroup
                                id="new-workout-rep"
                                placeholder="Current repetitions you are using"
                            />
                        </FormGroup>
                        <Button intent='primary'>Confirm</Button>
                    </Dialog>
                    <WorkoutCard name={"BENCH PRESS"} weight={70} rep={6} />
                </header>
            </div>
        );
    }
}

export default App;
