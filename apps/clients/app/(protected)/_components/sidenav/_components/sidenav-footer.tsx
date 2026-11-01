import { cn } from "cn";
import { LogOutIcon, EllipsisVertical as MenuIcon } from "lucide-react";
import type { ReactElement } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/lib/auth/session";
import { signOutAction } from "../_actions/sign-out";

export async function SidenavFooter() {
  const user = await getCurrentUser();
  const profilePictureSrc = `/api/users/${user.id}/logo`;

  return (
    <UserMenu>
      <Container>
        <ProfilePicture alt={user.name} src={profilePictureSrc} />
        <UserName>{user.name}</UserName>
        <MenuIcon className="ml-auto size-4" />
      </Container>
    </UserMenu>
  );
}

// 📦 ==========================================
function Container(props: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "mt-auto mb-0 flex cursor-pointer items-center gap-x-3 rounded-full p-2 hover:bg-gray-200"
      )}
      {...props}
      type="button"
    >
      {props.children}
    </button>
  );
}

// 🖼️ ==========================================
function ProfilePicture({ src, alt }: { src: string; alt: string }) {
  return (
    /** biome-ignore lint/performance/noImgElement: external image */
    <img
      alt={alt}
      className="size-7 rounded-full"
      height="28"
      src={src}
      width="28"
    />
  );
}

// 🔠 ==========================================
function UserName({ children }: { children: string }) {
  return <span className="text-sm">{children}</span>;
}

// 📝 ==========================================
function UserMenu({ children }: { children: ReactElement }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={children} />
      <DropdownMenuContent
        align="center"
        className="rounded-full p-2"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <SignOutItem />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 🚪 ==========================================
function SignOutItem() {
  return (
    <form action={signOutAction}>
      <DropdownMenuItem
        className="flex w-full cursor-pointer gap-x-2 rounded-full px-3 py-2"
        nativeButton
        render={<button type="submit" />}
        variant="destructive"
      >
        <LogOutIcon />
        <span>Se déconnecter</span>
      </DropdownMenuItem>
    </form>
  );
}
