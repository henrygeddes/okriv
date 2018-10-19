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
        console.log(nodes)

        let node = nodes.shift();
        let colors = [
            'white',
            'blue',
            'red'
        ]

        node.style = {
            top: node.position.offsetY,
            left: node.position.offsetX,
            'background-color': colors[node.position.depth]
        };

        return [node, ...this.createNodesForDom(nodes), ...this.createNodesForDom(node.children)];
    }

    render() {
        const { domNodes } = this.state;
        const viewportStyle = this.props.style;

        return (
            <div className="viewport" style={viewportStyle}>
                { domNodes.map( (o,i) => 
                    <div 
                        className={`node node--${o.type}`}
                        style={o.style}
                        key={o.id}
                    >
                        { o.name || o.title }
                    </div>
                ) }
            </div>
        );
    }
}

export default Viewport;
