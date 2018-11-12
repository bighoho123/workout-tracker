import React, { Component } from "react";
import { Button, Card, Elevation, Icon } from "@blueprintjs/core";

class WorkoutCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            weight: props.weight,
            rep: props.rep,
            e1rmList: this.calculateTable()
        };
    }

    calculateTable() {
        const MAX_WEIGHT = 160;
        const MIN_WEIGHT = 20;
        const WEIGHT_STEP = 2.5;

        const MAX_REP = 12;
        const MIN_REP = 5;

        let result = [];
        for (let rep = MIN_REP; rep <= MAX_REP; rep++) {
            for (
                let weight = MIN_WEIGHT;
                weight < MAX_WEIGHT;
                weight += WEIGHT_STEP
            ) {
                result.push({
                    rep,
                    weight,
                    e1rm: this.e1rm(weight, rep)
                });
            }
        }

        return result.sort((a, b) => a.e1rm - b.e1rm);
    }

    e1rm(weight, rep) {
        return (weight * rep) * 0.333 + weight;
    }

    nextGoal() {
        const currentE1RM = this.e1rm(this.state.weight, this.state.rep);
        for (let index = 0; index < this.state.e1rmList.length; index++) {
            const e1rm = this.state.e1rmList[index].e1rm;
            if (currentE1RM < e1rm) {
                return this.state.e1rmList[index];
            }
        }
        return null;
    }

    previousGoal() {
        const currentE1RM = this.e1rm(this.state.weight, this.state.rep);
        for (let index = this.state.e1rmList.length - 1; index >= 0; index--) {
            const e1rm = this.state.e1rmList[index].e1rm;
            if (currentE1RM > e1rm) {
                return this.state.e1rmList[index];
            }
        }
        return null;
    }

    moveToNext = () => {
        const nextGoal = this.nextGoal();
        this.setState({
            weight: nextGoal.weight,
            rep: nextGoal.rep
        });
    }

    moveToPrevious = () => {
        const previousGoal = this.previousGoal();
        this.setState({
            weight: previousGoal.weight,
            rep: previousGoal.rep
        });
    }

    render() {
        const nextGoal = this.nextGoal();
        const previousGoal = this.previousGoal();

        return <Card className='workout-card' elevation={Elevation.TWO}>
                <h5>{this.state.name}</h5>
                <div>
                    <div>Weight</div>
                    <div>
                        {previousGoal ? previousGoal.weight : "NA"}
                    </div>
                    <div>
                        <b>
                            {this.state.weight}
                            kg
                        </b>
                    </div>
                    <div>{nextGoal ? nextGoal.weight : "NA"}</div>
                </div>

                <div>
                    <div>Rep</div>
                    <div>{previousGoal ? previousGoal.rep : "NA"}</div>
                    <div>
                        <b>{this.state.rep}</b>
                    </div>
                    <div>{nextGoal ? nextGoal.rep : "NA"}</div>
                </div>
                <Button onClick={this.moveToPrevious} disabled={!previousGoal}>
                    Less
                </Button>
                <Button onClick={this.moveToNext} disabled={!nextGoal}>
                    More
                </Button>
            </Card>;
    }
}

export default WorkoutCard;
