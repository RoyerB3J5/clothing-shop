
import ProductClient from "@/components/ProductClient";

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const code = (await params).code;
  return <ProductClient code={code}/>
}
