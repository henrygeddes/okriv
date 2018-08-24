import './css/App.css';
import './css/react-vis-style.css';

import React, { Component } from 'react';
import {XYPlot, MarkSeriesCanvas, LineSeriesCanvas} from 'react-vis';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter
} from 'd3-force';

import Container from './components/Container';

import mockEntities from './fixtures/EntitiesMock';
import mockObjectives from './fixtures/ObjectivesMock';
import Data from './fixtures/ReactVisData.json';

// api/entities = all entities as flat rows
// api/entities/${id} = single entity row
// api/objectives = all
// api/results = all

const colors = [
  '#19CDD7',
  '#DDB27C',
  '#88572C',
  '#FF991F',
  '#F15C17',
  '#223F9A',
  '#DA70BF',
  '#4DC19C',
  '#12939A',
  '#B7885E',
  '#FFCB99',
  '#F89570',
  '#E79FD5',
  '#89DAC1'
];

function generateSimulation(props) {
	const {data, height, width, maxSteps, strength} = props;
	if (!data) {
		return {nodes: [], links: []};
	}
	// copy the data
	const nodes = data.nodes.map(d => ({...d}));
	const links = data.links.map(d => ({...d}));
	// build the simuatation
	const simulation = forceSimulation(nodes)
	.force('link', forceLink().id(d => d.id))
	.force('charge', forceManyBody().strength(strength))
	.force('center', forceCenter(width / 2, height / 2))
	.stop();

	simulation.force('link').links(links);

	const upperBound = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
	for (let i = 0; i < Math.min(maxSteps, upperBound); ++i) {
		simulation.tick();
	}

	return {nodes, links};
}

const data = {
    data: Data,
    height: 500,
    width: 500,
    maxSteps: 500,
    strength: Math.random() * 60 - 30
}; 

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
            data: generateSimulation(data),
            className: 'testSim',
            animation: null,
            height: data.height,
            width: data.width
		}

        window.update = this.update.bind(this);
	}

    update() {
        data.strength = Math.random() * 60 - 30;

        console.log(data);

        this.setState({ data: generateSimulation(data) });
    }

    render() {
        const { data, className, height, width, animation } = this.state;
        const { nodes, links } = data;

        return (
          <XYPlot width={width} height={height} className={className}>
            {links.map(({source, target}, index) => {
              return (
                <LineSeriesCanvas
                  animation={animation}
                  color={'#B3AD9E'}
                  key={`link-${index}`}
                  opacity={0.3}
                  data={[{...source, color: null}, {...target, color: null}]}
                  />
              );
            })}
            <MarkSeriesCanvas
              data={nodes}
              animation={animation}
              colorType={'category'}
              stroke={'#ddd'}
              strokeWidth={2}
              colorRange={colors}
              />
          </XYPlot>
        );
    }
}

/*
class App extends Component {
    constructor(props) {
        super(props);

        this.state = { root: null };
    }

    componentWillMount() {
        const root = this.fetchEntity(this.props.rootId);

        root.children = this.fetchChildren(root.id);

        this.setState({ root: this.hydrateObjectives(root) });
    }

    fetchEntity(id) {
        id = parseInt(id, 10);
        return mockEntities.filter(o => o.id === id).pop(); // api.fetch(`/api/entities/${id}`);
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
*/

export default App;
