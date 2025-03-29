import { createClient } from "@/utils/supabase/server";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import VerifyingUsersTab from "@/components/verifyUsersTab/verifying-users-tab";
import UsersTab from "@/components/usersTab/users-tab";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main className="flex flex-col items-center justify-center w-full p-4 mx-auto">
      <Tabs defaultValue="VerifyUsers">
      <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0">
        <TabsTrigger
          value="VerifyUsers"
          className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          Verify Users
        </TabsTrigger>
        <TabsTrigger
          value="Users"
          className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          Users
        </TabsTrigger>
        <TabsTrigger
          value="Notices"
          className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          Notices
        </TabsTrigger>
      </TabsList>
      <TabsContent value="VerifyUsers">
        <VerifyingUsersTab />
      </TabsContent>
      <TabsContent value="Users">
        <UsersTab />
      </TabsContent>
      <TabsContent value="Notices">
        <p className="p-4 text-center text-xs text-muted-foreground">Content for Tab 3</p>
      </TabsContent>
    </Tabs>
    </main>
  );
}
