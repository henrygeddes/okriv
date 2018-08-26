import React, { Component } from 'react';

class Viewport extends Component {
    constructor(props) {
        super(props);

        this.state = { domNodes: [] };
    }
    
    componentWillMount(prevProps) {
        const domNodes = this.createNodesForDom(this.props.nodes);
        this.setState({ domNodes });
    }

    createNodesForDom(nodes) {
        if (nodes.length == 0) return [];

        let node = nodes.shift();

        node.style = {
            top: node.position.offsetY,
            left: node.position.offsetX
        };

        return [node, ...this.createNodesForDom(nodes), ...this.createNodesForDom(node.children)];
    }

    render() {
        const { domNodes } = this.state;

        return (
            <div className="viewport">
                { domNodes.map( (o,i) => 
                    <div 
                        className={`node node--${o.type}`}
                        style={o.style}
                        key={o.id}
                    >
                        { o.name }
                    </div>
                ) }
            </div>
        );
    }
}

export default Viewport;
