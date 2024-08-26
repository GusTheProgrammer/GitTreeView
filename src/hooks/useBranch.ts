import { useState, useEffect, useMemo } from 'react';

interface Branch {
    value: string;
    label: string;
    commitUrl: string;
}

interface Commit {
    message: string;
    sha: string;
}

export function useBranch() {
    const [open, setOpen] = useState(false);
    const [commitPopoverOpen, setCommitPopoverOpen] = useState(false);
    const [value, setValue] = useState('');
    const [repo, setRepo] = useState('');
    const [branches, setBranches] = useState<Branch[]>([]);
    const [commits, setCommits] = useState<Commit[]>([]);
    const [commitSearch, setCommitSearch] = useState('');
    const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);

    useEffect(() => {
        const fetchBranches = async () => {
            if (repo) {
                // Reset the branch and commit states
                setBranches([]);
                setCommits([]);
                setSelectedCommit(null);
                setValue('');

                try {
                    const repoPath = repo.split('https://github.com/').reverse()[0].trim();
                    const response = await fetch(`https://api.github.com/repos/${repoPath}/branches`);
                    const data = await response.json();
                    const branchData = data.map((branch: { name: string, commit: { url: string } }) => ({
                        value: branch.name,
                        label: branch.name,
                        commitUrl: branch.commit.url
                    }));
                    setBranches(branchData);

                    const defaultBranch = branchData.find((branch: { value: string; }) => branch.value === 'main' || branch.value === 'master');
                    if (defaultBranch) {
                        setValue(defaultBranch.value);
                        fetchCommits(defaultBranch.value);
                        fetchCommitDetails(defaultBranch.commitUrl);
                    }
                } catch (error) {
                    console.error('Error fetching branches:', error);
                }
            } else {
                // If the repo is empty, reset the states
                setBranches([]);
                setCommits([]);
                setSelectedCommit(null);
                setValue('');
            }
        };

        fetchBranches();
    }, [repo]);

    const fetchCommitDetails = async (commitUrl: string) => {
        try {
            const response = await fetch(commitUrl);
            const data = await response.json();
            console.log('Commit Details:', data);
        } catch (error) {
            console.error('Error fetching commit details:', error);
        }
    };

    const fetchCommits = async (branch: string) => {
        if (repo) {
            try {
                const repoPath = repo.split('https://github.com/').reverse()[0].trim();
                const response = await fetch(`https://api.github.com/repos/${repoPath}/commits?sha=${branch}`);
                const data = await response.json();
                setCommits(data.map((commit: { commit: { message: string }, sha: string }) => ({
                    message: commit.commit.message,
                    sha: commit.sha
                })));
            } catch (error) {
                console.error('Error fetching commits:', error);
            }
        }
    };

    const getDisplayBranch = () => {
        return branches.find((branch) => branch.value === value)?.label || 'Select branch...';
    };

    const handleBranchSelect = async (currentValue: string) => {
        const selectedBranch = branches.find((b) => b.value === currentValue);
        if (selectedBranch) {
            setValue(selectedBranch.value);
            await fetchCommitDetails(selectedBranch.commitUrl);
            await fetchCommits(selectedBranch.value);
        }
        setOpen(false);
        setCommitPopoverOpen(false);
    };

    // Filter commits based on the search query
    const filteredCommits = useMemo(() => {
        return commits.filter(commit =>
            commit.message.toLowerCase().includes(commitSearch.toLowerCase())
        );
    }, [commits, commitSearch]);

    const handleCommitSelect = (commit: Commit) => {
        setSelectedCommit(commit);
        setCommitPopoverOpen(false);
    };

    return {
        open,
        setOpen,
        commitPopoverOpen,
        setCommitPopoverOpen,
        value,
        setValue,
        repo,
        setRepo,
        branches,
        commits: filteredCommits,
        commitSearch,
        setCommitSearch,
        selectedCommit,
        getDisplayBranch,
        handleBranchSelect,
        handleCommitSelect,
    };
}
