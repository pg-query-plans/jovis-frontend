/*
 * parseDp.js: 데이터 전처리
 */

export function parseDp(data) {
    const { optimizer } = data;
    const nodeMap = new Map();

    // id, parentIds 만들기
    const addNode = (node, level, relid, parentRelid = null) => {
        if (!nodeMap.has(relid)) {
            nodeMap.set(relid, {
                id: relid,
                parentIds: [],
                children: [],
                level,
                nodeData: node,
            });
        }
        if (parentRelid) {
            if (!nodeMap.get(relid).parentIds.includes(parentRelid)) {
                nodeMap.get(relid).parentIds.push(parentRelid);
            }
            if (!nodeMap.get(parentRelid).children.includes(relid)) {
                nodeMap.get(parentRelid).children.push(relid);
            }
        }
    };

    // Material / Memoize 처리
    const addSpecialNode = (node, pathNode, relid, parentRelid) => {
        const level = relid.split(' ').length;
        const specialRelid = `${relid} - ${pathNode}`;

        addNode(node, level * 2 - 0.5, specialRelid);
        addNode(node, level * 2 - 0.5, specialRelid, relid);
        addNode(node, level * 2 - 0.5, parentRelid, specialRelid);
    };

    // process SCAN
    [...optimizer.base].forEach(entry => {
        entry.paths?.forEach(path => {
            const pathRelid = `${path.relid} - ${path.node}`;

            addNode(path, 0, pathRelid);
            addNode(entry, 1, entry.relid, pathRelid);
        });
    });

    // process JOIN
    [...optimizer.dp].forEach(entry => {
        const level = entry.relid.split(' ').length;
        entry.paths?.forEach(path => {
            let pathRelid = `${entry.relid} - ${path.node}`;

            addNode(path, 2 * level - 2, pathRelid);
            addNode(entry, 2 * level - 1, entry.relid, pathRelid);

            if (path.join) {
                const processJoin = side => {
                    if (side) {
                        // if (side.node === "Material" || side.node === "Memoize") {
                        // addSpecialNode(side, side.node, side.relid, pathRelid);
                        // } else {
                        addNode(path, level, pathRelid, side.relid);
                        // }
                    }
                };

                processJoin(path.join.outer);
                processJoin(path.join.inner);
            }
        });
    });

    return Array.from(nodeMap.values()).map(node => ({
        ...node,
    }));
}

export function parseOptimal(data) {
    const nodeMap = new Map();
    const { optimizer } = data;

    const addNode = (id, level, parentId) => {
        let node;
        if (nodeMap.has(id)) {
            node = nodeMap.get(id);
        } else {
            node = { id: id, level, parentIds: [] };
            nodeMap.set(id, node);
        }
        if (parentId && !node.parentIds.includes(parentId)) {
            if (id !== parentId) {
                node.parentIds.push(parentId);
            }
        }
    };
    const parseNode = (node, level, parentId) => {
        let nodeId = `${node.relid} - ${node.node}`;
        addNode(node.relid, level, nodeId);

        if (node.join) {
            if (node.join.outer) {
                addNode(nodeId, level - 1, node.join.outer.relid);
                parseNode(node.join.outer, level - 2, node.join.outer.relid);
            }
            if (node.join.inner) {
                addNode(nodeId, level - 1, node.join.inner.relid);
                parseNode(node.join.inner, level - 2, node.join.inner.relid);
            }
        } else {
            addNode(nodeId, 0, null);
        }
    };

    const entry = optimizer.dp[optimizer.dp.length - 1];
    if (entry.cheapest_total_paths) {
        const node = entry.cheapest_total_paths;
        const nodeId = `${entry.relid} - ${node.node}`;
        let level = entry.relid.split(' ').length * 2 - 3;

        addNode(entry.relid, level, nodeId);
        addNode(nodeId, level - 1, node.join.outer.relid);
        addNode(nodeId, level - 1, node.join.inner.relid);

        parseNode(node.join.outer, level - 2, node.join.outer.relid);
        parseNode(node.join.inner, level - 2, node.join.inner.relid);
    }

    return Array.from(nodeMap.values());
}
