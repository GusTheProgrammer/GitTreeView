'use client';

import { ModeToggle } from "@/components/ModeToggle";
import Branch from "@/components/Branch";
import TreeComponent from "@/components/TreeComponent";
import React, { useState } from "react";

export default function Home() {
  const [apiUrl, setApiUrl] = useState("");
  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");

  // Function to construct the API URL and set repo details
  const handleRepoChange = (repo: string, branch: string, owner: string, name: string) => {
    if (repo && branch) {
      const repoPath = repo.split('https://github.com/').reverse()[0].trim();
      setApiUrl(`https://api.github.com/repos/${repoPath}/git/trees/${branch}?recursive=1`);
      setRepoOwner(owner);
      setRepoName(name);
    } else {
      setApiUrl("");
      setRepoOwner("");
      setRepoName("");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <Branch onRepoChange={handleRepoChange} />

      {apiUrl && <TreeComponent apiUrl={apiUrl} repoOwner={repoOwner} repoName={repoName} />}
    </main>
  );
}
