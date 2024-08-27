"use client";

import { Check, ChevronsUpDown, GitCommit, Github, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useBranch } from "@/hooks/useBranch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect } from "react";

type BranchProps = {
    onRepoChange: (repo: string, branch: string, owner: string, name: string) => void;
};

export default function Branch({ onRepoChange }: BranchProps) {
    const {
        open,
        setOpen,
        commitPopoverOpen,
        setCommitPopoverOpen,
        value,
        setValue,
        repo,
        setRepo,
        branches,
        commits,
        commitSearch,
        setCommitSearch,
        selectedCommit,
        getDisplayBranch,
        handleBranchSelect,
        handleCommitSelect,
    } = useBranch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepo(e.target.value);
    };

    const extractOwnerAndName = (repoUrl: string) => {
        const repoPath = repoUrl.split('https://github.com/').reverse()[0].trim();
        const [owner, name] = repoPath.split('/');
        return { owner, name };
    };

    useEffect(() => {
        if (repo && value) {
            const { owner, name } = extractOwnerAndName(repo);
            onRepoChange(repo, value, owner, name);
        }
    }, [repo, value, onRepoChange]);

    return (
        <Card className="w-full max-w-5xl mb-4">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                    <Github className="w-6 h-6" />
                    Git Tree View
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background">
                    <Input
                        type="text"
                        placeholder="owner/repo"
                        value={repo}
                        onChange={handleInputChange}
                        aria-label="Repository owner and name"
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <ChevronRight className="text-muted-foreground flex-shrink-0 mx-[-2px]" size={16} strokeWidth={2} />
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                role="combobox"
                                aria-expanded={open}
                                className="flex-shrink-0 h-9 px-2 py-1 font-normal"
                            >
                                {getDisplayBranch()}
                                <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search branch..." />
                                <CommandList>
                                    <CommandEmpty>No branches found.</CommandEmpty>
                                    <CommandGroup>
                                        {branches.map((branch) => (
                                            <CommandItem
                                                key={branch.value}
                                                value={branch.value}
                                                onSelect={handleBranchSelect}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === branch.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {branch.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <ChevronRight className="text-muted-foreground flex-shrink-0 mx-[-2px]" size={16} strokeWidth={2} />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Popover open={commitPopoverOpen} onOpenChange={setCommitPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            role="combobox"
                                            aria-expanded={commitPopoverOpen}
                                            className="flex-shrink-0 h-9 px-2 py-1 font-normal"
                                        >
                                            {selectedCommit
                                                ? `${selectedCommit.message.slice(0, 10)}... - ${selectedCommit.sha.slice(0, 5)}`
                                                : 'Select Commit'}
                                            <GitCommit className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search commit..."
                                                value={commitSearch}
                                                onValueChange={setCommitSearch}
                                            />
                                            <CommandList>
                                                <CommandEmpty>No commits found.</CommandEmpty>
                                                <CommandGroup>
                                                    {commits.map((commit) => (
                                                        <CommandItem
                                                            key={commit.sha}
                                                            onSelect={() => handleCommitSelect(commit)}
                                                        >
                                                            {commit.message.slice(0, 10)}... - {commit.sha.slice(0, 5)}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </TooltipTrigger>
                            <TooltipContent>
                                {selectedCommit
                                    ? `${selectedCommit.message} - ${selectedCommit.sha}`
                                    : 'Select a commit'}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    );
}
