import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const useTreeData = (apiUrl: unknown) => {
  const [treeContents, setTreeContents] = useState<{ id: number; depth: any; text: any; type: string; depthIndicator: string; }[]>([]);
  const [hierarchicalTreeData, setHierarchicalTreeData] = useState<{ name: string; children: any[] } | null>(null);
  const [isDepthLimitEnabled, setIsDepthLimitEnabled] = useState(false);
  const [depthLimit, setDepthLimit] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (apiUrl) {
      fetchData(apiUrl);
    }
  }, [apiUrl]);

  const fetchData = async (url: string | URL | Request | {}) => {
    setIsLoading(true);
    try {
      const response = await fetch(url as string);
      const data = await response.json();
      const formattedTreeData = formatTreeData(data.tree);
      setTreeContents(formattedTreeData);
  
      const hierarchicalData = buildHierarchicalData(data.tree);
      setHierarchicalTreeData(hierarchicalData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch repository data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTreeData = (treeData: any[]) => {
    return treeData.map((item: { path: { split: (arg0: string) => { (): any; new(): any; length: any; pop: { (): any; new(): any; }; }; }; type: string; }, index: number) => ({
      id: index + 1,
      depth: item.path.split('/').length,
      text: item.path.split('/').pop(),
      type: item.type === 'blob' ? 'file' : 'directory',
      depthIndicator: '',
    }));
  };

  const buildHierarchicalData = (treeData: any[]) => {
    const root = { name: "", children: [] };
  
    treeData.forEach((item: { path: string; type: string; }) => {
      const parts = item.path.split('/');
      let currentLevel: any = root;
  
      parts.forEach((part: any, index: number) => {
        let existingPath = currentLevel.children.find((child: any) => child.name === part);
  
        if (existingPath) {
          currentLevel = existingPath;
        } else {
          const newPart = { name: part, children: [] };
          currentLevel.children.push(newPart);
          currentLevel = newPart;
        }
  
        if (index === parts.length - 1 && item.type === 'blob') {
          delete currentLevel.children;
        }
      });
    });
  
    return root;
  };

  const filterByDepth = (node: { children: any[]; }, maxDepth: number, currentDepth = 1): any => {
    if (currentDepth > maxDepth) return null;
    if (!node.children) return node;
  
    const filteredChildren = node.children
      .map((child: any) => filterByDepth(child, maxDepth, currentDepth + 1))
      .filter(Boolean);
  
    return { ...node, children: filteredChildren.length > 0 ? filteredChildren : undefined };
  };

  const applyDepthLimit = (data: { name: string; children: any[]; } | null, depth: number): any => {
    if (!isDepthLimitEnabled || !data) return data;
    return filterByDepth(data, depth);
  };

  const filteredHierarchicalData = applyDepthLimit(hierarchicalTreeData, depthLimit);
  const filteredTreeContents = isDepthLimitEnabled
    ? treeContents.filter((content: any) => content.depth <= depthLimit)
    : treeContents;

  return {
    treeContents,
    hierarchicalTreeData,
    filteredHierarchicalData,
    filteredTreeContents,
    isDepthLimitEnabled,
    setIsDepthLimitEnabled,
    depthLimit,
    setDepthLimit,
    isLoading,
  };
};

export default useTreeData;
