const DEFAULTS = {
    canvas: {
        height: 1000,
        width: 1000
    },
    nodes: {
        width: 100,
        height: 100,
    }
}

class Positioning {

    updateTreePosition(root, levelNodesCount = 1) {
        let nodes_width = DEFAULTS.nodes.width * levelNodesCount;
        let in_between = Math.floor((DEFAULTS.canvas.height - nodes_width) / levelNodesCount);

        root.position = {
            width: DEFAULTS.nodes.width,
            in_between: in_between
        }

        if (! root.child_entities) return root;

        levelNodesCount = root.child_entities.length;
        root.child_entities.forEach(child => this.updateTreePosition(child, levelNodesCount));

        return root;
    }

    tree(root) {
        return this.updateTreePosition(root);
    }
}

export default new Positioning();