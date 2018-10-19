class Positioning {

    updateTreePosition(root, parent, depthNodesCount = 0, index = 0, depth = 0) {
        root.position = {
            offsetX: (!depth) ? this.canvas.width / 2 : this.getOffsetX(parent, this.canvas.width, depthNodesCount, index),
            offsetY: (!depth) ? this.canvas.height / 2 : this.getOffsetY(parent, this.canvas.height, depthNodesCount, index),
            depth: depth
        }

        if (! root.child_entities) return root;

        depthNodesCount = root.child_entities.length;
        depth++;

        root.child_entities.map( (child, index) => this.updateTreePosition(child, root, depthNodesCount, index, depth));

        return root;
    }
    

    getOffsetX(parent, canvasWidth, depthNodesCount, index) {
        const { startRange, endRange } = this.getRanges(parent, index);
        let pos = 360 / depthNodesCount * index;
        let angle = Math.cos(pos / 180 * Math.PI);

        return parent.position.offsetX + ( Math.cos((startRange + index * angle) * (Math.PI / 180)) * this.edgeLength );

        return (angle * this.edgeLength) + parent.position.offsetX;
    }

    getOffsetY(parent, canvasHeight, depthNodesCount, index) {
        const { startRange, endRange } = this.getRanges(parent, index);
        let pos =  360 / depthNodesCount * index;
        let angle = Math.sin(pos / 180 * Math.PI)

        return parent.position.offsetX + ( Math.sin((startRange + index * angle) * (Math.PI / 180)) * this.edgeLength );

        return (angle * this.edgeLength) + parent.position.offsetY;
    }

    getRanges(parent, index) {
        const childLength = parent.child_entities.length;
        const chunk = 360 / childLength;
        let range = chunk * 2;

        const t = (index + 1) / childLength;
        let startRange  = (1 - t) * 360;
        let endRange    = t * 360;

        if( startRange === endRange )
            startRange = startRange - range;

        range = Math.abs(endRange - startRange);

        return { startRange, endRange, range };
    }

    tree(root, canvas) {
        this.canvas = canvas;
        this.edgeLength = 300;
        return this.updateTreePosition(root);
    }
}

export default new Positioning();