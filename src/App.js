import './css/App.css';

import React, { Component } from 'react';
import Container from './components/Container';


import mockEntities from './fixtures/EntitiesMock';
import mockObjectives from './fixtures/ObjectivesMock';

// api/entities = all entities as flat rows
// api/entities/${id} = single entity row
// api/objectives = all
// api/results = all

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { root: null };
    }

    componentWillMount() {
        this.fetchEntity()
            .then(root => this.hydrateObjectives(root));
    }

    fetchEntity() {
        return fetch('https://okr.r3connect.me/api/entities/the-iconic').then(res => res.json()).then(res => res.data);
    }

    fetchEntityObjectives(id) {
        return fetch("https://okr.r3connect.me/api/entities/the-iconic/objectives").then(res => res.json()).then(res => res.data);
    }

    hydrateObjectives(root) {
        return this.fetchEntityObjectives()
            .then(objectives => objectives.map(objective => root.objective = objective))
            .then(objectives => this.setState({ root: root }))
            .then(e => root);
    }

    render() {
        const { root } = this.state;

        if (!root) {
            return null;
        }

        return (
            <Container 
                root={root}
            />
        );
    }
}

export default App;
