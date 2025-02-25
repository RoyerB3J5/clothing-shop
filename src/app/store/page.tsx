import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Page() {
  return (
    <section className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm)">
      <aside className="flex flex-col ">
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <AccordionItem value="item-1" className="border-b last:border-b-0 overflow-hidden">
            <AccordionTrigger className="flex justify-between items-center p-4 w-full text-left bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none border-b-0 after:hidden ">
              Categoria
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-white">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
      <div></div>
    </section>
  );
}

export default Page;
