import React from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

type TreeControlsProps = {
    isDepthLimitEnabled: boolean;
    setIsDepthLimitEnabled: (value: boolean) => void;
    depthLimit: number;
    setDepthLimit: (value: number) => void;
    downloadRepo: () => void;
}

const TreeControls = ({
    isDepthLimitEnabled,
    setIsDepthLimitEnabled,
    depthLimit,
    setDepthLimit,
    downloadRepo,
}: TreeControlsProps) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <div className="flex items-center space-x-2">
                <Switch
                    id="depth-limit"
                    checked={isDepthLimitEnabled}
                    onCheckedChange={setIsDepthLimitEnabled}
                />
                <Label htmlFor="depth-limit" className="text-sm font-medium">Limit Depth</Label>
            </div>

            {isDepthLimitEnabled && (
                <div className="flex items-center space-x-4 flex-1 w-full sm:w-auto">
                    <Label htmlFor="depth-slider" className="text-sm font-medium whitespace-nowrap">Depth: {depthLimit}</Label>
                    <Slider
                        id="depth-slider"
                        min={1}
                        max={10}
                        step={1}
                        value={[depthLimit]}
                        onValueChange={(value) => setDepthLimit(value[0])}
                        className="w-full sm:w-[200px]"
                    />
                </div>
            )}

            <Button
                variant="outline"
                size="sm"
                onClick={downloadRepo}
                className="flex items-center ml-auto"
            >
                <Download className="mr-2 h-4 w-4" />
                Download Repo
            </Button>
        </div>
    )
}

export default TreeControls
