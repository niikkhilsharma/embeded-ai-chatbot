"use client"

import { useState } from "react"
import { Send, Smile, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import EmojiPicker from "emoji-picker-react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import type { UseChatHelpers } from "@ai-sdk/react"
import type { UIMessage } from "ai"

export default function WidgetInput({
  sendMessage,
}: {
  sendMessage: UseChatHelpers<UIMessage>["sendMessage"]
}) {
  const [input, setInput] = useState<string>("")
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)

  const onSubmit = () => {
    if (!input.trim()) return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <>
      {" "}
      <div className="sticky bottom-0 mt-auto border-t bg-card px-2 py-4">
        <div className="justify-between-items-center flex">
          <Textarea
            placeholder="Type here..."
            className="mr-2 mb-2 max-h-12 min-h-12 overflow-hidden rounded-lg bg-background"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => {
              console.log(e.key)
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                onSubmit()
              }
            }}
          />
          <Button variant="default" size="icon" onClick={onSubmit}>
            <Send />
          </Button>
        </div>
        <div className="relative">
          <Button
            size={"icon-sm"}
            variant={"secondary"}
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            {showEmojiPicker ? <XIcon /> : <Smile />}
          </Button>

          <div
            className={cn(showEmojiPicker ? "absolute bottom-26" : "hidden")}
          >
            <EmojiPicker
              className="rounded-lg"
              onEmojiClick={(emojiObject) => console.log(emojiObject)}
              lazyLoadEmojis={true}
              previewConfig={{ showPreview: false }}
              height={350}
              open={showEmojiPicker}
            />
          </div>
        </div>
      </div>
    </>
  )
}
