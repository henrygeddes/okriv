import React, { Component } from 'react';
import Viewport from './Viewport';

class Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes:   [],
            edges:   [],
            depthMap: {},
            bounds:  { x: 0, y: 0 },
            offset: { x: 0, y: 0 }
        };
    }

    componentDidMount() {
        this.updateBounds();
        this.updateGraph();
    }

    updateBounds() {
        this.setState({
            bounds: {
                x: window.innerWidth,
                y: window.innerHeight
            }
        });
    }

    updateGraph() {
        const root  = this.props.root;

        this.hydrateNodes(root, null, 0);

        const depthMap = this.getDepthMap();
        const edges    = this.getEdges(depthMap);

        this.setState({ edges, depthMap });

        /*
        root.objectives.forEach( objective => {
            nodes.push({
                id: `objective__${objective.id}`,
                label: objective.title
                type: 'objective',
                depth: depth
            });
        });
        */
    }

    hydrateNodes(root, parentId, depth) {
        const nodeId = `${root.name}__${root.id}`;

        this.pushNode({
            id:     nodeId,
            parentId: parentId,
            label:  root.name,
            type:   root.name,
            depth:  depth,
        });

        root.children.forEach(child => this.hydrateNodes(child, nodeId, depth + 1));
    }

    getEdges(depthMap = null) {
        if( ! depthMap )
            depthMap = this.state;

        const edges = [];
        Object.keys(depthMap).forEach(depth => {
            // eslint-disable-next-line
            depth = parseInt(depth); 

            if( depth === 0 )
                return;

            const parentLevel  = depthMap[depth - 1];
            const currentLevel = depthMap[depth];

            currentLevel.forEach( currentLevelNode => {
                const matchedNodes = parentLevel.filter( parentLevelNode => parentLevelNode.id === currentLevelNode.parentId );

                matchedNodes.forEach( parentMatch => {
                    edges.push({
                        parent: parentMatch.id,
                        child: currentLevelNode.id
                    });
                });
            });
        });

        return edges;
    }

    pushNode(node) {
        const nodes = this.state.nodes;
        nodes.push(node);
        this.setState({ nodes });
    }

    pushEdge(edge) {
        const edges = this.state.edges;
        edges.push(edge);
        this.setState({ edges });
    }

    updateOffset(x, y) {
        this.setState({
            offsets: { x, y }
        });
    }

    getDepthMap() {
        const { nodes } = this.state;

        const nodesSorted = nodes.sort((a, b) => a.depth - b.depth);
        const depthMap = nodesSorted.reduce((depthMap, node) => {
            if( ! depthMap[node.depth] )
                depthMap[node.depth] = [];

            depthMap[node.depth].push(node);

            return depthMap;
        }, {} );

        return depthMap;
    }

    render() {
        const { bounds, offset, nodes, edges, depthMap } = this.state;

        const style = {
            width: bounds.x,
            height: bounds.y,
            left: offset.x,
            top: offset.y
        };

        return (
            <div className="container" style={style}>
                <Viewport
                    nodes={nodes}
                    edges={edges}
                    depthMap={depthMap}
                    updateOffset={this.updateOffset.bind(this)}
                />
            </div>
        );
    }
}

export default Container;
