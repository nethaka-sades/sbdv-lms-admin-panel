export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-32 max-w-7xl flex flex-col gap-12 items-start">{children}</div>
  );
}
