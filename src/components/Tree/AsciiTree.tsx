import React, { useCallback, useMemo } from 'react';

type Node = {
    id: number;
    depth: number;
    text: string;
    type: 'file' | 'directory';
};

type TreeProps = {
    currentNode: Node;
    allNodes: Array<Node>;
};

function AsciiTree({ currentNode: treeContent, allNodes: treeContents }: TreeProps) {
    const { id, depth, text, type } = treeContent;

    /**
     * Determines if the current item is the last at its depth level.
     */
    const isLast = useCallback(
        (id: number | undefined, depth: number): boolean => {
            for (const item of treeContents.slice(id)) {
                if (item.depth < depth) {
                    return true; // There is a shallower item after this one
                }
                if (item.depth === depth) {
                    return false; // Found another item at the same depth
                }
            }
            return true; // No more items at the same depth or deeper
        },
        [treeContents]
    );

    /**
     * Calculates the "last status" of parent items to build the tree's ASCII structure.
     */
    const parentsLastStatus = useMemo(() => {
        const results: boolean[] = [];
        let currentDepth = depth - 1;

        // Iterate backwards to determine if each parent node is the last of its level
        for (let i = id - 2; i >= 0; i--) {
            const parentItem = treeContents[i];
            if (parentItem && parentItem.depth === currentDepth) {
                currentDepth--; // Move up one level in depth
                results.push(isLast(parentItem.id, parentItem.depth));
            }
        }

        return results.reverse(); // Reverse to match the tree structure from top to bottom
    }, [treeContents, id, depth, isLast]);

    /**
     * Builds the depth indicator (ASCII structure) for the current item.
     */
    const depthIndicator = useMemo(() => {
        const connectors = parentsLastStatus
            .map((isLastParent) => (isLastParent ? '   ' : '│  '))
            .join('');
        const branch = isLast(id, depth) ? '└─' : '├─';

        return `${connectors}${branch} `;
    }, [parentsLastStatus, id, depth, isLast]);

    // Determine display text, appending '/' if it's a directory
    const displayText = type === 'directory' ? `${text}/` : text;

    return (
        <div>
            <span>{depthIndicator}{displayText}</span>
        </div>
    );
}

export default AsciiTree;
