import React, { Component } from 'react';

class Viewport extends Component {
    constructor(props) {
        super(props);

        this.state = { domNodes: [] };
    }

    componentDidUpdate(prevProps) {
        if( ! prevProps.edges.length )
            this.createNodesForDom();
    }

    createNodesForDom() {
        const domNodes = [];
        const { depthMap, edges } = this.props;
console.log(this.props);
        const rows = {};

        Object.keys(depthMap).forEach(depth => {
            let rowWidth = 0;
            let rowHeight = 0;

            depthMap[depth].forEach((node, xDepth) => {
                const style = {
                    top: depth * 100,
                    left: rowWidth + xDepth * 100
                };

                rowWidth += node.label.length * 6;

                domNodes.push({
                    style: style,
                    node: node,
                    width: node.label.length * 6
                });
            });

            rows[depth] = {
                width: rowWidth,
                nodeCount: depthMap[depth].length
            };
        });

        domNodes[0].style.left = (rows[1].nodeCount * 100 + rows[1].width) / 2 - domNodes[0].width;


        this.setState({ domNodes });
    }

    render() {
        // const nodes = this.createNodesForDom();
        const { domNodes } = this.state;

        return (
            <div className="viewport">
                { domNodes.map( o => 
                    <div 
                        className={`node node--${o.node.type}`}
                        style={o.style}
                        key={o.node.id}
                    >
                        { o.node.label }
                    </div>
                ) }
            </div>
        );
    }
}

export default Viewport;
