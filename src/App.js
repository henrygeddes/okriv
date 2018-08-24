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
        this.fetchEntity(this.props.rootId)
            .then(res => {
                root = res;
                return root.children = root.child_entities;
            })
            .then(root => {
                this.setState({ root: this.hydrateObjectives(root) });
            })

    }

    async fetchEntity(id) {
        return await fetch('https://okr.r3connect.me/api/entities/the-iconic').then(res => res.json());
    }

    fetchChildren(entityId) {
        return (
            mockEntities
            .filter( entity => entity.parentId === entityId )
            .map( entity => { 
                entity.children = this.fetchChildren(entity.id); 
                return entity;
            })
        );
    }

    hydrateObjectives(root) {
        root.objectives = mockObjectives.filter( objective => objective.entityIds.includes(root.id) );

        root.children = root.children.map( child => {
            child = this.hydrateObjectives(child);
            return child;
        });

        return root;
    }

    render() {
        const { root } = this.state;

        return (
            <Container 
                root={root}
            />
        );
    }
}

export default App;
