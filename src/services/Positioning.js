const DEFAULTS = {
    canvas: {
        height: 1000,
        width: window.innerWidth
    },
    nodes: {
        width: 112,
        height: 112,
    }
}

class Positioning {

    updateTreePosition(root, depthNodesCount = 0, column = 0) {
        root.position = {
            offsetX: this.getOffsetX(DEFAULTS.canvas.width, DEFAULTS.nodes.width, depthNodesCount, column),
            offsetY: this.getOffsetY(DEFAULTS.nodes.height, root.depth, depthNodesCount, column)
        }

        if (! root.child_entities) return root;

        depthNodesCount = root.child_entities.length;
        root.child_entities.map( (child, pos) => this.updateTreePosition(child, depthNodesCount, pos));

        return root;
    }

    getOffsetX(canvasWidth, width, depthNodesCount, column) {
        let nodes_width = width * depthNodesCount;
        let inBetween = depthNodesCount !== 0 ? Math.floor((canvasWidth - nodes_width) / depthNodesCount) : canvasWidth / 2;

        return ((inBetween * (column + 1)) + column * width) - (width / 2)
    }

    getOffsetY(height, depth, depthNodesCount, column) {
        let middle = (depthNodesCount - 1) / 2;
        let offsetY = ((height * (depth + 1)) + depth * height / 2);

        column = column > middle ? depthNodesCount - 1 - column : column;

        return offsetY + offsetY * 0.2 * column;
    }

    tree(root) {
        return this.updateTreePosition(root);
    }
}

export default new Positioning();