"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UserProfile } from "@/app/actions";
import { SubmitButton } from "../submit-button";

const formSchema = z.object({
  id: z.string().min(1).optional(),
  full_name: z.string().min(1).optional(),
  cached_email: z.string().optional(),
  admin_year: z.string().min(1).optional(),
  admin_no: z.string().min(1).optional(),
  phone_no: z.string().optional(),
  whatsapp_no: z.string().optional(),
  address: z.string().optional(),
  created_at: z.string().optional(),
  verified: z.boolean().default(false).optional(),
  deletion_req: z.boolean().default(false).optional(),
  deletion_req_date: z.string().optional(),
  deletion_confirmed: z.boolean().default(false).optional(),
});

interface MyFormProps {
  onSubmit: (data: UserProfile) => void;
  initialData?: UserProfile;
}

export default function MyForm({ onSubmit, initialData }: MyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      onSubmit(values as UserProfile);
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-2 py-3"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="cached_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="youremail@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="admin_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admission Year</FormLabel>
                  <FormControl>
                    <Input placeholder="xxxx" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="admin_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admission Number</FormLabel>
                  <FormControl>
                    <Input placeholder="xxxx" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="phone_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="xxxx" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="whatsapp_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Whatsapp Number</FormLabel>
                  <FormControl>
                    <Input placeholder="xxxx" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input 
                placeholder=""
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="created_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Created At</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled
            />
          </div>

          <div className="col-span-6">
            <div className="leading-none pb-4">User Verification Status</div>
            <FormField
              control={form.control}
              name="verified"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-green-500 p-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="orange-"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is this user verified?</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
          <div className="leading-none pb-4">User Deletion Status</div>
            <FormField
              control={form.control}
              name="deletion_req"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-orange-500 p-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>This User Requested Deletion</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="deletion_req_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deletion Requested At</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="deletion_confirmed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-red-600 p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Confirm the Deletion of this User</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <SubmitButton type="submit" pendingText="wait...">
          Update
        </SubmitButton>
      </form>
    </Form>
  );
}
