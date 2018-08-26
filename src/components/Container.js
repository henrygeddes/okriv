import React, { Component } from 'react';
import Viewport from './Viewport';
import Positioning from '../services/Positioning';

class Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nodes:   []
        };
    }

    componentWillMount() {
        let nodes = this.hydrateNodes(this.props.root, null);
        nodes = [Positioning.tree(nodes)];
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
            <div className="container">
                <Viewport
                    nodes={this.state.nodes}
                />
            </div>
        );
    }
}

export default Container;
