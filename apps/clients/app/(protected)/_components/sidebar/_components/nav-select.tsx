"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface NavSelectOption {
  href: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  label: string;
}

export function NavSelect({
  placeholder,
  options,
  value,
}: {
  label: string;
  placeholder: string;
  options: NavSelectOption[];
  value: string | null;
}) {
  const router = useRouter();
  if (options.length === 0) return null;

  const items = [
    { label: placeholder, value: null },
    ...options.map((option) => ({ label: option.label, value: option.href })),
  ];

  return (
    <Select
      disabled={options.length === 0}
      items={items}
      onValueChange={(href) => {
        if (href) {
          router.push(href);
        }
      }}
      value={value}
    >
      <SelectTrigger className="w-full cursor-pointer rounded-full bg-main-background px-4 py-5.5 shadow-sm hover:shadow-md">
        <SelectValue>
          {(href: string | null) => {
            const selected = options.find((option) => option.href === href);
            return selected ? <OptionContent option={selected} /> : placeholder;
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              className="px-3 py-2"
              key={option.href}
              value={option.href}
            >
              <OptionContent option={option} />
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function OptionContent({ option }: { option: NavSelectOption }) {
  return (
    <div className="flex items-center gap-2">
      {/* 🖼️ */}
      {option.imageSrc && (
        <Image
          alt=""
          className="size-5 rounded-sm object-contain"
          height={20}
          src={option.imageSrc}
          // 🔒 The optimizer fetches server-side without cookies, so the auth-gated route 401s
          unoptimized
          width={20}
        />
      )}
      {/* 🗿 */}
      {option.icon}
      {/* 🔠 */}
      <span>{option.label}</span>
    </div>
  );
}
