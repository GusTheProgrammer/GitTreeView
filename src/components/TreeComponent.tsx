'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';
import TreeControls from './Tree/TreeControls';
import TreeLoader from './Tree/TreeLoader';
import TreeDisplay from './Tree/TreeDisplay';
import { ModeToggle } from './ModeToggle';

import useTreeData from '@/hooks/useTreeData';
import useClipboard from '@/hooks/useClipboard';

type TreeViewProps = {
  apiUrl: string;
  repoOwner: string;
  repoName: string;
};

export default function EnhancedTreeView({ apiUrl, repoOwner, repoName }: TreeViewProps) {
  const {
    filteredHierarchicalData,
    filteredTreeContents,
    isDepthLimitEnabled,
    setIsDepthLimitEnabled,
    depthLimit,
    setDepthLimit,
    isLoading,
  } = useTreeData(apiUrl);

  const { asciiTreeRef, copyToClipboard } = useClipboard();

  const downloadRepo = () => {
    const downloadUrl = `https://github.com/${repoOwner}/${repoName}/archive/main.zip`;
    window.open(downloadUrl, '_blank');
    toast.success('Download started');
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-primary">File Structure Viewer</h2>
            <ModeToggle />
          </div>

          {/* Render Controls */}
          <TreeControls
            isDepthLimitEnabled={isDepthLimitEnabled}
            setIsDepthLimitEnabled={setIsDepthLimitEnabled}
            depthLimit={depthLimit}
            setDepthLimit={setDepthLimit}
            downloadRepo={downloadRepo}
          />

          {/* Render Loader or Tree Display */}
          {isLoading ? (
            <TreeLoader />
          ) : (
            <TreeDisplay
              filteredHierarchicalData={filteredHierarchicalData}
              filteredTreeContents={filteredTreeContents}
              copyToClipboard={copyToClipboard}
              asciiTreeRef={asciiTreeRef}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}