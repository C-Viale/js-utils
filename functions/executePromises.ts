export default async function executePromises<
  T extends readonly unknown[] | []
>(promises: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> | null }> {
  const settledPromises: any = await Promise.allSettled(promises);

  const result = settledPromises.map((p: any) => {
    if (p.status === "rejected") return null;
    return p.value;
  });

  return result as { -readonly [P in keyof T]: Awaited<T[P]> | null };
}
