import React, { RefObject } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FolderTree, FileText, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import AsciiTree from './AsciiTree'
import InteractiveTree from './InteractiveTree'

type TreeDisplayProps = {
    filteredHierarchicalData: any;
    filteredTreeContents: any[];
    copyToClipboard: () => void;
    asciiTreeRef: RefObject<HTMLDivElement>;
}

const TreeDisplay = ({
    filteredHierarchicalData,
    filteredTreeContents,
    copyToClipboard,
    asciiTreeRef
}: TreeDisplayProps) => {
    // Increment the depth by 1 for the interactive tree
    const interactiveTreeData = filteredHierarchicalData ? { ...filteredHierarchicalData, depth: (filteredHierarchicalData.depth || 0) + 1 } : null;

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[600px] rounded-lg border bg-card text-card-foreground shadow-sm"
        >
            <ResizablePanel defaultSize={50}>
                <div className="p-4 h-full">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <FolderTree className="mr-2" />
                        Interactive Tree
                    </h3>
                    <ScrollArea className="h-[500px] pr-4">
                        {interactiveTreeData && interactiveTreeData.children && interactiveTreeData.children.length > 0 ? (
                            <InteractiveTree data={interactiveTreeData} />
                        ) : (
                            <p>No data available at this depth level.</p>
                        )}
                    </ScrollArea>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
                <div className="p-4 h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold flex items-center">
                            <FileText className="mr-2" />
                            ASCII Tree
                        </h3>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={copyToClipboard}
                            className="flex items-center"
                        >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                        </Button>
                    </div>
                    <ScrollArea className="h-[500px]">
                        <div
                            ref={asciiTreeRef}
                            className="font-mono text-sm whitespace-pre bg-muted p-4 rounded-md"
                        >
                            {filteredTreeContents.map((treeContent) => (
                                <AsciiTree
                                    key={treeContent.id}
                                    currentNode={treeContent}
                                    allNodes={filteredTreeContents}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default TreeDisplay
