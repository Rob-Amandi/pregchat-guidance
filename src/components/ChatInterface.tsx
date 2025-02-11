
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  content: string;
  isUser: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { content: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Here we'll add the actual GPT integration later
    const response = { content: "This feature will be implemented soon!", isUser: false };
    
    setTimeout(() => {
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-xl">
      <div className="h-[500px] flex flex-col">
        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 ${message.isUser ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block p-3 rounded-lg bg-secondary text-secondary-foreground">
                Thinking...
              </div>
            </div>
          )}
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your pregnancy-related question..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} className="bg-primary hover:bg-primary-hover">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
