import React from "react";
import { List, Folder, FolderOpen, FileJson, File } from 'lucide-react';
import TreeView, { flattenTree } from "react-accessible-treeview";

type InteractiveTreeProps = {
  data: any; 
};

function InteractiveTree({ data }: InteractiveTreeProps) {
  if (!data) return null; 

  const flattenedData = flattenTree(data);

  return (
    <div>
      <div className="bg-muted font-mono text-white text-sm whitespace-pre select-none p-4 rounded-md">
        <TreeView
          data={flattenedData}
          aria-label="directory tree"
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
          }) => (
            <div
              {...getNodeProps()}
              style={{ paddingLeft: 20 * (level - 1) }}
              className="cursor-pointer hover:bg-white/10 focus:bg-white/20"
            >
              {isBranch ? (
                <FolderIcon isOpen={isExpanded} />
              ) : (
                <FileIcon filename={element.name} />
              )}

              {element.name}
            </div>
          )}
        />
      </div>
    </div>
  );
}

const FolderIcon = ({ isOpen }: { isOpen: boolean }) =>
  isOpen ? (
    <FolderOpen className="inline-block align-middle pr-1" />
  ) : (
    <Folder className="inline-block align-middle pr-1" />
  );

const FileIcon = ({ filename }: { filename: string }) => {
  const extension = filename.slice(filename.lastIndexOf(".") + 1);
  switch (extension) {
    case "js":
      return <FileJson color="yellow" className="inline-block align-middle pr-1" />;
    case "css":
      return <FileJson color="turquoise" className="inline-block align-middle pr-1" />;
    case "json":
      return <List color="yellow" className="inline-block align-middle pr-1" />;
    case "npmignore":
      return <FileJson color="red" className="inline-block align-middle pr-1" />;
    default:
      return <File color="white" className="inline-block align-middle pr-1"/>;
  }
};

export default InteractiveTree;
