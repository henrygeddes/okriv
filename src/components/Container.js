import React, { Component } from 'react';
import Viewport from './Viewport';
import Positioning from '../services/Positioning';

class Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            style:  {
                width: window.innerWidth,
                height: window.innerHeight
            },
            viewportStyle: {
                width: window.innerHeight - 400,
                height: window.innerHeight - 400                
            },
            nodes:   []
        };
    }

    componentWillMount() {
        let nodes = this.hydrateNodes(this.props.root, null);
        nodes = [Positioning.tree(nodes, this.state.viewportStyle)];
        this.setState({ nodes });
    }

    hydrateNodes(root, depth, removeId) {
        root.depth = depth;
        root.children = root.child_entities || [];

        root.children.forEach(child => this.hydrateNodes(child, depth + 1));

        return root;
    }

    render() {

        return (
            <div className="container" style={this.state.style}>
                <Viewport
                    nodes={this.state.nodes}
                    style={this.state.viewportStyle}
                />
            </div>
        );
    }
}

export default Container;
