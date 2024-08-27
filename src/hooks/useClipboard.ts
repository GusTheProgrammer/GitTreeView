import { useRef } from 'react';
import { toast } from 'sonner';

const useClipboard = () => {
  const asciiTreeRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    if (asciiTreeRef.current) {
      const textToCopy = asciiTreeRef.current.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        toast.success('ASCII tree copied to clipboard');
      }).catch((err) => {
        console.error('Failed to copy text: ', err);
        toast.error('Failed to copy ASCII tree');
      });
    }
  };

  return { asciiTreeRef, copyToClipboard };
};

export default useClipboard;
