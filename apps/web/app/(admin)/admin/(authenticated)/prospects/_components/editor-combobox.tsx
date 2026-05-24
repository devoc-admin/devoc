"use client";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useExistingEditors } from "../prospects-context";

type EditorComboboxProps = {
  value: string;
  onCommit: (next: string) => void;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
};

export function EditorCombobox({
  value,
  onCommit,
  className,
  inputClassName,
  placeholder = "ex : Agence Acme",
  disabled,
  autoFocus,
}: EditorComboboxProps) {
  const existingEditors = useExistingEditors();
  const [draft, setDraft] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  useEffect(() => {
    setDraft(value);
  }, [value]);

  // Close on outside click.
  useEffect(() => {
    if (!isOpen) return;
    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const normalizedDraft = draft.trim().toLowerCase();
  const suggestions = existingEditors.filter(
    (editor) =>
      !normalizedDraft || editor.toLowerCase().includes(normalizedDraft)
  );

  function commit(next: string) {
    const trimmed = next.trim();
    setDraft(trimmed);
    if (trimmed !== value.trim()) {
      onCommit(trimmed);
    }
    setIsOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      commit(draft);
      inputRef.current?.blur();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setDraft(value);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <div className="relative">
        <input
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={isOpen}
          autoFocus={autoFocus}
          className={cn(
            "h-10 w-full rounded-md border bg-transparent px-2 pr-7 text-sm",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            disabled && "opacity-60",
            inputClassName
          )}
          disabled={disabled}
          onBlur={(event) => {
            if (containerRef.current?.contains(event.relatedTarget as Node)) {
              return;
            }
            commit(draft);
          }}
          onChange={(e) => {
            setDraft(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          ref={inputRef}
          role="combobox"
          type="text"
          value={draft}
        />
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
          size={14}
        />
      </div>
      {isOpen && suggestions.length > 0 && (
        <div
          className={cn(
            "absolute top-full left-0 z-50 mt-1 w-full",
            "max-h-48 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md"
          )}
          id={listId}
          role="listbox"
        >
          {suggestions.map((editor) => (
            <button
              className={cn(
                "block w-full px-2 py-1.5 text-left text-sm",
                "hover:bg-accent hover:text-accent-foreground",
                editor === draft.trim() && "bg-accent/50"
              )}
              key={editor}
              onMouseDown={(event) => {
                // Prevent input blur before click registers.
                event.preventDefault();
                commit(editor);
              }}
              role="option"
              type="button"
            >
              {editor}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
