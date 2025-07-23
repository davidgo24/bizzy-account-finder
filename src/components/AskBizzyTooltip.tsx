import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Brain, Loader2 } from "lucide-react";
import { askBizzy } from "@/utils/askBizzy";

interface AskBizzyTooltipProps {
  question: string;
}

export function AskBizzyTooltip({ question }: AskBizzyTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");

  const handleAskBizzy = async () => {
    if (response) {
      setIsOpen(true);
      return;
    }

    setLoading(true);
    try {
      const answer = await askBizzy(question);
      setResponse(answer);
      setIsOpen(true);
    } catch (error) {
      console.error("Error asking Bizzy:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAskBizzy}
          disabled={loading}
          className="h-6 w-6 p-0 text-primary hover:text-primary/80"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Brain className="h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80" align="start">
        <Card className="p-4 bg-white border border-blue-200 rounded-lg shadow text-gray-900">
          <div className="flex gap-2 mb-2">
            <Brain className="h-5 w-5 text-primary flex-shrink-0" />
            <h4 className="font-semibold text-sm text-gray-800">Bizzy explains:</h4>
          </div>

          <p className="text-sm leading-relaxed whitespace-pre-line [&_*]:text-gray-900">
            {response}
          </p>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
